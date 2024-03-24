import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Paginator from '@/app/components/events/Paginator'
import Section from '@/app/components/Section'
import EventGallery from '@/app/components/events/EventGallery'
import { fetchEventCount } from '../lib/data'
import { pageToRange } from '@/app/lib/utils.server'
import { Suspense } from 'react'
import EventGallerySkeleton from '@/app/components/events/EventGallerySkeleton'

export const metadata = {
  title: 'Events | DS Cubed',
  description: 'Browse our latest events, workshop sessions, and updates.',
  openGraph: {
    title: 'Events | DS Cubed',
    description: 'Browse our latest events, workshop sessions, and updates.',
    url: '/events',
    siteName: 'DS Cubed',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Events | DS Cubed",
    description: 'Browse our latest events, workshop sessions, and updates.',
  },
}

export default async function EventsPage({ searchParams }: { searchParams: { page: number } }) {
  const limit = 16
  const count = await fetchEventCount()
  const pageCount = Math.ceil(count! / limit)
  const page = Math.min(Math.max(Number(searchParams.page || 1), 1), pageCount)
  const range = pageToRange(page, limit) as [number, number]

  return (
    <>
      <Navbar />

 
    </>
  )
}