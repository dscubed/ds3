'use server'
import { fetchEvents } from "@/app/lib/data"
import EventCard from "./EventCard"

export default async function EventGallery ({ range = [0, 3] }) {
  const events = await fetchEvents(range)

  return (
    <div className="grid grid-cols-4 gap-4">
      {events.map(item => (
        <EventCard
          title={item.title}
          description={item.description}
          thumbnail={item.thumbnail}
          date={item.date}
          link={item.link}
          key={item.id}
        />
      ))}
    </div>
  )
}