import File from '../models/file.js'
import { client, agent } from '../axiosAgent.js'

import pLimit from 'p-limit'
import getPenRate from '../utils/getPenRate.js'

import getProductData from '../utils/getProductData.js'
import getFormatedDate from '../utils/getFormatedDate.js'

import { parse } from 'node-html-parser'

import ApiError from '../utils/ApiError.js'

export const getAllProductsURL = async url => {
  try {
    let nextPageUrl = url
    const productLinks = new Set()

    while (nextPageUrl) {
      const response = await client.get(nextPageUrl)
      const html = response.data
      const root = parse(html)
      const links = root
        .querySelectorAll('a')
        .map(link => link.getAttribute('href'))
        .filter(href => href && href.startsWith('/p/'))

      links.forEach(link => productLinks.add(link))

      const nextLink = root
        .querySelectorAll('a[rel="next"]')
        .find(link => link.getAttribute('href') !== '/')

      if (nextLink) {
        const href = nextLink.getAttribute('href')
        if (href && !href.startsWith('javascript')) {
          nextPageUrl = new URL(href, nextPageUrl).toString()
        } else {
          nextPageUrl = null
        }
      } else {
        nextPageUrl = null
      }
    }
    return Array.from(productLinks)
  } catch (error) {
    throw new ApiError(`Error getting ${url}`)
  }
}

const scrapeProduct = async (url, penRate) => {
  try {
    const response = await client.get(url)
    const html = response.data
    const root = parse(html)
    return getProductData(root, penRate)
  } catch (error) {
    return null
  }
}

export const scrapeAllProducts = async (urls, url) => {
  try {
    const penRate = await getPenRate()
    const limit = pLimit(20)
    const cleanUrl = new URL(url)
    const tasks = urls.map(url =>
      limit(() => scrapeProduct(cleanUrl.origin + url, penRate))
    )
    const results = await Promise.allSettled(tasks)

    return results.filter(Boolean)
  } catch (error) {
    throw new ApiError(500, `Error scraping all products`)
  } finally {
    agent.http.destroy()
    agent.https.destroy()
  }
}

export const saveFile = async data => {
  try {
    const date = getFormatedDate()
    const filename = `${date}.csv`
    const file = data.map(product => ({
      Handle: product.value.productHandle,
      Title: product.value.productTitle,
      Vendor: product.value.productBrand,
      SKU: product.value.productSku,
      PricePen: parseFloat(product.value.productPricePen),
      PriceUsd: parseFloat(product.value.productPriceUsd),
      Image: product.value.productImage,
      Body: product.value.productDescription,
      Tags: product.value.productTags,
      Type: product.value.productCategory,
      Published: product.value.productStock
    }))
    const newFile = new File({
      filename,
      content: file
    })
    const savedFile = await newFile.save()
    return savedFile
  } catch (error) {
    throw new ApiError(500, `Error saving file ${filename}`)
  }
}
