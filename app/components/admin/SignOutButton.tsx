'use client'
import { signOut } from "@/app/lib/auth.client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function SignOutButton () {
  return (
    <button className="flex gap-2 text-xl text-theme" onClick={signOut}>
      <span className="my-auto">Sign Out</span>
      <ArrowRightIcon className="w-6 h-6 my-auto" />
    </button>
  )
}