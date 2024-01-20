'use client'
import Matrix from '@/app/components/matrix'
import { mapToRange, useEffectOnce } from '@/app/lib/utils'
import { getPixelCoordinateByName, getScaledCoordinate } from '@/app/lib/map-utils'

type LocationData = { name: string, country?: string, count: number }[]

const data: LocationData = [
  { name: 'Pretoria', count: 1 },
  { name: 'Washington', count: 1 },
  { name: 'Austin', count: 2 },
  { name: 'Chengdu', count: 1 },
  { name: 'Tauranga', count: 1 },
  { name: 'Auckland', count: 6 },
  { name: 'Melbourne', count: 59 },
  { name: 'Sydney', count: 24 },
  { name: 'Taipei', count: 10 },
  { name: 'Shanghai', count: 4 },
  { name: 'Beijing', count: 5 },
  { name: 'London', count: 20 },
  { name: 'Drouin', count: 1 },
]

const points: { x: number, y: number, radius: number }[] = []

function getMinCity (data: LocationData) {
  let min = { count: 0 }
  data.forEach(item => {
    if (item.count < min.count) {
      min = item
    }
  })
  return min
}

function getMaxCity (data: LocationData) {
  let max = { count: 0 }
  data.forEach(item => {
    if (item.count > max.count) {
      max = item
    }
  })
  return max
}

export default function MapMatrix() {
  useEffectOnce(() => {
    const config = {
      mode: 'gap',
      pixelSize: [3, 3],
      radius: 100,
      offColor: 'rgb(var(--background-secondary))',
      onColor: 'rgb(var(--text-secondary))',
      gridSize: [102, 66],
      padding: [10, 0],
      delta: 10000 // 0.1 HZ
    }

    if (window.innerWidth < 640) {
      config.pixelSize = [1, 1]
    }

    const matrix = new Matrix('map-matrix', config)

    let minLocationRadius = 10
    let maxLocationRadius = 30

    if (window.innerWidth < 640) {
      minLocationRadius = 5
      maxLocationRadius = 20
    }
    if (window.innerWidth < 480) {
      minLocationRadius = 5
      maxLocationRadius = 10
    }

    const min = getMinCity(data)
    const max = getMaxCity(data)

    var setStyle = (function (style) {
      var sheet = document.head.appendChild(style).sheet!;
      return function (selector: string, css: any) {
          var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
              return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
          }).join(";");
          sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
      };
    })(document.createElement("style"))

    function plotCity (radius: number, opacity: number, name: string, country: string = '') {
      const coord = getPixelCoordinateByName(name, country)
      const { x, y } = getScaledCoordinate(coord)
      const prevPoint = points.find(item => item.x === x && item.y === y)
      if (prevPoint && radius <= prevPoint.radius) {
        return 
      }

      if (prevPoint) prevPoint.radius = radius
      else points.push({ x, y, radius })

      const pixel = matrix.pixels.find(pixel => pixel.x === x && pixel.y === y)
      pixel.domNode.id = name
      pixel.domNode.style.position = 'relative'
      
      // pixel.domNode.style.background = `rgb(var(--foreground) / ${opacity})`
      setStyle(`#${name}:before`, {
        'content': '',
        'position': 'absolute',
        'width': radius + 'px',
        'height': radius + 'px',
        'top': '50%',
        'left': '50%',
        'opacity': opacity, 
        'transform': 'translate(-50%, -50%)',
        'background': 'rgb(var(--foreground))',
        'border-radius': '100%',
        'animation-delay': Math.random() - 0.9 + 's',
      })

      setStyle(`#${name}:after`, {
        'content': '',
        'position': 'absolute',
        'width': radius + 'px',
        'height': radius + 'px',
        'top': '50%',
        'left': '50%',
        'opacity': opacity, 
        'transform': 'translate(-50%, -50%)',
        'background': 'rgb(var(--foreground))',
        'border-radius': '100%',
        'animation': 'location-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'animation-delay': Math.random() - 0.9 + 's',
      })

      matrix.setPixel(x, y, 1, `rgb(var(--foreground))`)
    }

    matrix.update((mtx: any) => {
      mtx.clear()
      mtx.display('*')

      data.forEach(item => {
        const opacity = mapToRange(item.count, min.count, max.count, 0.3, 0.9)
        const radius = mapToRange(item.count, min.count, max.count, minLocationRadius, maxLocationRadius)
        plotCity(radius, opacity, item.name, item.country || '')
      })
    })
  }, [])
  
  return (
    <div id="map-matrix"></div>
  )
}
