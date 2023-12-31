'use client'
import Navbar from "@/app/components/Navbar"
import Matrix from "./components/matrix"
import { useEffect } from "react"

export default function Index() {
  useEffect(() => {
    new Matrix('#matrix', mtx => {
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
