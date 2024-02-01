import { mapToRange } from "@/app/lib/utils"

class Ping {
  constructor (x, y, innerRadius = 30) {
    this.pos = { x, y }
    this.innerRadius = innerRadius
    this.outerRadius = this.innerRadius
    this.maxOuterRadius = innerRadius * 2
    this.animationStep = 0
    this.duration = 1000
  }

  update (mtx) {
    this.animationStep += mtx.ctx.delta

    if (this.outerRadius < this.maxOuterRadius) {
      // Increase radius
      this.outerRadius = mapToRange(Math.min(this.animationStep, this.duration), 0, this.duration, this.innerRadius, this.maxOuterRadius)
    } else {
      // Reset animation
      this.outerRadius = this.innerRadius
      this.animationStep = 0
    }
  }

  render (mtx, layer='outer', color) {
    const cellPos = mtx.grid.cellToCoord(this.pos.x, this.pos.y)
    const opacity = (this.maxOuterRadius - this.outerRadius) / this.maxOuterRadius
    // const color = Math.round(opacity * 255)

    if (layer === 'outer') {
      // Draw outer circle
      mtx.ctx.globalAlpha = opacity
      mtx.ctx.beginPath()
      mtx.ctx.fillStyle = color
      mtx.ctx.arc(cellPos.x, cellPos.y, this.outerRadius, 0, 2 * Math.PI)
      mtx.ctx.fill()
    } else {
      // Draw inner circle
      mtx.ctx.globalAlpha = 0.8
      mtx.ctx.beginPath()
      mtx.ctx.fillStyle = color
      mtx.ctx.arc(cellPos.x, cellPos.y, this.innerRadius, 0, 2 * Math.PI)
      mtx.ctx.fill()
    }
  }
}

function init (mtx) {
  const pings = []

  mtx.setPing = (x, y, radius) => {
    pings.push(new Ping(x, y, radius))
  }

  mtx.renderPings = (color) => {
    for (let i=0; i<pings.length; i++) {
      const ping = pings[i]
      ping.update(mtx)
      ping.render(mtx, 'outer', color)
    }
    for (let i=0; i<pings.length; i++) {
      const ping = pings[i]
      ping.render(mtx, 'inner', color)
    }
  }
}

const pingAddon = { init }

export default pingAddon