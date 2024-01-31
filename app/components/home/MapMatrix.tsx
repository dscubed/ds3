'use client'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import Matrix from '@/app/components/matrix/matrix'
import textAddon from '@/app/components/matrix/addons/text'
import pingAddon from '@/app/components/matrix/addons/ping'
import { getPixelCoordinateByName, getScaledCoordinate } from '@/app/lib/map-utils'
import { mapToRange } from '@/app/lib/utils'

type LocationData = { name: string, country?: string, count: number }[]

const locationData: LocationData = [
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

const points: { x: number, y: number, count: number }[] = []

function getMinCity (data: LocationData) {
  let min = { count: 0 }
  data.forEach(item => {
    if (item.count < min.count) {
      min = item
    }
  })
  return min.count
}

function getMaxCity (data: LocationData) {
  let max = { count: 0 }
  data.forEach(item => {
    if (item.count > max.count) {
      max = item
    }
  })
  return max.count
}

function convertColor (cssVarName: string) {
  return `rgb(${getComputedStyle(document.body).getPropertyValue(cssVarName)})`
}

function getTheme() {
  const classList = document.documentElement.classList
  const useSystem = classList.contains('system')
  const isDark = classList.contains('dark') || (useSystem && window.matchMedia("(prefers-color-scheme: dark)").matches)
  return isDark ? 'dark' : 'light'
}

export default function MapMatrix ({ id, className }: { id: string, className?: string }) {
  const matrixRef = useRef(null) 
  const [prevTheme, setPrevTheme] = useState('dark')

  useEffect(() => {
    const foreground = convertColor('--foreground')
    const textSecondary = convertColor('--text-secondary')
    const background = convertColor('--background-secondary')
    const backgroundSecondary = convertColor('--background-secondary')

    var mtx: any;

    function createMatrix () {
      const mtx: any = new Matrix(id, {
        pixel: {
          width: 3,
          height: 3,
          colors: {
            off: background,
            on: textSecondary
          }
        },
        grid: {
          enforce: 'both',
          size: {
            x: 102,
            y: 66
          }
        },
        backgroundColor: backgroundSecondary,
        frameRate: 30
      }, [
        textAddon,
        pingAddon,
      ])
      mtx.init()

      const minCount = getMinCity(locationData)
      const maxCount = getMaxCity(locationData)

      // Plot city points
      locationData.forEach(loc => {
        const coord = getPixelCoordinateByName(loc.name, loc.country)
        const { x, y } = getScaledCoordinate(coord)

        const prevPoint = points.find(point => point.x === x && point.y === y)

        if (!prevPoint) {
          points.push({ x, y, count: loc.count })
        } else if (prevPoint.count < loc.count) {
          prevPoint.count = loc.count
        }
      })

      points.forEach(point => {
        const radius = Math.round(mapToRange(point.count, minCount, maxCount, 5, 15))
        mtx.setPing(point.x, point.y, radius)
      })


      mtx.render((mtx: any) => {
        mtx.write('*')
        mtx.grid.render()
        mtx.renderPings(foreground)
      })
      return mtx
    }

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            const theme = getTheme()
            if (theme !== prevTheme) {
              // console.log(123)
              setPrevTheme(theme)
            }
        })
    })

    observer.observe(document.documentElement, { attributes : true, attributeFilter : ['class'] });

    mtx = createMatrix()
    return () => {
      observer.disconnect()
      mtx.destroy()
      mtx = null
    }
  }, [prevTheme])

  return (
    <canvas 
      ref={matrixRef} 
      id={id} 
      className={clsx(className)} 
    ></canvas>
  )
}