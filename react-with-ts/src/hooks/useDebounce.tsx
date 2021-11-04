
import { useEffect, useState } from 'react'
const useDebounce = (value: any, delay = 300) => {
  console.log('value', value);
  const [debounceValue, setDebounceValue] = useState(value) // 这里初始值只有在第一次调用的时候有用，后续的参数会被忽略。
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
