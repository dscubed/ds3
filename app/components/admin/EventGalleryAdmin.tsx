import { fetchEvents } from '@/app/lib/data'
import EventCard from '@/app/components/events/EventCard'
import Link from 'next/link'
import { PencilSquareIcon } from '@heroicons/react/24/solid'

export default async function EventGalleryAdmin ({ range = [0, 3] }: { range: [number, number] }) {
  const events = await fetchEvents(range)

  return (
    <div className="grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 sm:mx-auto gap-4">
      {events.map((item, index) => (
        <div className="flex flex-col gap-2 h-full" key={index}>
          <EventCard 
            title={item.title}
            description={item.description}
            thumbnail={item.thumbnail}
            date={item.date}
            link={item.link}
          />
          
          <div className="flex gap-2 justify-between text-text-secondary">
            <Link
              href={`/admin/edit/${item.id}`}
              className="flex flex-1 justify-center gap-1.5 border border-border bg-background p-2 rounded-2xl"
            >
              <PencilSquareIcon className="my-auto w-5 h-5" />
              <span className="my-auto">Edit</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}