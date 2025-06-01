import File from '../models/file.js'
import {
  getAllProductsURL,
  scrapeAllProducts,
  saveFile
} from '../services/file.services.js'
import getFormatedFile from '../utils/getFormatedFile.js'

export const generateFile = async (req, res, next) => {
  try {
    const { url } = req.body
    const urls = await getAllProductsURL(url)
    const data = await scrapeAllProducts(urls, url)
    const savedFile = await saveFile(data)
    res.setHeader('Content-Type', 'text/csv')
    res.status(200).json({
      filename: savedFile.filename,
      _id: savedFile._id
    })
  } catch (error) {
    next(err)
  }
}

export const downloadFile = async (req, res, next) => {
  try {
    const id = req.params.id
    const response = await File.findById(id)
    const file = getFormatedFile(response.content)
    res.setHeader('Content-Type', 'text/csv')
    res.status(200).send(file)
  } catch (error) {
    next(error)
  }
}

export const getAllFiles = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  try {
    const files = await File.find()
      .select('-content')
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
    res.status(200).json(files)
  } catch (error) {
    next(error)
  }
}

export const deleteFile = async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedFile = await File.findByIdAndDelete(id).select('-content')
    res.status(200).json({ _id: deletedFile._id })
  } catch (error) {
    next(error)
  }
}
