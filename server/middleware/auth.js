import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../../prisma/prisma-client.js'

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id
        }
      })

      next()
    } catch (err) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized')
  }
})

export { protect }
