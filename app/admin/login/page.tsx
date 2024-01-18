'use client'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";
import Section from "@/app/components/Section";
import GoogleAuthButton from "@/app/components/admin/login/GoogleAuthButton";

export default function LoginPage() {
  const next = useSearchParams().get('next') || '/admin'

  return (
    <>
      <Navbar />

      <main>
        <Section>
          <div>
            <h3 className="text-4xl text-center mx-auto mb-5 leading-tight">Admin login page</h3>
            <p className="text-xl text-text-secondary text-center mx-auto leading-snug">Please login with your @dscubed.org.au email account.</p>
          </div>

          <GoogleAuthButton next={next} className="mx-auto" />
        </Section>
      </main>

      <Footer />
    </>
  )
}