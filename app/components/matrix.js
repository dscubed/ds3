import fontMap from '@/app/components/matrix.font.js'
import setMatrixStyle from '@/app/components/matrix.style.js'

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
  static _config = {
    mode: 'resize', // (resize, gap, pixel)
    pixelSize: [32, 32],
    gridSize: [],
    maxGridSize: [64, 36],
    padding: [0, 0],
    gap: 4,
    radius: 5,
    offColor: 'rgb(var(--background))',
    onColor: 'rgb(var(--foreground))',
    showCoordinate: false,
    delta: 10
  }

  constructor (rootId, config = {}) {
    this.config = {...this.constructor._config, ...config}
    this.gridSizeX = -1
    this.gridSizeY = -1
    this.pixels = []
    this.resizeCallbacks = []
    this.mouseX = 0
    this.mouseY = 0
    this.mouseMove = false

    // Base element
    this.rootDomNode = document.getElementById(rootId)
    this.rootDomNode.classList.add('matrix')
    this.rootDomNode.innerHTML = '' // clear existing content

    // Grid element
    this.gridDomNode = document.createElement('div')
    this.gridDomNode.classList.add('matrix-grid')
    this.rootDomNode.appendChild(this.gridDomNode)

    // Must set styles before creating grid
    setMatrixStyle({ 
      id: rootId,
      radius: this.config.radius,
      offColor: this.config.offColor,
      onColor: this.config.onColor,
     })

    this.createGrid()

    window.addEventListener('resize', () => {
      if (this.config.mode === 'resize') {
        // In resize mode, only continue if the new grid size is different
        const [newSizeX, newSizeY] = this.getGridSize()
        if (newSizeX === this.gridSizeX || newSizeY === this.gridSizeY) {
          return
        }
      }

      this.resetGrid()
      this.createGrid()
      this.resizeCallbacks.forEach(callback => {
        callback(this)
      })
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
    // Run callback immediately before interval is executed to prevent visual delay for lower refresh rates
    callback(this)

    // Event loop
    setInterval(() => callback(this), this.config.delta)

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
    [this.gridSizeX, this.gridSizeY] = this.getGridSize()
    const [pixelWidth, pixelHeight] = this.getPixelSize()

    this.gridDomNode.style.gridTemplateColumns = `repeat(${this.gridSizeX}, ${pixelWidth}px)`
    this.gridDomNode.style.gridTemplateRows = `repeat(${this.gridSizeY}, ${pixelHeight}px)`
    this.gridDomNode.style.gap = `${this.getGap()}px`
  
    for (let y = 0; y < this.gridSizeY; y++) {
      for (let x = 0; x < this.gridSizeX; x++) {
        const pixel = new Pixel(x, y, this.config.showCoordinate)
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

  getPixelSize () {
    if (this.config.mode !== 'pixel') {
      return this.config.pixelSize
    }

    const rect = this.rootDomNode.getBoundingClientRect()
    const width = (rect.width - this.config.padding[0] * 2 - this.config.gap * (this.config.gridSize[0] - 1)) / this.config.gridSize[0]
    return [width, width]
  }

  getGap () {
    if (this.config.mode !== 'gap') {
      return this.config.gap
    }

    const rect = this.rootDomNode.getBoundingClientRect()
    const gap = (rect.width - this.config.padding[0] * 2 - this.config.pixelSize[0] * this.config.gridSize[0]) / (this.config.gridSize[0] - 1)
    return gap
  }

  getGridSize () {
    if (this.config.mode !== 'resize') {
      return this.config.gridSize
    }

    const rect = this.rootDomNode.getBoundingClientRect()
    const pixelSize = this.getPixelSize()
    const gap = this.getGap()
    const x = Math.min(Math.floor((rect.width - this.config.padding[0] * 2 - gap) / (pixelSize[0] + gap)), this.config.maxGridSize[0])
    const y = Math.min(Math.floor((rect.height - this.config.padding[1] * 2 - gap) / (pixelSize[1] + gap)), this.config.maxGridSize[1])
    return [x, y]
  }

  screenToGridPos (x, y) {
    const rect = this.gridDomNode.getBoundingClientRect()
    const pixelSize = this.getPixelSize()
    const gap = this.getGap()
    const gridX = Math.ceil((x - rect.x) / (pixelSize[0] + gap))
    const gridY = Math.ceil((y - rect.y) / (pixelSize[1] + gap))
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