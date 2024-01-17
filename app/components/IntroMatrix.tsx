'use client'
import Matrix from "@/app/components/matrix"
import { mapToRange, useEffectOnce } from '@/app/lib/utils'

class Trail {
  x: number
  y: number
  radius: number
  id: NodeJS.Timer
  color: string
  constructor (x: number, y: number, radius: number) {
    this.x = x
    this.y = y
    this.radius = radius
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

function setupShimmer (mtx: any) {
  mtx.pixels.forEach((pixel: any) => {
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
    const config = {
      padding: [2, 2],
      gap: 2,
      radius: 10
    } as any
    
    if (window.innerWidth < 640) {
      config.maxGridSize = [32, 18]
      config.pixelSize = [24, 24]
      config.radius = 100
    }

    if (window.innerWidth < 480) {
      config.pixelSize = [18, 18]
    } 

    const matrix = new Matrix('intro-matrix', config)

    const maxTrailRadius = window.innerWidth > 640
      ? 4
      : 2

    var lastPointerUpdated: Date = new Date()
    var prevPos: [number, number] = [-1, -1] // Mouse or touch
    var prevGridPos: [number, number] = [-1, -1]
    
    function mouseMoveCallback (this: any, event: MouseEvent | TouchEvent) {
      // Debounce every 50ms
      //@ts-expect-error
      if (new Date() - lastPointerUpdated < 50) {
        return
      }

      var posX: number
      var posY: number

      if (event instanceof MouseEvent) {
        posX = event.clientX
        posY = event.clientY
      } else { // Touch event
        posX = event.targetTouches[0].clientX 
        posY = event.targetTouches[0].clientY
      }

      const [gridX, gridY] = this.screenToGridPos(posX, posY)
      if (gridX === prevGridPos[0] && gridY === prevGridPos[1]) {
        return
      }
      const distance = Math.sqrt((posX - prevPos[0]) ** 2 + (posY - prevPos[1]) ** 2)
      const radius = Math.round(mapToRange(Math.min(distance, 20), 1, 20, 1, maxTrailRadius))
      this.trails.push(new Trail(gridX, gridY, radius))
      prevPos = [posX, posY]
      prevGridPos = [gridX, gridY]
    }

    var prevScroll = 0
    var prevRow = 0

    function scrollCallback () {
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

    matrix.setup((mtx: any) => {
      mtx.trails = []
      mtx.mouseMoveCallback = mouseMoveCallback.bind(mtx)
      mtx.scrollCallback = scrollCallback.bind(mtx)
      window.addEventListener('mousemove', mtx.mouseMoveCallback)
      window.addEventListener('touchmove', mtx.mouseMoveCallback, { passive: false })
      window.addEventListener('scroll', mtx.scrollCallback)
      setupShimmer(mtx)
    })

    matrix.onResize((mtx: any) => {
      mtx.trails = []
      window.addEventListener('mousemove', mtx.mouseMoveCallback)
      window.addEventListener('touchmove', mtx.mouseMoveCallback, { passive: false })
      window.addEventListener('scroll', mtx.scrollCallback)
      setupShimmer(mtx)
    })

    matrix.update((mtx: any) => {
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
