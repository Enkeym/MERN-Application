import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'
import logger from '../utils/logger.js'

// GET /api/products
// Получение всех продуктов с учетом фильтрации по категории и поиску
const allProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, pageSize = 2 } = req.query

  try {
    let products

    if (category) {
      // Если указана категория, получаем продукты в этой категории
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

      // Если указан поиск, фильтруем продукты по названию
      if (search) {
        products = products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      }
    } else {
      // Если категория не указана, получаем все продукты
      products = await prisma.product.findMany()

      // Если указан поиск, фильтруем продукты по названию
      if (search) {
        products = products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      }
    }

    // Рассчитываем общее количество страниц и разбиваем продукты на страницы
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
// Получение продукта по ID
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
// Получение продуктов пользователя
const myProducts = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 2 } = req.query

  try {
    // Получаем продукты пользователя
    const products = await prisma.product.findMany({
      where: {
        userId: req.params.userId
      }
    })

    // Рассчитываем общее количество страниц и разбиваем продукты на страницы
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
// Добавление нового продукта
const addProducts = asyncHandler(async (req, res) => {
  const { title, price, description, image } = req.body

  // Проверка наличия обязательных полей
  if (!title || !price || !description || !image) {
    return res.status(400).json({ message: 'All fields are required!' })
  }

  // Проверка наличия продукта с такими же параметрами
  const productExists = await prisma.product.findFirst({
    where: {
      title,
      price,
      description,
      userId: req.user.id
    }
  })

  // Если продукт уже существует, возвращаем ошибку
  if (productExists) {
    return res.status(400).json({ message: 'Product already exists' })
  }

  try {
    // Создание нового продукта
    const createProduct = await prisma.product.create({
      data: {
        title,
        price,
        image,
        description,
        categoryId: req.body.categoryId,
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
// Удаление продукта по ID
const removeProducts = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    // Удаление продукта
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
// Обновление информации о продукте
const editProducts = asyncHandler(async (req, res) => {
  const data = req.body
  const id = data.id

  try {
    // Обновление продукта
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
