import { useLayoutEffect, useState } from 'react'

interface IWindowSize {
  width: number
  height: number
}

export const useWindowSize = (): IWindowSize => {
  const [size, setSize] = useState<IWindowSize>({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return (): void => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
