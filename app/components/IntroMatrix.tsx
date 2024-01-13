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
        pixel.domNode.style.opacity = '0.8'
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
    const matrix = new Matrix('intro-matrix', {
      padding: [4, 4],
      radius: 100
    })

    var lastHoverPixel = null
    function mouseMoveCallback (event) {
      if (event.target !== lastHoverPixel) {
        const distance = Math.sqrt(event.movementX**2 + event.movementY**2)
        this.trails.push(new Trail(this.mouseX, this.mouseY, distance))
        lastHoverPixel = event.target
      }
    }

    var prevScroll = 0
    var prevRow = 0

    function scrollCallback (event) {
      const [_, row] = matrix.screenToGridPos(0, window.scrollY)
      const invRow = matrix.gridSizeY - row // Number of rows from the bottom instead of top
      if (prevRow === row) {
        return
      }

      // Must use the absolute values because both window.scrollY can be -ve on Safari due to the rubberbanding effect
      const isDownScroll = Math.abs(window.scrollY) - Math.abs(prevScroll) >= 0
      const maxOffset = 6
      const maxDelay = 2000

      matrix.pixels.forEach(pixel => {
        // Check if pixel is close enough to the fade line
        const isInRange = isDownScroll 
          ? pixel.y >= invRow - maxOffset
          : pixel.y < invRow

        // Distance (offset) of the pixel from the fade line
        const offset = isDownScroll 
          ? pixel.y - (invRow - maxOffset)
          : invRow - pixel.y


        // Check if pixel is ready to transition
        let isReady = Math.random() < (offset / maxOffset)
        
        // Force to show all pixels when scrolled to the top
        if (!isDownScroll && invRow === matrix.gridSizeY) {
          isReady = true
        }

        if (!isReady) return

        // Pixels closer to the fade line will have a shorter delay
        const delay = Math.random() * maxDelay * (maxOffset - offset) / maxOffset

        // Prevent previously pending transitions from executing after the current transition.
        if (pixel.transitionId) {
          clearTimeout(pixel.transitionId)
        }

        pixel.transitionId = setTimeout(() => {
          pixel.domNode.style.opacity = isDownScroll 
            ? 0 
            : 1
          pixel.isHidden = isDownScroll 
            ? true 
            : false
        }, delay)
      })

       prevRow = row
       prevScroll = window.scrollY
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
