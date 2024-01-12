import { v4 as uuidv4 } from 'uuid'
import Image from "next/image"

// Infinite scrolling banner
// Based on https://codesandbox.io/p/sandbox/infinite-horizontal-auto-scroll-y82f8

export default function InfiniteBanner ({ 
  images,
  gap = 20,
  speed = 5000 
}: {
  images: Array<string>,
  gap: number,
  speed: number
}) {
  return (
    <div className="relative h-max w-max overflow-hidden pointer-events-none select-none">
      <div className="flex">
        {[0, 0, 0].map(() => (
          <section 
            className="flex animate-[scroll_var(--speed)_linear_infinite]"
            style={{"--speed": `${speed}ms`}} 
            key={uuidv4()}
          >
            {images.map((src, index) => (
              <Image 
                className="w-64 h-8 my-auto saturate-0 contrast-125 brightness-0 object-contain dark:invert"
                style={{paddingLeft: gap}}
                src={src} 
                width={100} 
                height={50}
                alt="logo"
                key={index}
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}