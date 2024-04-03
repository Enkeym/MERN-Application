import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'

// POST /api/users
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Required fields' })
  }

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user.password))

  if (user && isPasswordCorrect) {
    generateToken(res, user.id)
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(401)
    throw new Error('Invalid User data')
  }
})

//POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Required fields' })
  }

  const emailExists = await prisma.user.findFirst({
    where: {
      email
    }
  })

  const nameExists = await prisma.user.findFirst({
    where: {
      name
    }
  })

  if (emailExists || nameExists) {
    res.status(400)
    throw new Error('Email or name already exist')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  })

  if (user) {
    generateToken(res, user.id)
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid User data')
  }
})

//POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({ message: 'User logged out' })
})

// GET /api/users/profile
const userProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user)
})

//PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.id
  /* const data = req.body */
  const { password } = req.body

  if (!password) {
    return res.status(400).json({ message: 'Fill in the password' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        password: hashedPassword
      }
    })

    res.status(201).json(updatedUser)
  } catch {
    res.status(400)
    throw new Error('Invalid updated password')
  }
})

export { authUser, registerUser, logoutUser, userProfile, updateUserProfile }
