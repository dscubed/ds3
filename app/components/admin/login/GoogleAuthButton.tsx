'use client'
import { Google } from "react-bootstrap-icons";
import { signIn } from "@/app/lib/auth.client";

export default function GoogleAuthButton () {
  return (
    <button 
      onClick={signIn}
      className="flex gap-4 px-6 py-4 text-xl bg-background border border-border rounded-full"
    >
      <Google className="w-6 h-6 my-auto" />
      <span className="my-auto">Login with Google</span>
    </button>
  )
}