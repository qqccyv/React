import React, { useEffect } from 'react'

const useClickOutSide = (ref: React.RefObject<HTMLElement>, callback: Function) => {
  useEffect(() => {
    const lisener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return
      } else {
        callback(e)
      }
    }
    document.addEventListener('click', lisener)
    return () => {
      document.removeEventListener('click', lisener)

    }
  }, [ref, callback])
}

export default useClickOutSide
