import { useEffect, useRef, useState } from 'react'
import Compressor from 'compressorjs'
import { v4 as uuidv4 } from 'uuid'
import { isEqual } from 'underscore'

// Map a range of values to another
export function mapToRange (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

// useFormState in react-dom v18.2.0 doesn't update state if async action executes for more than a few seconds
// Use this function below to provide a temporary fix until this issue has been solved.
export function useFormStateFix (action, initialState) {
  const [state, setState] = useState(initialState)
  const formAction = async (formData) => {
    const newStateValue = await action(state, formData)
    setState(newStateValue)
  }
  return [state, formAction]
}

// Prevent running effect twice in React strict mode
export function useEffectOnce (callback, deps) {
  const count = useRef(0)
  const prevDeps = useRef(deps)

  useEffect(() => {
    if (!isEqual(prevDeps.current, deps)) {
      // Reset count if dependencies changes
      count.current = 0
      prevDeps.current = deps
    }
    count.current++
    
    if (count.current === 1) {
      const cleanup = callback()
      return cleanup
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

// Get css color by variable name
export function convertColor (cssVarName) {
  return `rgb(${getComputedStyle(document.body).getPropertyValue(cssVarName)})`
}

// Get current theme
export function getTheme () {
  const classList = document.documentElement.classList
  const isDark = classList.contains('dark')
  return isDark ? 'dark' : 'light'
}