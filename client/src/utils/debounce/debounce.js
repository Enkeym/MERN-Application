import { useEffect, useState } from 'react'

export function useDebounce(value, delay) {
  // Создаем состояние для отслеживания задержанного значения
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    // Создаем обработчик задержки с помощью setTimeout
    const handler = setTimeout(() => {
      // Устанавливаем задержанное значение после истечения задержки
      setDebounced(value)
    }, delay)

    // Очищаем таймер при каждом изменении значения или задержки
    return () => clearTimeout(handler)
  }, [value, delay]) // Отслеживаем изменения значения и задержки

  // Если первый символ строки - пробел, заменяем все пробелы на пустую строку, иначе возвращаем исходное значение
  return debounced.charAt(0) === ' ' ? debounced.replace(/\s/g, '') : debounced
}
