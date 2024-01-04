'use client'
import Navbar from "@/app/components/Navbar"
import { watchTimeout, watchInterval } from '@/app/lib/performance'
import IntroMatrix from "./components/IntroMatrix"

watchInterval()
watchTimeout()

export default function Index() {
  return (
    <>
      <IntroMatrix />

      {/* Add shadow to hide matrix edges */}
      <div
        className="absolute block w-screen h-screen top-0 left-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px 100px var(--background-secondary)'
        }}
      ></div>

      <Navbar></Navbar>
      
      <div className="h-screen"></div>
      {/* <main className="p-4"></main> */}
    </>
  )
}
