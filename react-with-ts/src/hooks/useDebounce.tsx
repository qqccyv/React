
import { useEffect, useState } from 'react'
const useDebounce = (value: any, delay = 300) => {
  console.log('value', value);
  const [debounceValue, setDebounceValue] = useState(value)
  console.log('debounceValue', debounceValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debounceValue
}

export default useDebounce
