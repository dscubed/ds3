'use client'
import p5 from 'p5'
import cities from 'cities.json'
import { useEffectOnce } from "@/app/lib/utils"

const config = {
  pixelSize: 10, // use 1 for 1:1 scale
  crop: {
    top: 170,
    bottom: 450,
    left: 160,
    right: 100
  },

  // Coordinate of (0, 0) on the uncropped image
  origin: {
    x: 128,
    y: 128
  }
}

// Convert world coordinates (WGS84) to pixels
// https://developers.google.com/maps/documentation/javascript/examples/map-coordinates?csw=1#maps_map_coordinates-javascript
function project(lat, lng) {
  const TILE_SIZE = 256
  let siny = Math.sin((lat * Math.PI) / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  return {
    x: TILE_SIZE * (0.5 + lng / 360),
    y: TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)),
  }
}

function getPixelCoordinate (lat, lng) {
  const zoom = 2
  const scale = 1 << zoom
  const worldCoordinate = project(lat, lng);
  const pixelCoordinate = {
    x: Math.floor(worldCoordinate.x * scale),
    y: Math.floor(worldCoordinate.y * scale),
  }
  return pixelCoordinate
}

function getPixelCoordinateByName (name, country = '') {
  const city = cities.find(item => item.name === name && (!country || country === item.country))
  return getPixelCoordinate(city.lat, city.lng)
}

function getScaledCoordinate ({ x, y }) {
  return {
    x: Math.floor((x + (config.origin.x - config.crop.left)) / config.pixelSize) * config.pixelSize,
    y: Math.floor((y + (config.origin.y - config.crop.top)) / config.pixelSize) * config.pixelSize
  }
}

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

            if (brightness > 10) {
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
        p5.circle(x, y, config.pixelSize)

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