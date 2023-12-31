import fontMap from '@/app/components/matrix.font.js'
import setMatrixStyle from '@/app/components/matrix.style.js'

const PIXEL_SIZE = [32, 32]
const GRID_GAP = 4
const GRID_PADDING = [0, 0]
const MAX_GRID_SIZE = [64, 36]

setMatrixStyle({ gap: GRID_GAP })

class Pixel {
  constructor (x, y, showCoordinate = false) {
    this.x = x
    this.y = y
    this.state = 1 // On or off
    this.domNode = document.createElement('div')
    this.domNode.classList.add('pixel')

    if (showCoordinate) {
      this.domNode.textContent = x + ',' + y
    }
  }

  setState (state) {
    this.state = state
    if (state === 1) {
      this.domNode.classList.add('on')
    } else {
      this.domNode.classList.remove('on')
    }
  }
}

export default class Matrix {
  constructor (selector, action = null, showCoordinate = false) {
    this.gridSizeX = -1
    this.gridSizeY = -1
    this.pixels = []
    this.resizeCallbacks = []
    this.showCoordinate = showCoordinate

    this.rootDomNode = document.querySelector(selector)
    this.rootDomNode.classList.add('matrix')
    this.rootDomNode.innerHTML = '' // clear existing content

    this.gridDomNode = document.createElement('div')
    this.gridDomNode.classList.add('matrix-grid')
    this.rootDomNode.appendChild(this.gridDomNode)

    this.initGrid()

    // Run action on load and on window resize
    if (action) {
      action(this)
      this.onResize(action)
    }

    // Check if the grid needs to be updated on window resize:
    // Only update the grid if the new grid is of a different size
    window.addEventListener('resize', () => {
      const [newSizeX, newSizeY] = this.calcGridSize()
      if (!(newSizeX === this.gridSizeX && newSizeY === this.gridSizeY)) {
        this.resetGrid()
        this.initGrid()
        this.resizeCallbacks.forEach(callback => {
          callback(this)
        })
      }
    })
  }

  onResize (callback) {
    this.resizeCallbacks.push(callback)
  }

  removeOnResize (callback) {
    const index = this.resizeCallbacks.indexOf(callback)
    if (index > -1) {
      this.resizeCallbacks.splice(index, 1)
    }
  }

  initGrid () {
    [this.gridSizeX, this.gridSizeY] = this.calcGridSize()
    this.gridDomNode.style.gridTemplateColumns = `repeat(${this.gridSizeX}, ${PIXEL_SIZE[0]}px)`
    this.gridDomNode.style.gridTemplateRows = `repeat(${this.gridSizeY}, ${PIXEL_SIZE[1]}px)`
  
    for (let y = 0; y < this.gridSizeY; y++) {
      for (let x = 0; x < this.gridSizeX; x++) {
        const pixel = new Pixel(x, y, this.showCoordinate)
        this.gridDomNode.appendChild(pixel.domNode)
        this.pixels.push(pixel)
      }
    }
  }

  resetGrid () {
    // Remove any previous pixels
    this.pixels.forEach(item => {
      item.domNode.remove()
    })
    this.pixels = []
  }

  calcGridSize () {
    const x = Math.min(
      Math.floor((window.innerWidth - GRID_PADDING[0] * 2) / (PIXEL_SIZE[0] + GRID_GAP)),
      MAX_GRID_SIZE[0]
    )
    const y = Math.min(
      Math.floor((window.innerHeight - GRID_PADDING[1] * 2) / (PIXEL_SIZE[1] + GRID_GAP)),
      MAX_GRID_SIZE[1]
    )
    return [x, y]
  }

  setPixelState (x, y, state) {
    this.pixels.some(item => {
      if (x === item.x && y === item.y) {
        item.setState(state)
        return true
      }
    })
  }

  // Map string to matrix display font
  translate (str) {
    const data = []
    const chars = str.split('')
    let lineWidth = 0
    let lineHeight = 0

    for (let i=0; i<chars.length; i++) {
      const font = fontMap[chars[i]]
      const fontWidth = Math.max(...font.map(line => line.length)) // length of longest line
      const fontHeight = font.length

      data.push({ font, fontWidth, fontHeight })

      lineWidth += (i < chars.length - 1) 
        ? fontWidth + 1 
        : fontWidth

      lineHeight = Math.max(lineHeight, fontHeight)
    }

    return {data, lineWidth, lineHeight}
  }

  // Display font on grid
  printText ({ data, lineWidth, lineHeight }, x, y) {
    data.forEach((char, index) => {
      char.font.forEach((line, pixelY) => {
        line.forEach((pixel, pixelX) => {
          if (pixel === 1) {
            this.setPixelState(pixelX + x, pixelY + y, 1)
          }
        })
      })

      // Add spacing for the next character if any
      if (index < data.length - 1) {
        x += char.fontWidth + 1
      }
    })
  }

  // Display text in the center
  display (str) {
    const data = this.translate(str)
    const x = Math.round((this.gridSizeX - data.lineWidth) / 2)
    const y = Math.round((this.gridSizeY - data.lineHeight) / 2)
    this.printText(data, x, y)
  }

  // Draw filled circles
  // https://stackoverflow.com/questions/1201200/fast-algorithm-for-drawing-filled-circles
  // Answer by palm3D
  circle (ox, oy, radius) {
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        if(x * x + y * y <= radius * radius - 1) {
          this.setPixelState(ox + x, oy + y, 1)
        }
      }
    }
  }
}