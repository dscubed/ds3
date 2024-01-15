'use client'
import { getUser } from "@/app/lib/auth.client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GoogleAuthButton from "@/app/components/admin/login/GoogleAuthButton";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const user = await getUser()
      if (user) {
        router.push('/admin')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navbar />

      <main className='p-4'>
        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <h3 className="text-4xl text-center mx-auto leading-tight">Admin Login Page</h3>
          <p className="text-xl text-text-secondary text-center mx-auto leading-tight">Please login with your dscubed.org.au email account.</p>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <div className="flex gap-4 justify-center">
            <GoogleAuthButton />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}