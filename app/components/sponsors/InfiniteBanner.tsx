'use client'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { resizeByArea } from '@/app/lib/utils'

export default function InfiniteBanner ({ 
  images,
  speed = 100 
}: {
  images: Array<string>,
  speed: number
}) {
  const groupCount = 3
  const fps = 60
  const delta = 1/fps

  // const refs: (React.RefObject<HTMLElement>)[] = Array.from(Array(groupCount)).map(() => useRef(null))
  const refs: (React.RefObject<HTMLElement>)[] = [useRef(null), useRef(null), useRef(null)]
  const parentRef = useRef(null)
  const [showLogos, setShowLogos] = useState(false)

  useEffect(() => {
    let timeoutId: any
    let intervalId: any

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        refs.forEach((
          ref: React.RefObject<HTMLElement>, 
          index: number
        ) => {
  
          const element = ref.current!
  
          if (!element) return
  
          const rect = element.getBoundingClientRect()
  
          // Set initial offset
          if (!element.style.left) {
            const offset = rect.width * index
            element.style.left = offset + 'px'
            element.dataset.left = offset.toString()
            return
          }
  
          const left = Number(element.dataset.left)
          const offset = left <= -rect.width
            ? left + (groupCount) * rect.width
            : left - delta * speed
  
          element.style.left = offset + 'px'
          element.dataset.left = offset.toString()
        })
      }, delta * 1000)
    }, 1000)

    setShowLogos(true)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={`h-max w-screen transition-opacity duration-500 ${showLogos ? 'opacity-1' : 'opacity-0'}`}>
      <div ref={parentRef} className="relative h-20">
        {Array.from(Array(groupCount)).map((_, index) => {
          return (  
            <section 
              ref={refs[index]}
              className="absolute top-1/2 -translate-y-1/2 inline-block w-max"
              key={uuidv4()}
            >
              {images.map((src, index) => (
                <Image 
                  className="ml-16 inline-block w-auto my-auto saturate-0 contrast-125 brightness-0 object-cover dark:invert"
                  src={src} 
                  width={200}
                  height={200}
                  alt="company logo"
                  key={index}
                  priority={true}
                  onLoadingComplete={(e) => {
                    const [width, height] = resizeByArea(e.naturalWidth, e.naturalHeight, 3600)
                    // e.style.width = width + 'px'
                    e.style.height = height + 'px'
                  }}
                />
              ))}
            </section>
          )
        })}
      </div>
    </div>
  )
}