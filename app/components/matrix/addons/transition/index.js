var scrollCallback;

function init (mtx) {
  var prevScroll = 0
  var prevRow = 0

  scrollCallback = () => {
    const relPos = mtx.getRelativeMousePosition(0, window.scrollY)
    const cellPos = mtx.grid.coordToCell(relPos.x, relPos.y)
    const row = cellPos.y + 1

    if (row < 0) {
      return
    } 

    const invRow = mtx.grid.size.y - row // Number of rows from the bottom instead of top
    if (prevRow === row) {
      return
    }

    // Must use the absolute values because both window.scrollY can be -ve on Safari due to the rubberbanding effect
    const isDownScroll = Math.abs(window.scrollY) - Math.abs(prevScroll) >= 0
    const maxOffset = 6
    const maxDelay = 1000

    for (let y=0; y<mtx.grid.size.y; y++) {
      for (let x=0; x<mtx.grid.size.x; x++) {
        const pixel = mtx.grid.getPixel(x, y)

        // Distance (offset) of the pixel from the fade line
        const offset = isDownScroll 
          ? y - (invRow - maxOffset)
          : invRow - y

        // Check if pixel is ready to transition
        let isReady = Math.random() < (offset / maxOffset)
        
        // Force to show all pixels when scrolled to the top
        if (!isDownScroll && invRow === mtx.grid.size.y) {
          isReady = true
        }

        if (!isReady) continue

        // Pixels closer to the fade line will have a shorter delay
        const delay = Math.random() * maxDelay * (maxOffset - offset) / maxOffset

        // Prevent previously pending transitions from executing after the current transition.
        if (pixel.transitionId) {
          clearTimeout(pixel.transitionId)
        }

        pixel.transitionId = setTimeout(() => {
          pixel._transition_addon_hide = isDownScroll ? true : false
        }, delay)
      }
    }

    prevRow = row
    prevScroll = window.scrollY
  }

  mtx.renderTransition = (color) => {
    for (let y=0; y<mtx.grid.size.y; y++) {
      for (let x=0; x<mtx.grid.size.x; x++) {
        const pixel = mtx.grid.getPixel(x, y)
        if (pixel._transition_addon_hide) {
          pixel.set(1, color)
        }
      }
    }
  }

  mtx.onResize(() => {
    prevScroll = 0
    prevRow = 0
    scrollCallback()
  })

  scrollCallback()
  window.addEventListener('scroll', scrollCallback)
}

function destory () {
  window.removeEventListener('scroll', scrollCallback)
}

const transitionAddon = { init, destory }

export default transitionAddon