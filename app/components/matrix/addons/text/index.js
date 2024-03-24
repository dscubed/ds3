import fontMap from './font'

const CHAR_GAP = 1 // Amount of space between adjacent characters

function getTextDisplayData (str) {
  const data = []
  const chars = str.split('')
  let lineWidth = 0
  let lineHeight = 0

  for (let i=0; i<chars.length; i++) {
    const font = fontMap[chars[i]]
    const fontWidth = Math.max(...font.map(line => line.length)) // Length of longest line
    const fontHeight = font.length
    data.push({ 
      font, 
      fontWidth, 
      fontHeight
    })
    
    lineWidth += (i < chars.length - 1) 
      ? fontWidth + CHAR_GAP
      : fontWidth

    lineHeight = Math.max(lineHeight, fontHeight)
  }

  return { data, lineWidth, lineHeight }
}

const colors = {
  1: '#FFFFFF',
  2: '#0472fd',
  3: '#fe0000',
  4: '#222222',
  5: ''
}

function init (mtx) {
  const printText = (fontData, x, y, mode) => {
    fontData.forEach((char, index) => {
      char.font.forEach((line, pixelY) => {
        line.forEach((pixel, pixelX) => {
          if (pixel) {
            mtx.setPixel(pixelX + x, pixelY + y, 1, colors[pixel], mode)
            //colors[pixel] instead of '' to activate different colours
          }
        })
      })
  
      // Add spacing for the next character if any
      if (index < fontData.length - 1) {
        x += char.fontWidth + CHAR_GAP
      }
    })
  }

  mtx.write = (str, mode='normal') => {
    const data = getTextDisplayData(str)
    // Center text
    const x = Math.round((mtx.grid.size.x - data.lineWidth) / 2)
    const y = Math.round((mtx.grid.size.y - data.lineHeight) / 2)
    printText(data.data, x, y, mode)
  }
}

const textAddon = { init }

export default textAddon