import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'
import logger from '../utils/logger.js' // Импортируем логгер

// GET /api/category
const allCategory = asyncHandler(async (req, res) => {
  try {
    const category = await prisma.category.findMany()

    res.status(200).json(category)
  } catch (error) {
    logger.error(`Error in allCategory: ${error.message}`)
    res.status(500).json({ message: 'Failed to fetch categories' })
  }
})

// GET /api/category/:id
const singleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const category = await prisma.category.findFirst({
      where: {
        id
      }
    })

    res.status(200).json(category)
  } catch (error) {
    logger.error(`Error in singleCategory: ${error.message}`)
    res.status(500).json({ message: 'Failed to fetch category' })
  }
})

// POST /api/category/add
const addCategory = asyncHandler(async (req, res) => {
  const { name, slug } = req.body

  if (typeof name !== 'string' || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Name and slug must be strings' })
  }

  try {
    // Проверяем, существует ли категория с таким slug
    const categoryExists = await prisma.category.findFirst({
      where: {
        slug
      }
    })

    if (categoryExists) {
      logger.error(
        `Error in addCategory: Category with slug ${slug} already exists`
      )
      return res.status(400).json({ message: 'Category already exists' })
    }

    // Создаем новую категорию
    const createCategory = await prisma.category.create({
      data: {
        name,
        slug
      }
    })

    res.status(201).json(createCategory)
  } catch (error) {
    logger.error(`Error in addCategory: ${error.message}`)
    res.status(500).json({ message: 'Failed to create category' })
  }
})

export { allCategory, addCategory, singleCategory }
