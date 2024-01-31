const A = 1
const K = 0.3
const W = 3

function generateWave (x, t) {
  return A * Math.sin(K * x - W * t)
}

function init (mtx) {
  mtx.renderWave = () => {
    for (let y=0; y<mtx.grid.size.y; y++) {
      for (let x=0; x<mtx.grid.size.x; x++) {
        const pixel = mtx.grid.getPixel(x, y)
        const percent = generateWave(x + y, (Date.now() - mtx.startTime) / 1000)
        pixel.width = mtx.config.pixel.width * 0.7 + 5 * percent
        pixel.height = mtx.config.pixel.height  * 0.7 + 5 * percent
      }
    }
  }
}

const waveAddon = { init }

export default waveAddon