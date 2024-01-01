'use client'
import Navbar from "@/app/components/Navbar"
import Matrix from "./components/matrix"
import { useEffect } from "react"

class Trail {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.radius = 7
    this.id = setInterval(() => {
      if (this.radius > 0) {
        this.radius--
      }
    }, 100)
  }

  removeInterval () {
    clearInterval(this.id)
  }
}

export default function Index() {
  useEffect(() => {
    const matrix = new Matrix('#matrix')

    matrix.setup(mtx => {
      mtx.trails = []

      window.addEventListener('mousemove', () => {
        mtx.trails.push(new Trail(mtx.mouseX, mtx.mouseY))
      })
    })

    matrix.update(mtx => {
      mtx.clear()
      
      for (let i = mtx.trails.length - 1; i >= 0; i--) {
        const trail = mtx.trails[i]
        if (trail.radius == 0) {
          trail.removeInterval()
          mtx.trails.splice(i, 1)
          continue
        }
        mtx.circle(trail.x, trail.y, trail.radius)
      }

      mtx.display('ds3')
    })
  }, [])
  
  return (
    <>
      {/* <Navbar></Navbar> */}
      <div id="matrix"></div>
      <div
        className="absolute block w-screen h-screen top-0 left-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px 100px var(--background-secondary)'
        }}
      ></div>
      {/* <main className="p-4"></main> */}
    </>
  )
}
