import _ from 'lodash'
import Pixel from './pixel'
import { CONFIG as DEFAULT_PIXEL_CONFIG } from './pixel'

export const CONFIG = {
  enforce: 'pixel',
  size: {
    x: 64,
    y: 36
  },
  gap: 2,
  hideOffPixels: false,
  drawShape: 'rect',
}

export default class Grid {
  static _config = {
    ...CONFIG,
    pixel: DEFAULT_PIXEL_CONFIG,
  }

  constructor ({ canvas, config }) {
    this.config = _.merge(_.cloneDeep(this.constructor._config), _.cloneDeep(config))
    this.size = {}
    this.pixels = []
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.paddingLeft = 0
    this.paddingTop = 0
    this.gap = this.config.gap
  }

  init () {
    this.size = this.getSize()
    this.create()
    this.resize()
  }

  getSize () {
    if (this.config.enforce === 'pixel') {
      // Enforce pixel size and adjust grid width and height
      const rect = this.canvas.getBoundingClientRect()
      const pixelSize = this.getPixelSize()

      const x = Math.min(
        Math.floor((rect.width - this.gap) / (pixelSize.width + this.gap)), 
        this.config.size.x
      )
      const y = Math.min(
        Math.floor((rect.height - this.gap) / (pixelSize.height + this.gap)), 
        this.config.size.y
      )
      return { x, y }
    }
    return this.config.size
  }

  getPixelSize () {
    if (this.config.enforce === 'grid') {
      const canvas = this.ctx.canvas
      const width = Math.round((canvas.width - this.gap * (this.config.size.x - 1)) / this.config.size.x)
      return { width, height: width } // Return square pixel
    }

    return {
      width: this.config.pixel.width,
      height: this.config.pixel.height,
    }
  }

  create () {
    this.pixels = [] // Reset

    for (let y=0; y<this.size.y; y++) {
      const row = []
      for (let x=0; x<this.size.x; x++) {
        row.push(new Pixel({ config: this.config.pixel }))
      }
      this.pixels.push(row)
    }
  }

  resize () {
    if (this.config.enforce === 'pixel') {
      // Enforce pixel size and adjust grid width and height
      const newSize = this.getSize()
      if (!_.isEqual(newSize, this.size)) {
        this.size = newSize
        this.create()
      }
    } else if (this.config.enforce === 'grid') {
      // Enforce grid size
      const { width, height } = this.getPixelSize()
      this.updatePixelSize(width, height)
    } else {
      const rect = this.canvas.getBoundingClientRect()
      this.gap = (rect.width - this.config.pixel.width * this.size.x) / (this.size.x - 1)
    }

    // Calculate padding
    // We want to cente the grid in canvas
    const rect = this.canvas.getBoundingClientRect()
    const pixelSize = this.getPixelSize()
    this.paddingLeft = (rect.width - (( pixelSize.width + this.gap ) * this.size.x - this.gap)) / 2
    this.paddingTop = (rect.height - (( pixelSize.height + this.gap ) * this.size.y - this.gap)) / 2
  }

  updatePixelSize (newWidth, newHeight) {
    for (let y=0; y<this.size.y; y++) {
      const row = this.pixels[y]
      for (let x=0; x<this.size.x; x++) {
        const pixel = row[x]
        pixel.width = newWidth
        pixel.height = newHeight
      }
    }
  }

  getPixel (x, y) {
    try {
      return this.pixels[y][x]
    } catch (error) {
      // Return null when pixel is outside the grid size
      return null
    }
  } 

  setPixel (x, y, state = 1, color = null, mode='normal') {
    const pixel = this.getPixel(x, y)
    if (!pixel) {
      return
    }

    /** 
     * When the mode is set to invert and the pixel is on,
     * setting the state again will turn the pixel off.
     */
    if (pixel.mode === 'invert') {
      pixel.set(0, null, pixel.mode) // Must continue setting mode to 'invert'
    } else {
      pixel.set(state, color, mode) 
    }
  }

  coordToCell (x, y) {
    const pixelSize = this.getPixelSize()
    const cellX = Math.floor((x - this.paddingLeft) / (pixelSize.width + this.gap))
    const cellY = Math.floor((y - this.paddingTop) / (pixelSize.height + this.gap))
    return {
      x: cellX,
      y: cellY
    }
  }

  cellToCoord (cellX, cellY) {
    const pixelSize = this.getPixelSize()
    const x = Math.floor(Math.max(cellX) * (pixelSize.width + this.gap) + this.paddingLeft)
    const y = Math.floor(Math.max(cellY) * (pixelSize.height + this.gap) + this.paddingTop)
    return { x, y }
  }

  groupPixelsByColor () {
    const groups = {}
    for (let y=0; y<this.size.y; y++) {
      for (let x=0; x<this.size.x; x++) {
        const pixel = this.getPixel(x, y)
      
        // Run color transitions
        pixel.update(this.ctx.delta)

        // If hideOffPixels is true, don't render off pixels
        if (this.config.hideOffPixels && pixel.state === 0) {
          continue
        }

        // Add pixel to color group
        const color = pixel.getCurrentColor()
        if (!(color in groups)) {
          groups[color] = []
        }
        groups[color].push({ x, y, pixel })
      }
    }
    return groups
  } 

  render () {
    const RAD_2 = 2 * Math.PI
    const pixelSize = this.getPixelSize()
    const groups = this.groupPixelsByColor()

    /**
     * Render pixels by color.
     * This method greatly reduces the number of individual paths and fill operations
     * which improves performance.
     */
    for (const color in groups) {
      this.ctx.beginPath()
      const items = groups[color]

      for (let i=0; i<items.length; i++) {
        const { x, y, pixel } = items[i]

        if (this.config.drawShape === 'rect') {
          // Draw rectangle
          // const onScreenX = Math.floor(x * (pixelSize.width + this.gap) + this.paddingLeft)
          // const onScreenY = Math.floor(y * (pixelSize.height + this.gap) + this.paddingTop)
          // Disable rounding when rendering to remove mesh screen effect on small displays
          const onScreenX = x * (pixelSize.width + this.gap) + this.paddingLeft
          const onScreenY = y * (pixelSize.height + this.gap) + this.paddingTop
          this.ctx.rect(onScreenX, onScreenY, pixel.width, pixel.height)
        } else if (this.config.drawShape === 'circle') {
          // Draw circle
          // Offset the drawing position because the circle's origin is at the center, not top left
          const offset = this.config.pixel.width / 2
          const onScreenX = Math.floor(x * (pixelSize.width + this.gap) + this.paddingLeft + offset)
          const onScreenY = Math.floor(y * (pixelSize.height + this.gap) + this.paddingTop + offset)
          const radius = pixel.width / 2
          this.ctx.moveTo(onScreenX + radius, onScreenY)
          this.ctx.arc(onScreenX, onScreenY, radius, 0, RAD_2)
        }
      }
      this.ctx.fillStyle = color
      this.ctx.fill()
    }
  }

  reset () {
    for (let y=0; y<this.size.y; y++) {
      for (let x=0; x<this.size.x; x++) {
        const pixel = this.getPixel(x, y)
        pixel.reset()
      }
    }
  }

  destroy () {
    this.pixels = []
  }
}