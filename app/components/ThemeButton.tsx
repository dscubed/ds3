'use client'
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useEffectOnce } from '@/app/lib/utils'

export default function ThemeToggle ({ 
  className = '', 
  showText = true,
  state = null
}: { 
  className?: string, 
  showText?: boolean,
  state?: any
}) {
  let [theme, setTheme] = useState('')
  
  if (state) {
    [theme, setTheme] = state
  }

  if (!theme) {
    setTheme(localStorage.theme || 'dark')
  }

  function cycleTheme () {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('system')
    } else {
      setTheme('dark')
    }
  }

  useEffectOnce(() => {
    localStorage.theme = theme

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)")
    
    function updateDeviceTheme () {
      if (matchMedia.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    if (theme === 'system') {
      updateDeviceTheme()
      matchMedia.addEventListener('change', updateDeviceTheme)
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else if (theme === 'dark' ){
      document.documentElement.classList.add('dark')
    }

    return () => {
      matchMedia.removeEventListener('change', updateDeviceTheme)
    }
  }, [theme])

  if (!theme) {
    return <></>
  }
  
  return (
    <button onClick={cycleTheme} className={clsx("flex gap-2 text-text-secondary", className)}>
      {(() => {
        if (theme === 'dark') {
          return <MoonIcon className="w-6 h-6 my-auto" />
        } else if (theme === 'light') {
          return <SunIcon className="w-6 h-6 my-auto" />
        } else {
          return <ComputerDesktopIcon className="w-6 h-6 my-auto" />
        }
      })()}
      {showText && <span className="my-auto capitalize">{theme}</span>}
    </button>
  )
}