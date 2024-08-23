import path, { dirname } from 'path'
import fs from 'fs'
import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'
import logger from '../utils/logger.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// GET /api/products
const allProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, pageSize = 2 } = req.query

  try {
    let products

    if (category) {
      const productsInCategory = await prisma.category.findUnique({
        where: {
          slug: category
        },
        include: {
          products: true
        }
      })

      if (!productsInCategory) {
        return res.status(404).json({ message: 'Category not found' })
      }

      products = productsInCategory.products

      if (search) {
        products = products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      }
    } else {
      products = await prisma.product.findMany()

      if (search) {
        products = products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      }
    }

    const totalItems = products.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize
    const currentPageProducts = products.slice(startIndex, endIndex)

    res.status(200).json({ currentPageProducts, totalPages })
  } catch (error) {
    logger.error(`Error in allProducts: ${error.message}`)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

//GET /api/products/:id
const productId = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    logger.error(`Error in productId: ${error.message}`)
    res.status(500).json({ message: 'Failed to fetch product' })
  }
})

//GET /api/products/my/:userId
const myProducts = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 2 } = req.query

  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.params.userId
      }
    })

    const totalItems = products.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize
    const currentPageProducts = products.slice(startIndex, endIndex)

    res.status(200).json({ currentPageProducts, totalPages })
  } catch (error) {
    logger.error(`Error in myProducts: ${error.message}`)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

//POST /api/products/add
const addProducts = asyncHandler(async (req, res) => {
  const { title, price, description, categoryId } = req.body
  const image = req.file ? `/uploads/${req.file.filename}` : null

  if (!title || !price || !description || !categoryId || !image) {
    return res.status(400).json({ message: 'All fields are required!' })
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: req.user.id }
    })

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' })
    }

    const categoryExists = await prisma.category.findUnique({
      where: { slug: categoryId }
    })

    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' })
    }

    const productExists = await prisma.product.findFirst({
      where: {
        title,
        price,
        description,
        userId: req.user.id
      }
    })

    if (productExists) {
      return res.status(400).json({ message: 'Product already exists' })
    }

    const createProduct = await prisma.product.create({
      data: {
        title,
        price,
        image,
        description,
        categoryId,
        userId: req.user.id
      }
    })

    res.status(201).json(createProduct)
  } catch (error) {
    logger.error(`Error in addProducts: ${error.message}`)
    res.status(500).json({ message: 'Failed to add product' })
  }
})

//POST /api/remove/products/:id
const removeProducts = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await prisma.productInOrder.deleteMany({
      where: { productId: id }
    })

    await prisma.cartProduct.deleteMany({
      where: { productId: id }
    })

    // Удаление изображения
    if (product.image) {
      const oldImagePath = path.join(__dirname, '..', product.image)
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          logger.error(`Failed to delete old image: ${err.message}`)
        } else {
          logger.info(`Successfully deleted old image: ${oldImagePath}`)
        }
      })
    }

    const deletedProduct = await prisma.product.delete({
      where: { id }
    })

    res.status(200).json(deletedProduct)
  } catch (error) {
    logger.error(`Error in removeProducts: ${error.message}`)
    res.status(500).json({ message: 'Failed to remove product' })
  }
})

// PUT /api/products/edit/:id
const editProducts = asyncHandler(async (req, res) => {
  const { title, price, description, categoryId } = req.body
  const id = req.params.id

  let data = { title, price, description, categoryId }

  if (req.file) {
    data.image = `/uploads/${req.file.filename}`
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    //Удаление старого изображения
    if (req.file && existingProduct.image) {
      const oldImagePath = path.join(__dirname, '..', existingProduct.image)

      try {
        fs.unlinkSync(oldImagePath)
        logger.info(`Old image deleted: ${oldImagePath}`)
      } catch (err) {
        logger.error(`Failed to delete old image: ${err.message}`)
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data
    })

    res.status(200).json(updatedProduct)
  } catch (error) {
    logger.error(`Error in editProducts: ${error.message}`)
    res.status(500).json({ message: 'Failed to edit product' })
  }
})

export {
  allProducts,
  addProducts,
  removeProducts,
  editProducts,
  productId,
  myProducts
}
