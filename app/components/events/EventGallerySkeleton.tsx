import EventCardSkeleton from '@/app/components/events/EventCardSkeleton'

export default function EventGallerySkeleton () {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 sm:mx-auto gap-4">
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  )
}