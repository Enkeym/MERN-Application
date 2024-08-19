import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'
import logger from '../utils/logger.js'

// GET /api/cart
// Получение корзины пользователя
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated!' })
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart || cart.products.length === 0) {
      return res.status(200).json([])
    }

    // Формируем список товаров в корзине
    const cartItems = cart.products.map((cartProduct) => ({
      ...cartProduct,
      product: {
        ...cartProduct.product,
        quantity: cartProduct.quantity,
        total: cartProduct.total
      }
    }))

    res.status(200).json(cartItems)
  } catch (error) {
    logger.error(`Error in getCart: ${error.message}`)
    res.status(500).json({ message: 'Failed to fetch cart' })
  }
})

// POST /api/cart
// Добавление продукта в корзину
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity: quantityStr = 1 } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated!' })
  }

  const quantity = parseInt(quantityStr, 10)

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' })
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const total = parseFloat(product.price) * quantity

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { products: true }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      })
    }

    const existingProduct = cart.products?.find(
      (p) => p.productId === productId
    )

    if (existingProduct) {
      await prisma.cartProduct.update({
        where: { id: existingProduct.id },
        data: {
          quantity: existingProduct.quantity + quantity,
          total:
            parseFloat(product.price) * (existingProduct.quantity + quantity)
        }
      })
    } else {
      await prisma.cartProduct.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          total
        }
      })
    }

    res.status(200).json({ message: 'Product added to cart' })
  } catch (error) {
    logger.error(`Error in addToCart: ${error.message}`)
    res.status(500).json({ message: 'Failed to add product to cart' })
  }
})

// DELETE /api/cart/remove/:productId
// Удаление продукта из корзины
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params
  const { quantity = 1 } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated!' })
  }

  if (isNaN(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ message: 'Quantity must be a positive number!' })
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { products: true }
    })

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    const cartProduct = cart.products?.find((p) => p.productId === productId)

    if (!cartProduct) {
      return res.status(404).json({ message: 'Product not found in cart' })
    }

    if (cartProduct.quantity <= quantity) {
      await prisma.cartProduct.delete({
        where: { id: cartProduct.id }
      })
    } else {
      await prisma.cartProduct.update({
        where: { id: cartProduct.id },
        data: {
          quantity: cartProduct.quantity - quantity,
          total:
            (cartProduct.total / cartProduct.quantity) *
            (cartProduct.quantity - quantity)
        }
      })
    }

    res.status(200).json({ message: 'Product removed from cart' })
  } catch (error) {
    console.error(`Error in removeFromCart: ${error.message}`, error)
    res.status(500).json({ message: 'Failed to remove product from cart' })
  }
})

const editCartQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params
  const { quantity } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated!' })
  }

  if (isNaN(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ message: 'Quantity must be a positive number!' })
  }

  try {
    const cartProduct = await prisma.cartProduct.findFirst({
      where: { productId, cart: { userId } }
    })

    if (!cartProduct) {
      return res.status(404).json({ message: 'Product not found in cart' })
    }

    await prisma.cartProduct.update({
      where: { id: cartProduct.id },
      data: {
        quantity,
        total: (cartProduct.total / cartProduct.quantity) * quantity
      }
    })

    res.status(200).json({ message: 'Product quantity updated' })
  } catch (error) {
    logger.error(`Error in editCartQuantity: ${error.message}`)
    res.status(500).json({ message: 'Failed to update product quantity' })
  }
})

export { getCart, addToCart, removeFromCart, editCartQuantity }
