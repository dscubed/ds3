'use client'
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'
import { useEffectOnce } from '@/app/lib/utils'

export default function ThemeToggle ({ className = '', showText = true }: { className?: string, showText?: boolean }) {
  const [theme, setTheme] = useState(localStorage.theme || 'dark')

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

    if (theme === 'system') {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('system')
    } else {
      document.documentElement.classList.remove('system')

      // Normal light/dark mode
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme])
  
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