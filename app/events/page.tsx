import { notFound } from 'next/navigation'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Paginator from '@/app/components/events/Paginator'
import Section from '@/app/components/Section'
import EventGallery from '@/app/components/events/EventGallery'
import { fetchEventCount } from '../lib/data'
import { pageToRange } from '@/app/lib/utils.server'
import { Suspense } from 'react'
import EventGallerySkeleton from '@/app/components/events/EventGallerySkeleton'

export default async function SponsersPage({ searchParams }: { searchParams: { page: number } }) {
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
            <h3 className="text-4xl text-center mx-auto mb-5 leading-tight">What&apos;s happening</h3>
            <p className="text-xl text-text-secondary text-center mx-auto !leading-relaxed">Browse our latest events, workshop sessions, and updates.</p>
          </div>
        </Section>

        <Section>
          <Suspense fallback={<EventGallerySkeleton />} key={page}>
            <EventGallery range={range} />
          </Suspense>
          <Paginator page={page} limit={limit} count={count!} />
        </Section>
      </main>

      <Footer />
    </>
  )
}