import _ from 'lodash'

export const CONFIG = {
  width: 32, 
  height: 32,
  rounded: 10,
  colors: {
    off: '#000',
    on: '#FFF',
  }
}

// Convert hex code to RGB
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  try {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
  } catch {
    throw new Error('Unable to parse hex code.')
  }
}

// Map a range of values to another
function mapToRange (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

export default class Pixel {
  constructor ({ config }) {
    config = _.merge(_.cloneDeep(CONFIG), _.cloneDeep(config))
    this.width = config.width
    this.height = config.height
    this.rounded = config.rounded
    this.state = 0
    this.mode = 'normal'
    this.onColor = config.colors.on
    this.offColor = config.colors.off

    // Animation
    this.requestedColor = null
    this.fromColor = this.getRBG(this.offColor)
    this.toColor = this.getRBG(this.offColor)
    this.transitionColor = this.getRBG(this.offColor)
    this.transitionStep = 0
    this.duration = 50
  }

  getRBG (color) {
    if (color[0] === '#') {
      return hexToRgb(color)
    }

    const values = color.replace('rgb(', '').replace(')', '').split(' ')
   try {
      return {
        r: parseInt(values[0]),
        g: parseInt(values[1]),
        b: parseInt(values[2]),
      }
    } catch {
      throw new Error("Unable to parse RBG values.")
    }
  }

  getCurrentColor () {
    const c = this.transitionColor
    return `rgb(${c.r} ${c.g} ${c.b})`
  }

  set (state, color = null, mode = 'normal') {
    this.state = state
    this.mode = mode
    this.requestColorChange(
      this.state === 1 
        ? color || this.onColor
        : this.offColor
    )
  }

  requestColorChange (color) {
    this.requestedColor = this.getRBG(color)
  }

  /**
   * Since multiple colors can be assigned to the same pixel during the render loop, 
   * latter code has priority and will override previous color assignments.
   * Therefore, transition is ONLY updated at the end of the render loop, once we know 
   * for certain which color to change to.
   * Otherwise the color will not change because transition is being reset continuously
   */
  updateColors () {
    /**
     * Always begin transition from the current transition color value.
     * This ensures continuity when a new color is set before the previous transition is completed.
     */
    if (this.requestedColor && !_.isEqual(this.toColor, this.requestedColor)) {
      this.transitionStep = 0
      this.fromColor = this.transitionColor
      this.toColor = this.requestedColor
      this.requestedColor = null
    }
  }

  updateTransition (stepSize) {
    if (this.transitionStep > this.duration) return
    this.transitionStep += stepSize
    const r = Math.round(mapToRange(Math.min(this.transitionStep, this.duration), 0, this.duration, this.fromColor.r, this.toColor.r))
    const g = Math.round(mapToRange(Math.min(this.transitionStep, this.duration), 0, this.duration, this.fromColor.g, this.toColor.g))
    const b = Math.round(mapToRange(Math.min(this.transitionStep, this.duration), 0, this.duration, this.fromColor.b, this.toColor.b))
    this.transitionColor = { r, g, b }
  }

  render (ctx, onScreenX, onScreenY) {
    this.updateColors()
    this.updateTransition(ctx.delta)

    onScreenX = Math.floor(onScreenX)
    onScreenY = Math.floor(onScreenY)
    const width = Math.floor(this.width)
    const height = Math.floor(this.height)

    ctx.beginPath()
    ctx.fillStyle = this.getCurrentColor()
    
    // Use fillRect on older browsers that doesn't support roundRect
    const drawFunc = (ctx.roundRect || ctx.fillRect).bind(ctx)
    drawFunc(onScreenX, onScreenY, width, height, this.rounded)
    ctx.fill()
  }

  reset () {
    this.state = 0
    this.mode = 'normal'

    // Only reset colors once the most recent transition is complete
    if (this.transitionStep > this.duration) {
      this.requestColorChange(this.offColor)
    }
  }
}