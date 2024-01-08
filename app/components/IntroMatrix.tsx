'use client'
import Matrix from "@/app/components/matrix"
import { mapToRange, useEffectOnce } from '@/app/lib/utils'

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
    this.color = '#' + Math.floor(Math.random()*16777215).toString(16) 
  }

  delete () {
    clearInterval(this.id)
  }
}

function setupShimmer (mtx) {
  mtx.pixels.forEach(pixel => {
    pixel.onStateChange(() => {
      // Show pixel if it is set to 'on' state
      // unless it is hidden by on-scroll animation
      if (pixel.state === 1 && pixel.isFaded && !pixel.isHidden) {
        pixel.domNode.style.opacity = '1'
      }
    })

    const fadeOutId = setInterval(() => {
      if (pixel.state === 0 && !pixel.isFaded && !pixel.isHidden) {
        pixel.isFaded = true
        pixel.domNode.style.opacity = '0.5'
      }
    }, 1 + Math.random() * 1000 * 10)

    const fadeInId = setInterval(() => {
      if (pixel.state === 0 && pixel.isFaded && !pixel.isHidden) {
        pixel.isFaded = false
        pixel.domNode.style.opacity = '1'
      }
    }, 5 + Math.random() * 1000 * 10)

    // Remove intervals when pixel is deleted
    const _delete = pixel.delete.bind(pixel)
    pixel.delete = () => {
      clearInterval(fadeInId)
      clearInterval(fadeOutId)
      _delete()
    }
  })
}

export default function IntroMatrix() {
  useEffectOnce(() => {
    const matrix = new Matrix('intro-matrix')

    var lastHoverPixel = null
    function mouseMoveCallback (event) {
      if (event.target !== lastHoverPixel) {
        const distance = Math.sqrt(event.movementX**2 + event.movementY**2)
        this.trails.push(new Trail(this.mouseX, this.mouseY, distance))
        lastHoverPixel = event.target
      }
    }

    var scrollDelta = 0
    var prevScollY = 0
    var lastScrollAt = 0

    function scrollCallback (event) {
      /* 
        How the on scroll animation works:
        1. A pixel is eligible to undergo animation transition if it's near the top of the screen/window
        2. If eligible, a time delay is set using setTimeout. (The time delay is neccessary to achieve a gradual dithering effect)
        3. After the delay, we calculate the likelihood of the pixel transitioning in the current event cycle
        4. A random number is generated, and if the probability condition is met, the pixel will transition
        5. If the probability condition failed, step 1 to 4 will be repeated in the next event cycle
      */
    
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
        const [, gridY] = this.screenToGridPos(0, window.scrollY)

        // We want to fade pixels when scrolling down and show pixels when up
        const isHiddenFilter = prevScollY < window.scrollY ? false : true

        this.pixels.forEach(pixel => {
          const margin = Math.round(Math.random() * 3)
          const isNearWindowTop = isScrollTop 
            ? true 
            : scrollDelta > 0 
              ? pixel.y < gridY + margin 
              : pixel.y > gridY + margin

          if (pixel.isHidden === undefined) {
            pixel.isHidden = false
          }

          if (pixel.isHidden === isHiddenFilter && isNearWindowTop) {
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
                pixel.domNode.style.opacity = scrollDelta > 0 
                  ? '0' 
                  : ''

                pixel.isHidden = scrollDelta > 0 
                  ? true
                  : false
              }
              
              pixel.pendingTimeout = false
            }, Math.random() * 250)
          }
        })

        lastScrollAt = Date.now()
      }

      prevScollY = window.scrollY
    }

    matrix.setup(mtx => {
      mtx.trails = []
      mtx.mouseMoveCallback = mouseMoveCallback.bind(mtx)
      mtx.scrollCallback = scrollCallback.bind(mtx)
      window.addEventListener('mousemove', mtx.mouseMoveCallback)
      window.addEventListener('scroll', mtx.scrollCallback)
      setupShimmer(mtx)
    })

    matrix.onResize(mtx => {
      mtx.trails = []
      window.addEventListener('mousemove', mtx.mouseMoveCallback)
      window.addEventListener('scroll', mtx.scrollCallback)
      setupShimmer(mtx)
    })

    matrix.update(mtx => {
      mtx.clear()
      
      for (let i = mtx.trails.length - 1; i >= 0; i--) {
        const trail = mtx.trails[i]

        // Remove old trails
        if (trail.radius === 0) {
          trail.delete()
          mtx.trails.splice(i, 1)
          continue
        }

        // Render trails
        mtx.circle(trail.x, trail.y, trail.radius, trail.color)
      }

      mtx.display('ds3')
    })
  }, [])
  
  return (
    <div id="intro-matrix"></div>
  )
}
