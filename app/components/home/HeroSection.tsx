'use client'
import { useEffect, useRef } from 'react'
import HeroMatrix from './HeroMatrix'

export default function HeroSection () {
  const buttonRef = useRef(null)

  const callback = () => {
    const elem = buttonRef.current as any
    if (!elem) return
    
    if (window.scrollY > 40) {
      elem.style.opacity = '0';
      elem.style.pointerEvents = 'none';
    } else {
      elem.style.opacity = '1';
      elem.style.pointerEvents = 'auto';
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', callback) 
    return () => window.removeEventListener('scroll', callback)
  }, [])

  return (
    <>
      <HeroMatrix id="hero" className="fixed top-0 w-screen h-svh sm:h-[50svh]" />
      <div className="block w-screen h-svh sm:h-[50svh]"></div>
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