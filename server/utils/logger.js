import winston from 'winston'

// Создание логгера
const logger = winston.createLogger({
  level: 'info', // Уровень логирования
  format: winston.format.combine(
    winston.format.timestamp(), // Добавление временной метки к каждой записи
    winston.format.json() // Формат записи в формате JSON
  ),
  transports: [
    // Запись логов в файл
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Логи уровня error
    new winston.transports.File({ filename: 'combined.log' }) // Логи всех уровней
  ]
})

// Если приложение работает в режиме разработки, выводим логи также в консоль
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple() // Простой формат для вывода в консоль
    })
  )
}

export default logger
