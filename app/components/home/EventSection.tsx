import Link from 'next/link'
import Section from '@/app/components/Section'
import EventGallery from '@/app/components/events/EventGallery'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Suspense } from 'react'
import EventGallerySkeleton from '../events/EventGallerySkeleton'

export default function EventSection () {
  return (
    <Section>
      <h2 className="text-4xl text-center mx-auto mb-5 leading-tight">Recent updates</h2>

      <Suspense fallback={<EventGallerySkeleton />}>
        <EventGallery range={[0, 3]} />
      </Suspense>
      
      <Link className="flex gap-2 text-xl text-theme mx-auto" href="/events">
        <span className="my-auto">Browse All Events</span>
        <ArrowRightIcon className="w-6 h-6 my-auto" />
      </Link>
    </Section>
  )
}