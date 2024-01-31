import _ from 'lodash'
import { CONFIG as DEFAULT_PIXEL_CONFIG } from './pixel'
import { CONFIG as DEFAULT_GRID_CONFIG } from './grid'
import Grid from './grid'

export const CONFIG = {
  backgroundColor: '#000',
  debug: false,
  frameRate: 120,
}

export default class Matrix {
  static _config = {
    pixel: DEFAULT_PIXEL_CONFIG,
    grid: DEFAULT_GRID_CONFIG,
    ...CONFIG,
  }

  constructor (domId, config = {}, addons = []) {
    this.config = _.merge(_.cloneDeep(this.constructor._config), _.cloneDeep(config))
    this.domId = domId
    this.canvas = null
    this.ctx = null
    this.grid = null
    this.backgroundColor = this.config.backgroundColor
    this.addons = addons
    this.resizeCallbacks = []
    this.mouseMoveCallbacks = []
    this.renderCallbacks = []
    this.animationFrameId = null
    this.fps = 0
    this.startTime = null
    this.prevFrame = 0
    this.deltaPerFrame = 1000 / this.config.frameRate
    this.isAnimationCancelled = false
    this.fpsIntervalId = null

    // console.log(this.setResizeCallbacks.bind(this))
  }

  init () {
    this.canvas = document.getElementById(this.domId)
    this.ctx = this.canvas.getContext('2d')
    this.grid = new Grid({
      canvas: this.canvas, 
      config: {
        ...this.config.grid,
        pixel: this.config.pixel,
      }
    })
    this.setCanvasSize()
    this.grid.init()
    this.onResize(() => {
      this.setCanvasSize()
      this.grid.resize()
    })
    this._render()
    this.updateFPS()

    window.addEventListener('resize', this.setResizeCallbacks)
    window.addEventListener('mousemove', this.setMouseMoveCallbacks)
    window.addEventListener('touchmove', this.setMouseMoveCallbacks, { passive: false })

    this.addons.forEach(addon => {
      if (addon.init) {
        addon.init(this)
      }
    })
  }

  setResizeCallbacks = (event) => {
    this.resizeCallbacks.forEach(callback => {
      callback(event)
    })
  }

  updateFPS () {
    this.fpsIntervalId = setInterval(() => {
      this.fps = Math.round(1000 / this.delta)
    }, 100)
  }

  getRelativeMousePosition (x, y) {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: x - rect.left,
      y: y - rect.top
    }
  }

  setCanvasSize () {
    const scale = 1 // window.devicePixelRatio
    const rect = this.canvas.getBoundingClientRect()
    this.ctx.canvas.width  = scale * rect.width
    this.ctx.canvas.height = scale * rect.height
    this.ctx.scale(scale, scale)
  }

  onResize (callback) {
    this.resizeCallbacks.push(callback)
  }

  onMouseMove (callback) {
    this.mouseMoveCallbacks.push(callback)
  }

  /** 
   * Wrap this in a function so the same code can be used for
   * mouse move and touch events
   */
  setMouseMoveCallbacks = (event) => {
    this.mouseMoveCallbacks.forEach(callback => {
      let x, y
      if (event instanceof MouseEvent) { 
        // Mouse event
        x = event.clientX
        y = event.clientY
      } else { 
        // Touch event
        x = event.targetTouches[0].clientX 
        y = event.targetTouches[0].clientY
      }
      const relativePos = this.getRelativeMousePosition(x, y)
      callback(event, relativePos)
    })
  }

  setPixel (...args) {
    this.grid.setPixel(...args)
  }

  render (callback) {
    this.renderCallbacks.push(callback)
  }

  _render (time) {
    if (this.isAnimationCancelled) {
      // Do nothing if animation is cancelled,
      // otherwise requestAnimationFrame() will restart the render loop
      return
    }

    if (!time) {
      requestAnimationFrame(this._render.bind(this))
      return
    }

    /**
     * Execute render code at a fixed rate
     * https://stackoverflow.com/questions/46300964/requestanimationframe-javascript-constant-frame-rate-smooth-graphics
     * In a nut shell, requestAnimationFrame is not called at a regular interval,
     * so calculating time delta based on the time between requestAnimationFrame calls is not accurate and prone to one off errors.
     * To ensure the render code is executed at a fixed rate, we calculate which frame we are currently in.
     * If the current frame number is the same as the previous frame number, then the extra requestAnimationFrame callback is discarded.
     * Else, the difference between frame number is calculated, and multiplied by the pre defined delta per frame to get the total time delta.
     */
    if(this.startTime === null ){
        this.startTime = time;
    }

    const currentFrame = Math.round((time - this.startTime) / this.deltaPerFrame)
    const delta = (currentFrame - this.prevFrame) * this.deltaPerFrame

    if (delta === 0) {
      this.animationFrameId = requestAnimationFrame(this._render.bind(this))
      return
    }

    this.delta = delta
    this.ctx.delta = delta // Store delta in ctx so pixels use it to smoothly transition colors

    // Clear canvas
    this.ctx.fillStyle = this.backgroundColor 
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Custom render functions
    this.renderCallbacks.forEach(callback => {
      callback(this)
    })

    // Show frame rate in debug mode
    if (this.config.debug) {
      this.ctx.fillStyle = 'red'
      this.ctx.font = "16px Arial"
      this.ctx.fillText(this.fps + ' FPS', 0, 16)
    }

    // Update time
    this.prevFrame = currentFrame
    this.animationFrameId = requestAnimationFrame(this._render.bind(this))
  }

  destroy () {
    this.isAnimationCancelled = true
    cancelAnimationFrame(this.animationFrameId)
    this.grid.destroy()
    this.addons.forEach(addon => {
      if (addon.destory) {
        addon.destory(this)
      }
    })
    clearInterval(this.fpsIntervalId)
    this.grid = null
    this.addons = []
    this.resizeCallbacks = []
    this.mouseMoveCallbacks = []
    this.renderCallbacks = []
    window.removeEventListener('resize', this.setResizeCallbacks)
    window.removeEventListener('mousemove', this.setMouseMoveCallbacks)
    window.removeEventListener('touchmove', this.setMouseMoveCallbacks, { passive: false })
  }
}