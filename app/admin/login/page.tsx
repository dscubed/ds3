'use client'
import { getUser } from "@/app/lib/auth.client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GoogleAuthButton from "@/app/components/admin/login/GoogleAuthButton";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import Section from "@/app/components/Section";

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

      <main>
        <Section>
          <div>
            <h3 className="text-4xl text-center mx-auto mb-5 leading-tight">Admin login page</h3>
            <p className="text-xl text-text-secondary text-center mx-auto leading-snug">Please login with your @dscubed.org.au email account.</p>
          </div>
          <GoogleAuthButton className="mx-auto" />
        </Section>
      </main>

      <Footer />
    </>
  )
}