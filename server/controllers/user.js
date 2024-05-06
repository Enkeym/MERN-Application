import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import logger from '../utils/logger.js'

// POST /api/users
// Аутентификация пользователя
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Required fields' })
  }

  try {
    // Находим пользователя по email в базе данных
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    // Проверяем совпадение пароля
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password))

    if (user && isPasswordCorrect) {
      // Генерируем токен для пользователя и отправляем успешный ответ
      generateToken(res, user.id)
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
      })
    } else {
      // Если пользователь не найден или пароль неверный, отправляем ошибку
      return res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    // Если произошла ошибка, логируем ее и отправляем ошибку сервера
    logger.error(`Error in authUser: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

//POST /api/users/register
// Регистрация нового пользователя
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Required fields' })
  }

  try {
    // Проверяем, существует ли пользователь с таким email или name
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }]
      }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Email or name already exist' })
    }

    // Хешируем пароль
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Создаем нового пользователя
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    // Генерируем токен для нового пользователя и отправляем успешный ответ
    generateToken(res, user.id)
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    // Если произошла ошибка, логируем ее и отправляем ошибку сервера
    logger.error(`Error in registerUser: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

//POST /api/users/logout
// Выход пользователя из системы
const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Удаляем токен из куки и отправляем успешный ответ
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
    })
    return res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    // Если произошла ошибка, логируем ее и отправляем ошибку сервера
    logger.error(`Error in logoutUser: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})
// GET /api/users/profile
// Получение профиля пользователя
const userProfile = asyncHandler(async (req, res) => {
  try {
    // Отправляем профиль текущего пользователя
    return res.status(200).json(req.user)
  } catch (error) {
    // Если произошла ошибка, логируем ее и отправляем ошибку сервера
    logger.error(`Error in userProfile: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

//PUT /api/users/profile
// Обновление профиля пользователя
const updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.id
  const { password } = req.body

  if (!password) {
    return res.status(400).json({ message: 'Fill in the password' })
  }

  try {
    // Хешируем новый пароль и обновляем профиль пользователя
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        password: hashedPassword
      }
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    // Если произошла ошибка, логируем ее и отправляем ошибку сервера
    logger.error(`Error in updateUserProfile: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

export { authUser, registerUser, logoutUser, userProfile, updateUserProfile }
