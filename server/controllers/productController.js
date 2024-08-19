import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'
import logger from '../utils/logger.js'

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
  const { title, price, description, image, categoryId } = req.body

  if (!title || !price || !description || !image || !categoryId) {
    return res.status(400).json({ message: 'All fields are required!' })
  }

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
    where: { title, price, description, userId: req.user.id }
  })

  if (productExists) {
    return res.status(400).json({ message: 'Product already exists' })
  }

  try {
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
    const deleteProduct = await prisma.product.delete({
      where: {
        id
      }
    })

    res.status(200).json(deleteProduct)
  } catch (error) {
    logger.error(`Error in removeProducts: ${error.message}`)
    res.status(500).json({ message: 'Failed to remove product' })
  }
})

//PUT /api/products/edit/:id
const editProducts = asyncHandler(async (req, res) => {
  const data = req.body
  const id = data.id

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id
      },
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
