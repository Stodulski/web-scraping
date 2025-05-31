import { parse } from 'json2csv'

const getFormatedFile = data => {
  const file = data.map(product => ({
    Handle: product.Handle,
    Title: product.Title,
    Vendor: product.Vendor,
    SKU: product.SKU,
    'Variant Price': product.PricePen,
    'Variant Price (USD)': product.PriceUsd,
    'Image Src': product.Image,
    'Body (HTML)': product.Body,
    Tags: product.Tags,
    Type: product.Type,
    Published: product.Published
  }))
  if (file.length === 0) {
    return ''
  }
  const formatedFile = parse(file)
  return formatedFile
}
export default getFormatedFile
