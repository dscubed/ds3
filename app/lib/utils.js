import { useEffect, useRef } from "react"
import Compressor from 'compressorjs'
import { v4 as uuidv4 } from 'uuid'

// Map a range of values to another
export function mapToRange (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

// Prevent running effect twice in React strict mode
export function useEffectOnce (callback, deps) {
  const count = useRef(0)

  useEffect(() => {
    count.current++
    if (count.current === 1) {
      callback()
    } else {
      console.warn(`[Strict Mode] prevent calling function '${callback.name}' a second time`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// Wrap compressor js in promise for async/await
export function compressImage (file, options={}) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      success: resolve,
      error: reject,
      ...options,
    })
  })
}

// YYYY-MM-DD
export function getToday () {
  return new Date().toISOString().split('T')[0]
}

// YYYY-MM-DD
export function getOneYearFromToday () {
  return new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
}

// Convert blob to base64
export function convertBase64 (blob) {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise(resolve => {
    reader.onloadend = function() {
      resolve(reader.result)
    }
  })
}

// Generate a unique file name for upload
export function createUniqueFileName (name) {
  const prefix = name.split('.')[0].slice(0, 20)
  const extension = name.split('.')[1]
  return `${prefix}-${uuidv4()}.${extension}`
}