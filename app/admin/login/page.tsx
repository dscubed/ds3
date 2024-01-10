'use client'
import { useEffect } from "react";
import { getUser, signIn } from "@/app/lib/auth.client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function LoginPage() {
  useEffect(() => {
    getUser()
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
          <div className="flex gap-4">
            <button onClick={signIn}>Login with Google</button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}