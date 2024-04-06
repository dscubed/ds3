function generateRandomColor () {
  return ('#' + Math.floor(Math.random() * 16777215).toString(16)).padEnd(7, '0')
}

// Map a range of values to another
function mapToRange (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

class Trail {
  constructor (x, y, radius, color) {
    this.pos = { x, y }
    this.radius = radius
    this.maxRadius = radius
    this.color = color
    this.animationStep = 0
    this.duration = 500
  }

  update (mtx) {
    this.animationStep += mtx.ctx.delta

    if (this.radius > 0) {
      // Increase radius
      this.radius = Math.round(
        mapToRange(Math.min(this.animationStep, this.duration), 0, this.duration, this.maxRadius, 0)
      )
    } else {
      // Reset animation
      this.radius = 0
      this.animationStep = 0
    }
  }

  render (mtx) {
    /**
     * Draw filled circles
     * https://stackoverflow.com/questions/1201200/fast-algorithm-for-drawing-filled-circles
     * Answer by palm3D
     */
    for (let y = -this.radius; y <= this.radius; y++) {
      for (let x = -this.radius; x <= this.radius; x++) {
        if(x * x + y * y <= this.radius * this.radius - 1) {
          mtx.setPixel(this.pos.x + x, this.pos.y + y, 1, this.color)
        }
      }
    }
  }
}

function init (mtx) {
  let trails = []
  let lastMouseMoveTime = new Date()
  let prevPos = { x: null, y: null} // Mouse or touch
  let prevCellPos = { x: null, y: null}
  const maxRadius = window.innerWidth > 640
      ? 6
      : 3
  
  function mouseMoveCallback (event, relativePos) {
    // Debounce every 15ms
    const now = Date.now()
    if (now - lastMouseMoveTime < 15) {
      return
    }

    lastMouseMoveTime = now

    const { x, y } = relativePos
    const cellPos = mtx.grid.coordToCell(x, y)

    if (cellPos.x === prevCellPos.x && cellPos.y === prevCellPos.y) {
      // Do nothing if mouse is on the same cell
      return
    }

    const distance = Math.sqrt((x - prevPos.x) ** 2 + (y - prevPos.y) ** 2)
    // Set trail size based on speed
    // const radius = Math.round(mapToRange(Math.min(distance, 150), 0, 150, 1, maxRadius))
    const radius = maxRadius
    const color = generateRandomColor()
    trails.push(new Trail(cellPos.x, cellPos.y, radius, color))
    prevPos = { x, y }
    prevCellPos = { x: cellPos.x, y: cellPos.y }
  }


  mtx.onMouseMove(mouseMoveCallback)

  mtx.renderTrails = () => {
    for (let i = trails.length - 1; i >= 0; i--) {
      const item = trails[i]

      item.update(mtx)

      // Remove invisible trails
      if (item.radius <= 0) {
        trails.splice(i, 1)
        continue
      }

      item.render(mtx)
    }
  }
}

const trailAddon = { init }

export default trailAddon