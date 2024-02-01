'use client'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import Matrix from '@/app/components/matrix/matrix'
import textAddon from '@/app/components/matrix/addons/text'
import pingAddon from '@/app/components/matrix/addons/ping'
import { getPixelCoordinateByName, getScaledCoordinate } from '@/app/lib/map-utils'
import { convertColor, getTheme, mapToRange } from '@/app/lib/utils'

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

export default function MapMatrix ({ id, className }: { id: string, className?: string }) {
  const matrixRef = useRef(null) 
  const [prevTheme, setPrevTheme] = useState('dark')

  useEffect(() => {
    const foreground = convertColor('--foreground')
    const textSecondary = convertColor('--text-secondary')
    const background = convertColor('--background-secondary')
    const backgroundSecondary = convertColor('--background-secondary')

    const pingRadius = window.innerWidth < 640 ? 5 : 15

    const config = {
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
        },
        hideOffPixels: true,
      },
      backgroundColor: backgroundSecondary,
      frameRate: 24,
      // debug: true,
    }

    if (window.innerWidth < 640) {
      config.pixel.width = 2
      config.pixel.height = 2
    }
    
    if (window.innerWidth < 480) {
      config.pixel.width = 1
      config.pixel.height = 1
    }

    const mtx: any = new Matrix(id, config, [
      textAddon,
      pingAddon,
    ])
    
    mtx.init()
    mtx.write('*')

    let minCount: number | null = null
    let maxCount = 0

    locationData.forEach(loc => {
      const coord = getPixelCoordinateByName(loc.name, loc.country)
      const { x, y } = getScaledCoordinate(coord)
      const prevPoint = points.find(point => point.x === x && point.y === y)

      // If multiple coordinates reduce to the same point, then add the people count
      // and only draw one point.
      if (!prevPoint) {
        points.push({ x, y, count: loc.count })
      } else if (prevPoint.count < loc.count) {
        prevPoint.count += loc.count
      }

      if (minCount === null || loc.count < minCount) {
        minCount = loc.count
      }
      if (loc.count > maxCount) {
        maxCount = loc.count
      }
    })

    points.forEach(point => {
      const radius = Math.round(mapToRange(point.count, minCount, maxCount, 5, pingRadius))
      mtx.setPing(point.x, point.y, radius)
    })

    mtx.render((mtx: any) => {
      mtx.grid.render()
      mtx.renderPings(foreground)
    })

    // Reload component on theme change
    function switchTheme () {
      const theme = getTheme()
      if (theme !== prevTheme) {
        setPrevTheme(theme)
      }
    }

    // Listen for theme changes
    const observer = new MutationObserver((switchTheme))
    observer.observe(document.documentElement, { attributes : true, attributeFilter : ['class'] })

    return () => {
      observer.disconnect()
      mtx.destroy()
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