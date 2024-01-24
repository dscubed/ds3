'use client'
import HeroMatrix from '@/app/components/home/HeroMatrix'
import { useEffectOnce } from '@/app/lib/utils'
import { useRef } from 'react'

export default function HeroSection () {
  const buttonRef = useRef(null)

  useEffectOnce(() => {
    const callback = () => {
      const elem: HTMLElement = buttonRef.current!
      if (window.scrollY > 40) {
        elem.style.opacity = '0';
        elem.style.pointerEvents = 'none';
      } else {
        elem.style.opacity = '1';
        elem.style.pointerEvents = 'auto';
      }
    }

    window.addEventListener('scroll', callback)

    return () => window.removeEventListener('scroll', callback)
  }, [])

  return (
    <>
      <div className="w-screen h-svh sm:max-h-[50svh] fixed top-0">
        <HeroMatrix />
      </div>
      <div className="w-screen h-svh sm:max-h-[50svh] pointer-events-none"></div>
      <div className="relative">
        <button 
          ref = {buttonRef}
          className="sm:hidden absolute left-1/2 bottom-6 translate-x-[-50%] text-text-secondary border border-border bg-background-secondary rounded-full px-4 py-2 transition-opacity"
          onClick={() => {document.getElementById('navbar')!.scrollIntoView()}}
        >
          Click to scroll down 👇
        </button>
      </div>
    </>
  )
}