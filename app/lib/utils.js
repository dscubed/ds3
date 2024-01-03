import { useEffect, useRef } from "react"

export function mapToRange (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

export function useEffectOnce (callback, watchers) {
  const count = useRef(0)

  useEffect(() => {
    count.current++
    if (count.current === 1) {
      callback()
    } else {
      console.warn(`[Strict Mode] prevent calling function '${callback.name}' a second time`)
    }
  }, watchers)
}