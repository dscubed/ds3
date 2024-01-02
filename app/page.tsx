'use client'
import Navbar from "@/app/components/Navbar"
import Matrix from "@/app/components/matrix"
import { useEffect } from "react"
import { mapToRange } from '@/app/lib/utils'

class Trail {
  constructor (x, y, distance) {
    this.x = x
    this.y = y
    this.radius = Math.min(1 + Math.round(distance * 0.1), 7) // variable speed
    this.id = setInterval(() => {
      if (this.radius > 0) {
        this.radius--
      }
    }, 100)
  }

  removeInterval () {
    clearInterval(this.id)
  }
}

export default function Index() {
  useEffect(() => {
    const matrix = new Matrix('#matrix')

    matrix.setup(mtx => {
      mtx.trails = []

      window.addEventListener('mousemove', event => {
        const distance = Math.sqrt(event.movementX**2 + event.movementY**2)
        mtx.trails.push(new Trail(mtx.mouseX, mtx.mouseY, distance))
      })

      window.addEventListener('click', event => {
        mtx.pixels.forEach(pixel => {
          setTimeout(() => {
            pixel.domNode.style.background = 'blue'
            setTimeout(() => {
              pixel.domNode.style.background = ''
            }, Math.random() * 500)
          }, Math.random() * 500) // Random delay between 100ms and 1100ms
        })
      })
      
      /* 
        How the on scroll animation works:
        1. A pixel is eligible to undergo animation transition if it's near the top of the screen/window
        2. If eligible, a time delay is set using setTimeout. (The time delay is neccessary to achieve a gradual dithering effect)
        3. After the delay, we calculate the likelihood of the pixel transitioning in the current event cycle
        4. A random number is generated, and if the probability condition is met, the pixel will transition
        5. If the probability condition failed, step 1 to 4 will be repeated in the next event cycle
      */

      var scrollDelta = 0
      var prevScollY = 0
      var lastScrollAt = 0

      window.addEventListener('scroll', event => {
        scrollDelta = window.scrollY - prevScollY

        // ScrollDelta never be 0 inside the event listener callback, return to be safe
        if (scrollDelta === 0) {
          return
        }

        const isScrollTop = scrollDelta < 0 && window.scrollY === 0 // only true of scroll direction is up

        // To save resources, only run the animation cycle every 25ms, or 40 times per second
        // However, we need to override debounce when the user has just scrolled to the top
        // to transition the rest of the pixels near the top of the screen.
        if(Date.now() - lastScrollAt > 25 || isScrollTop) { // Debounce -> run action every 25ms
          // Find where the window top intersect the grid
          const [, gridY] = mtx.screenToGridPos(0, window.scrollY)

          // We want to fade pixels when scrolling down and show pixels when up
          const targetTransparency = prevScollY < window.scrollY ? '' : 'transparent'

          mtx.pixels.forEach(pixel => {
            const margin = Math.round(Math.random() * 3)
            const isNearWindowTop = isScrollTop 
              ? true 
              : scrollDelta > 0 
                ? pixel.y < gridY + margin 
                : pixel.y > gridY + margin

            if (pixel.domNode.style.background === targetTransparency && isNearWindowTop) {
              // Skip if pixel already has a ongoing time delay
              // UNLESS the user has scrolled to the top because there is no next event callback
              if (pixel.pendingTimeout && !isScrollTop) {
                return
              }

              pixel.pendingTimeout = true

              setTimeout(() => {
                // Pixels closer to the top of the screen will be more likely to undergo transition
                // mapToRange(<pixel's distance to top>, 0, <max margin>, <minimum chance>, <maximum chance>)
                let likelihood = mapToRange(pixel.y - gridY, 0, 3, 0.25, 1)
    
                // Must transition if pixel is off screen; or the user has scrolled to the top
                // and we need to show all pixel now (because there is no next event callback)
                if (pixel.y - gridY < 0 || (isScrollTop)) {
                  likelihood = 1
                }
    
                if (Math.random() < likelihood) {
                  pixel.domNode.style.background = scrollDelta > 0 
                    ? 'transparent' 
                    : ''
                }
                
                pixel.pendingTimeout = false
              }, Math.random() * 250)
            }
          })

          lastScrollAt = Date.now()
        }

        prevScollY = window.scrollY
      })
    })

    matrix.update(mtx => {
      mtx.clear()
      
      for (let i = mtx.trails.length - 1; i >= 0; i--) {
        const trail = mtx.trails[i]

        // Remove old trails
        if (trail.radius === 0) {
          trail.removeInterval()
          mtx.trails.splice(i, 1)
          continue
        }

        // Render trails
        mtx.circle(trail.x, trail.y, trail.radius)
      }

      mtx.display('ds3')
    })
  }, [])
  
  return (
    <>
      <div id="matrix"></div>
      <div
        className="absolute block w-screen h-screen top-0 left-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px 100px var(--background-secondary)'
        }}
      ></div>
       <Navbar></Navbar>
      <div className="h-screen"></div>
      {/* <main className="p-4"></main> */}
    </>
  )
}
