import { useState, useEffect } from 'react'

/* Функция для создания задержки */
export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value)
    }, delay)

    // Очищаем таймер при изменении значения или задержки
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}
