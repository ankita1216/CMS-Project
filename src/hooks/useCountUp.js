import { useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export const useCountUp = (target, duration = 2, delay = 0) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = parseInt(target)
    if (start === end) return

    let timer = setTimeout(() => {
      let startTime = null
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * (end - start) + start))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isInView, target, duration, delay])

  return { count, ref }
}
