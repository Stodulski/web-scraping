import convertToHTMLList from './convertListToHTML.js'

const getProductData = (root, penRate) => {
  const productBrand =
    root.querySelectorAll('span[itemprop="name"]')[0]?.innerText || ''

  const productSku =
    root.querySelectorAll('span[itemprop="sku"]')[0]?.innerText || ''

  const oldPrice = parseFloat(
    root
      .querySelectorAll('span[itemprop="price"]')[0]
      ?.getAttribute('content') || '0'
  )

  const productPriceUsd = parseFloat((oldPrice * 1.4).toFixed(2))

  const productTitle =
    root
      .querySelectorAll('meta[itemprop="name"]')[0]
      ?.getAttribute('content') || ''

  const productCategory =
    root
      .querySelectorAll('meta[itemprop="category"]')[0]
      ?.getAttribute('content') || ''

  const productImage =
    root.querySelectorAll('img[itemprop="image"]')[0]?.getAttribute('src') || ''

  const productDescription = convertToHTMLList(
    root.querySelectorAll('div[itemprop="description"]')[0]?.innerText || ''
  )

  const availability =
    root
      .querySelectorAll('meta[itemprop="availability"]')[0]
      ?.getAttribute('content')
      ?.indexOf('OutOfStock') > -1

  const productStock = !availability

  const productHandle = productTitle.replace(/ /g, '-')

  const productTags =
    root
      .querySelectorAll('meta[name="keywords"]')[0]
      ?.getAttribute('content') || ''

  const productPricePen = parseFloat(
    (productPriceUsd * penRate).toFixed(2)
  )

  const productData = {
    productHandle,
    productBrand,
    productCategory,
    productPriceUsd,
    productImage,
    productTitle,
    productSku,
    productDescription,
    productStock,
    productTags,
    productPricePen
  }

  return productData
}

export default getProductData
