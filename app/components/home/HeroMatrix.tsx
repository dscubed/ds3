'use client'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import Matrix from '@/app/components/matrix/matrix'
import textAddon from '@/app/components/matrix/addons/text'
import trailAddon from '@/app/components/matrix/addons/trail'
import transitionAddon from '@/app/components/matrix/addons/transition'
import waveAddon from '@/app/components/matrix/addons/wave'
import { convertColor, getTheme } from '@/app/lib/utils'

export default function HeroMatrix ({ id, className }: { id: string, className?: string }) {
  const matrixRef = useRef(null) 
  const [prevTheme, setPrevTheme] = useState('dark')

  useEffect(() => {
    const foreground = convertColor('--foreground')
    const background = convertColor('--background')
    const backgroundSecondary = convertColor('--background-secondary')

    const config: any = {
      pixel: {
        colors: {
          off: background,
          on: foreground
        }
      },
      grid: {
        size: {
          x: 64,
          y: 36
        },
        drawShape: 'circle',
      },
      backgroundColor: backgroundSecondary,
      frameRate: 60,
      // debug: true,
    }

    if (window.innerWidth < 640) {
      config.pixel.width = 15
      config.pixel.height = 15
      config.grid.size.x = 36
      config.grid.size.y = 36
    }

    const mtx = new Matrix(id, config, [
      textAddon,
      trailAddon,
      transitionAddon,
      waveAddon,
    ])

    mtx.init()

    mtx.render((mtx: any) => {
      mtx.grid.reset()
      mtx.renderWave()
      mtx.write('d3s', 'invert')
      mtx.renderTrails()
      mtx.renderTransition(backgroundSecondary)
      mtx.grid.render()
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
      style={{touchAction: 'none'}}
    ></canvas>
  )
}