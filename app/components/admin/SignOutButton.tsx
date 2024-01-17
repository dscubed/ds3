'use client'
import { signOut } from "@/app/lib/auth.client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation'

export default function SignOutButton () {
  const router = useRouter()

  return (
    <button className="flex gap-2 text-xl text-theme" onClick={() => {
      signOut()
      router.push('/admin/login')
    }}>
      <span className="my-auto">Sign out</span>
      <ArrowRightIcon className="w-6 h-6 my-auto" />
    </button>
  )
}