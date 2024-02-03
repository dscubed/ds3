import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

// Infinite scrolling banner
// Based on https://codesandbox.io/p/sandbox/infinite-horizontal-auto-scroll-y82f8

export default function InfiniteBanner ({ 
  images,
  speed = 5000 
}: {
  images: Array<string>,
  speed: number
}) {
  return (
    <div className="relative h-max w-max overflow-hidden pointer-events-none select-none">
      <div className="flex">
        {[0, 0, 0].map(() => (
          <section 
            className="flex animate-[scroll_var(--speed)_linear_infinite]"
            style={{'--speed': `${speed}ms`} as React.CSSProperties} 
            key={uuidv4()}
          >
            {images.map((src, index) => (
              <Image 
                className="max-w-40 sm:max-w-30 w-max h-10 sm:h-8 ml-32 sm:ml-16 my-auto saturate-0 contrast-125 brightness-0 object-contain dark:invert"
                src={src} 
                width={500}
                height={500}
                alt="company logo"
                key={index}
                priority={true}
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}