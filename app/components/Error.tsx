'use client'
import { useRouter } from "next/navigation"

export default function Error ({ code, message = '' }: { code: number, message?: string }) {
  const router = useRouter()
  
  return (
    <div className="fixed flex w-screen h-dvh bg-background-secondary p-4">
      <div className="flex flex-col gap-4 max-w-sm m-auto">
        <h1 className="text-4xl text-center leading-snug">{code}</h1>
        <h2 className="text-lg text-text-secondary text-center leading-relaxed">{message}</h2>
        <button className="w-max bg-foreground text-background-secondary rounded-full py-2 px-4 mx-auto mt-2" onClick={() => router.back()}>Go back</button>
      </div>
    </div>
  )
}