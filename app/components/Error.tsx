'use client'
import { useRouter } from "next/navigation"
import React from "react"

export default function Error ({ code, message, children }: { code: number, message?: string, children?: React.ReactNode }) {
  const router = useRouter()
  
  return (
    <div className="fixed flex w-screen h-dvh bg-background-secondary p-4">
      <div className="flex flex-col gap-4 max-w-sm m-auto">
        <h1 className="text-4xl text-center leading-snug">{code}</h1>
        {message && (
          <h2 className="text-lg text-text-secondary text-center leading-relaxed">{message}</h2>
        )}
        <div className="flex gap-2 flex-wrap justify-center mt-2">
          {
          children 
            ? children
            : <button className="w-max bg-foreground text-background-secondary rounded-full py-2 px-4" onClick={() => router.back()}>Go back</button>
          }
        </div>
      </div>
    </div>
  )
}