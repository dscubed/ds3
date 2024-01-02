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
    this.domNode.dataset.x = x
    this.domNode.dataset.y = y
    this.onStateChangeCallbacks = []
    this.onDeleteCallbacks = []

    if (showCoordinate) {
      this.domNode.textContent = x + ',' + y
    }
  }

  onStateChange (callback) {
    this.onStateChangeCallbacks.push(callback)
  }

  removeOnStateChange (callback) {
    const index = this.onStateChangeCallbacks.indexOf(callback)
    this.onStateChangeCallbacks.splice(index, 1)
  }

  removeOnStateChange (callback) {
    const index = this.onStateChangeCallbacks.indexOf(callback)
    this.onStateChangeCallbacks.splice(index, 1)
  }

  set (state, color = '') {
    this.state = state
    if (state === 1) {
      this.domNode.classList.add('on')
    } else {
      this.domNode.classList.remove('on')
    }
    this.domNode.style.background = color

    this.onStateChangeCallbacks.forEach(callback => {
      callback(this)
    })
  }

  delete () {
    this.domNode.remove()
  }
}

export default class Matrix {
  constructor (selector, showCoordinate = false) {
    this.gridSizeX = -1
    this.gridSizeY = -1
    this.pixels = []
    this.resizeCallbacks = []
    this.showCoordinate = showCoordinate
    this.mouseX = 0
    this.mouseY = 0
    this.mouseMove = false

    this.rootDomNode = document.querySelector(selector)
    this.rootDomNode.classList.add('matrix')
    this.rootDomNode.innerHTML = '' // clear existing content

    this.gridDomNode = document.createElement('div')
    this.gridDomNode.classList.add('matrix-grid')
    this.rootDomNode.appendChild(this.gridDomNode)

    this.createGrid()

    // Check if the grid needs to be updated on window resize:
    // Only update the grid if the new grid is of a different size
    window.addEventListener('resize', () => {
      const [newSizeX, newSizeY] = this.calcGridSize()
      if (!(newSizeX === this.gridSizeX && newSizeY === this.gridSizeY)) {
        this.resetGrid()
        this.createGrid()
        this.resizeCallbacks.forEach(callback => {
          callback(this)
        })
      }
    })

    // Get mouse position on grid
    window.addEventListener('mouseover', event => {
      const domNode = event.target
      if (domNode.classList.contains('pixel')) {
        this.mouseX = Number(domNode.dataset.x)
        this.mouseY = Number(domNode.dataset.y)
        this.mouseMove = true
      }
    })
  }

  setup (callback) {
    callback(this)
  }

  update (callback) {
    // Event loop
    setInterval(() => callback(this), 10)

    // Call update on window resize to avoid flickering
    this.onResize(() => callback(this))

    this.mouseMove = false
  }

  // Reset pixels to off state
  clear () {
    this.pixels.forEach(pixel => {
      pixel.set(0)
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

  createGrid () {
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
    this.pixels.forEach(item => item.delete())
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

  screenToGridPos (x, y) {
    const rect = this.gridDomNode.getBoundingClientRect()
    const gridWidth = rect.width
    const gridHeight = rect.height
    const matrixWindowGapX = (window.innerWidth - gridWidth) / 2 // size of horizontal margin
    const matrixWindowGapY = (window.innerHeight - gridHeight) / 2 // size of vertical margin
    const gridX = Math.ceil((x - matrixWindowGapX) / (PIXEL_SIZE[0] + GRID_GAP))
    const gridY = Math.ceil((y - matrixWindowGapY) / (PIXEL_SIZE[1] + GRID_GAP))
    return [gridX, gridY]
  }

  setPixel (x, y, state, color = '', invert = false) {
    this.pixels.some(pixel => {
      if (x === pixel.x && y === pixel.y) {
        if (invert) {
          // With invert = True, turning on a pixel that is already on will turn it off
          // This allows two overlapping image to be visible when rendered
          pixel.set(pixel.state ? 0 : 1, color)
        } else {
          pixel.set(state, color)
        }
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
            this.setPixel(pixelX + x, pixelY + y, 1, '', true)
          }
        })
      })

      // Add spacing for the next character if any
      if (index < data.length - 1) {
        x += char.fontWidth + 1
      }
    })
  }

  // Display text in the middle of the grid
  display (str) {
    const data = this.translate(str)
    const x = Math.round((this.gridSizeX - data.lineWidth) / 2)
    const y = Math.round((this.gridSizeY - data.lineHeight) / 2)
    this.printText(data, x, y)
  }

  // Draw filled circles
  // https://stackoverflow.com/questions/1201200/fast-algorithm-for-drawing-filled-circles
  // Answer by palm3D
  circle (ox, oy, radius, color = '') {
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        if(x * x + y * y <= radius * radius - 1) {
          this.setPixel(ox + x, oy + y, 1, color)
        }
      }
    }
  }
}