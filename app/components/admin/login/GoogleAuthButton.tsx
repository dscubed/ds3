'use client'
import { Google } from "react-bootstrap-icons";
import { signIn } from "@/app/lib/auth.client";
import clsx from "clsx";

export default function GoogleAuthButton ({ className = '' }: { className?: string }) {
  return (
    <button onClick={signIn} className={clsx("flex w-max gap-4 px-4 py-3 text-xl bg-background border border-border rounded-full", className)} >
      <Google className="w-6 h-6 my-auto" />
      <span className="my-auto">Login with Google</span>
    </button>
  )
}