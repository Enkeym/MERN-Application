import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'

// GET /api/category
const allCategory = asyncHandler(async (req, res) => {
  try {
    const category = await prisma.category.findMany()

    res.status(200).json(category)
  } catch {
    res.status(400)
    throw new Error('Invalid get the category')
  }
})

// GET /api/category/:slug
const singleCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params

  try {
    const category = await prisma.category.findUnique({
      where: {
        slug
      }
    })

    res.status(200).json(category)
  } catch {
    res.status(400)
    throw new Error('Invalid get the category')
  }
})

//POST /api/category/add
const addCategory = asyncHandler(async (req, res) => {
  const { name, slug } = req.body

  if (!name || !slug) {
    return res.status(400).json({ message: 'all fields are required!' })
  }

  const categoryExists = await prisma.category.findFirst({
    where: {
      slug
    }
  })

  if (categoryExists) {
    res.status(400)
    throw new Error('Category already exist')
  }

  try {
    const createCategory = await prisma.category.create({
      data: {
        name,
        slug
      }
    })

    res.status(201).json(createCategory)
  } catch {
    res.status(400)
    throw new Error('Invalid created the category')
  }
})

export { allCategory, addCategory, singleCategory }
