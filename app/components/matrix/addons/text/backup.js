import fontMap from './font'

function translate (str) {
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

function printText (mtx, { data, lineWidth, lineHeight }, x, y, mode) {
  data.forEach((char, index) => {
    char.font.forEach((line, pixelY) => {
      line.forEach((pixel, pixelX) => {
        if (pixel === 1) {
          mtx.setPixel(pixelX + x, pixelY + y, 1, '', mode)
        }
      })
    })

    // Add spacing for the next character if any
    if (index < data.length - 1) {
      x += char.fontWidth + 1
    }
  })
}

const textAddon = {
  init (mtx) {
    mtx.write = (str, mode='normal') => {
      // console.log(mode)
      const data = translate(str)
      const x = Math.round((mtx.grid.size.x - data.lineWidth) / 2)
      const y = Math.round((mtx.grid.size.y - data.lineHeight) / 2)
      printText(mtx, data, x, y, mode)
    }
  }
}

export default textAddon