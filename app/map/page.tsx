'use client'
import p5 from 'p5'
import cities from 'cities.json'
import { useEffectOnce } from "@/app/lib/utils"
import { config, getPixelCoordinateByName, getScaledCoordinate } from '@/app/lib/map-utils'

export default function Pixelate () {
  useEffectOnce(() => {
    const mapData = []

    new p5(p5 => {
      var image

      p5.preload = () => {
        const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
        const APIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        image = p5.loadImage(`https://maps.googleapis.com/maps/api/staticmap?map_id=${mapId}&center=0,0&zoom=1&size=640x640&scale=2&key=${APIKey}`)
      }

      p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight)
        p5.noStroke()
        p5.background(255)

        // Must load pixels before they can be accessed via image.pixels
        image.loadPixels()

        // Draw pixelated map
        for (let y = config.crop.top; y < image.height - config.crop.bottom; y += config.pixelSize) {
          mapData.push([])

          for (let x = config.crop.left; x < image.width - config.crop.right; x += config.pixelSize) {
            const i = (x + y * image.width) * 4
            const r = image.pixels[i + 0]
            const g = image.pixels[i + 1]
            const b = image.pixels[i + 2]
            const brightness = (r + g + b) / 3

            if (brightness > 20) {
              p5.fill(255)
              mapData[mapData.length - 1].push(0)
            } else {
              p5.fill(0)
              mapData[mapData.length - 1].push(1)
            }

            p5.circle(x-config.crop.left, y-config.crop.top, config.pixelSize)
          }
        }

        // Test a city to see if map and coordinate systems are a match
        p5.fill(255, 0, 0)
        const coord = getPixelCoordinateByName('Melbourne')
        const { x, y } = getScaledCoordinate(coord)
        p5.circle(x * config.pixelSize, y * config.pixelSize, config.pixelSize)

        // Print map data as array
        console.log('[\n' + mapData.map(row => ' [' + row.join(', ') + ']').join(',\n') + '\n]')

        // Show map size (w, h)
        console.log(mapData[0].length, mapData.length)
      }
    })
  }, [])

  return (
    <main></main>
  )
}