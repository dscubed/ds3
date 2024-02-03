'use client'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function InfiniteBanner ({ 
  images,
  speed = 100 
}: {
  images: Array<string>,
  speed: number
}) {
  const refs: (React.RefObject<HTMLElement>)[] = []
  const parentRef = useRef(null)
  const [showLogos, setShowLogos] = useState(false)

  const groupCount = 3
  const fps = 60
  const delta = 1/fps

  useEffect(() => {
    const intervalId = setInterval(() => {
      refs.forEach((
        ref: React.RefObject<HTMLElement>, 
        index: number
      ) => {

        const element = ref.current!
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
    
    setShowLogos(true)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={`h-max w-screen transition-opacity duration-500 ${showLogos ? 'opacity-1' : 'opacity-0'}`}>
      <div ref={parentRef} className="relative grid grid-flow-col w-max h-20">
        {Array.from(Array(groupCount)).map((_, index) => {
          const ref = useRef(null)
          refs.push(ref)
          return (  
            <section 
              ref={ref}
              className="absolute top-1/2 -translate-y-1/2 inline-block w-max"
              key={uuidv4()}
            >
              {images.map((src, index) => (
                <Image 
                  className="ml-16 inline-block my-auto saturate-0 contrast-125 brightness-0 object-contain dark:invert"
                  src={src} 
                  width={100}
                  height={50}
                  alt="company logo"
                  key={index}
                  priority={true}
                  onLoadingComplete={(e) => {
                    // Set size based on area, height is limited to max height
                    const maxHeight = 60
                    const targetArea = 3600
                    const area = e.naturalWidth * e.naturalHeight
                    const aspectRatio = e.naturalWidth / e.naturalHeight
                    const scale = Math.sqrt(targetArea / (area))
                    const height = Math.min(scale * e.naturalHeight, maxHeight)
                    const width = aspectRatio * height
                    e.style.width = width + 'px'
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