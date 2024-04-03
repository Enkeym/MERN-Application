import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'

// GET /api/products
const allProducts = asyncHandler(async (req, res) => {
  try {
    const products = await prisma.product.findMany()

    res.status(200).json(products)
  } catch {
    res.status(400)
    throw new Error('Invalid get the products list')
  }
})

//POST /api/products/add
const addProducts = asyncHandler(async (req, res) => {
  const { title, price, description, image } = req.body

  if (!title || !price || !description || !image) {
    return res.status(400).json({ message: 'all fields are required!' })
  }

  const productsExists = await prisma.product.findFirst({
    where: {
      title,
      price,
      description,
      userId: req.user.id
    }
  })

  if (productsExists) {
    res.status(400)
    throw new Error('Product already exist')
  }

  try {
    const createProducts = await prisma.product.create({
      data: {
        title,
        price,
        image,
        description,
        categoryId: req.body.categoryId,
        userId: req.user.id
      }
    })

    res.status(201).json(createProducts)
  } catch {
    res.status(400)
    throw new Error('Invalid created product')
  }
})

//POST /api/remove/products/:id
const removeProducts = asyncHandler(async (req, res) => {
  const { id } = req.body

  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id
      }
    })

    res.status(200).json(deleteProduct)
  } catch {
    res.status(400)
    throw new Error('Failed to delete the product')
  }
})

//PUT /api/products/edit/:id
const editProducts = asyncHandler(async (req, res) => {
  const data = req.body
  const id = data.id

  try {
    await prisma.product.update({
      where: {
        id
      },
      data
    })

    res.status(200).json({ message: 'OK' })
  } catch {
    res.status(400)
    throw new Error('Failed to update the product')
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

    res.status(200).json(product)
  } catch {
    res.status(400)
    throw new Error('Not found product')
  }
})

//GET /api/products/search/:title
const searchProduct = asyncHandler(async (req, res) => {
  try {
    const search = await prisma.product.findMany({
      where: {
        title: {
          startsWith: req.params.title
        }
      }
    })

    res.status(200).json(search)
  } catch {
    res.status(400)
    throw new Error('Not found product')
  }
})

export {
  allProducts,
  addProducts,
  removeProducts,
  editProducts,
  productId,
  searchProduct
}
