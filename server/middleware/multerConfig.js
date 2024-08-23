import multer from 'multer'
import path from 'path'
import url from 'url'

// Определение пути к корневому каталогу проекта
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Настройка хранилища для Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Указываем путь к папке 'uploads' в корне проекта
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

// Проверка типа файла
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Images only!'))
  }
}

// Настройка Multer
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

export default upload
