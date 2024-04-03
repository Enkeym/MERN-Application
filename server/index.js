import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import user from './routes/user.js'
import product from './routes/product.js'
import category from './routes/category.js'

import { errorHandler, notFound } from './middleware/error.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', user)
app.use('/api/category', category)
app.use('/api/products', product)

//build root
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'client/dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send(`Server is ready`))
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
