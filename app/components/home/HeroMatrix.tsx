'use client'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import Matrix from '@/app/components/matrix/matrix'
import textAddon from '@/app/components/matrix/addons/text'
import trailAddon from '@/app/components/matrix/addons/trail'
import transitionAddon from '@/app/components/matrix/addons/transition'
import waveAddon from '@/app/components/matrix/addons/wave'

function convertColor (cssVarName: string) {
  return `rgb(${getComputedStyle(document.body).getPropertyValue(cssVarName)})`
}

function getTheme() {
  const classList = document.documentElement.classList
  const useSystem = classList.contains('system')
  const isDark = classList.contains('dark') || (useSystem && window.matchMedia("(prefers-color-scheme: dark)").matches)
  return isDark ? 'dark' : 'light'
}

export default function HeroMatrix ({ id, className }: { id: string, className?: string }) {
  const matrixRef = useRef(null) 
  const [prevTheme, setPrevTheme] = useState('dark')

  useEffect(() => {
    const foreground = convertColor('--foreground')
    const background = convertColor('--background')
    const backgroundSecondary = convertColor('--background-secondary')

    var mtx: any;

    const config = {
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

    function createMatrix () {
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
        mtx.write('ds3', 'invert')
        mtx.renderTrails()
        mtx.renderTransition(backgroundSecondary)
        mtx.grid.render()
      })
      return mtx
    }

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            const theme = getTheme()
            if (theme !== prevTheme) {
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
      style={{touchAction: 'none'}}
    ></canvas>
  )
}