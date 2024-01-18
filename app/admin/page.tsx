import { getUser } from "@/app/lib/auth.server";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { fetchEventCount } from "../lib/data";
import SignOutButton from "../components/admin/SignOutButton";
import { pageToRange } from "../lib/utils.server";
import Paginator from "../components/events/Paginator";
import { notFound, redirect } from "next/navigation";
import Section from "../components/Section";
import { Suspense } from "react";
import EventGallerySkeleton from "../components/events/EventGallerySkeleton";
import EventGalleryAdmin from "../components/admin/EventGalleryAdmin";
import { headers } from "next/headers";

export default async function AdminPage({ searchParams }: { searchParams: { page: number } }) {
  const user = await getUser()
  const page = Number(searchParams.page || 1)
  const limit = 16
  const count = await fetchEventCount()
  const pageCount = Math.ceil(count! / limit)
  const range = pageToRange(page, limit) as [number, number]

  if (page <= 0 || page > pageCount) {
    return notFound()
  }

  return (
    <>
      <Navbar />

      <main>
        <Section>
          <div>
            <h3 className="text-4xl mb-5 leading-tight">Admin dashboard</h3>
            <p className="text-xl text-text-secondary mb-5 leading-snug">
              Logged in as 
              <span className="text-text-secondary"> {user?.email}</span>
            </p>
            <SignOutButton />
          </div>
        </Section>

        <Section>
          <div className="flex justify-between gap-8">
            <h4 className="text-2xl my-auto">Manage events</h4>
            <Link href="/admin/create" className="py-3 px-6 rounded-full bg-foreground text-lg text-background w-max my-auto">Create new</Link>
          </div>
          <Suspense fallback={<EventGallerySkeleton />} key={page}>
            <EventGalleryAdmin range={range} />
          </Suspense>
          <Paginator page={page} limit={limit} count={count!} />
        </Section>
      </main>

      <Footer />
    </>
  )
}