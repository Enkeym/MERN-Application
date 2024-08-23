import path, { dirname } from 'path'
import express from 'express'
import dotenv from 'dotenv'
import user from './routes/user.js'
import product from './routes/product.js'
import category from './routes/category.js'
import order from './routes/order.js'
import cart from './routes/cart.js'

import { errorHandler, notFound } from './middleware/error.js'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import upload from './middleware/multerConfig.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/api/users', user)
app.use('/api/category', category)
app.use('/api/products', product)
app.use('/api/orders', order)
app.use('/api/cart', cart)

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

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('File:', req.file)
  res.send('File uploaded successfully.')
})

app.get('/files/:filename', (req, res) => {
  const { filename } = req.params
  const filePath = path.join(__dirname, 'uploads', filename)

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err)
      res.status(404).send('File not found')
    }
  })
})

app.get('/upload/:filename', (req, res) => {
  const { filename } = req.params
  const filePath = path.join(__dirname, '/uploads', filename)

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('File not found:', err)
      res.status(404).json({ message: 'File not found' })
    }
  })
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
