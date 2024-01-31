import _ from 'lodash'
import Pixel from './pixel'
import { CONFIG as DEFAULT_PIXEL_CONFIG } from './pixel'

export const CONFIG = {
  enforce: 'pixel',
  size: {
    x: 64,
    y: 36
  },
  gap: 2
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
      const width = (canvas.width - this.gap * (this.config.size.x - 1)) / this.config.size.x
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

  render () {
    const pixelSize = this.getPixelSize()

    for (let y=0; y<this.size.y; y++) {
      for (let x=0; x<this.size.x; x++) {
        const onScreenX = x * (pixelSize.width + this.gap) + this.paddingLeft
        const onScreenY = y * (pixelSize.height + this.gap) + this.paddingTop
        const pixel = this.getPixel(x, y) // pixel will never be null
        pixel.render(this.ctx, onScreenX, onScreenY)
        // Reset pixel states
        pixel.reset()
      }
    }
  }

  destroy () {
    this.pixels = []
  }
}