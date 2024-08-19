import { useEffect, useState } from 'react'

/* Функция для создания задержки во время поиска */
export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced.charAt(0) === ' ' ? debounced.replace(/\s/g, '') : debounced
}
