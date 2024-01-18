'use client'
import { signIn } from "@/app/lib/auth.client";
import clsx from "clsx";
import { Google } from "react-bootstrap-icons";

export default function GoogleAuthButton ({ next, className = '' }: { next: string, className?: string }) {
  return (
    <button onClick={e => signIn(next)} className={clsx("flex w-max gap-4 px-4 py-3 text-xl bg-background border border-border rounded-full", className)}>
      <Google className="w-6 h-6 my-auto" />
      <span className="my-auto">Login with Google</span>
    </button>
  )
}