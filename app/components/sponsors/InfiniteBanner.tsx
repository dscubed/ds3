'use client'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { useRef } from 'react'
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

  const refs: (React.RefObject<HTMLElement>)[] = [useRef(null), useRef(null), useRef(null)]
  const parentRef:  React.RefObject<HTMLElement> = useRef(null)
  const loadedCount = useRef(0) 
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAnimation = () => {
    parentRef.current!.style.opacity = '1'
    
    intervalId.current = setInterval(() => {
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
  }

  return (
    <div className="h-max w-screen">
      <div ref={parentRef} className="relative h-20 transition-opacity duration-500 opacity-0">
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
                    const [_, height] = resizeByArea(e.naturalWidth, e.naturalHeight, 3600)
                    e.style.height = height + 'px'
                    loadedCount.current++
                    clearInterval(intervalId.current)
                    if (loadedCount.current === images.length * groupCount) {
                      startAnimation()
                    }
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