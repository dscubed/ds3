import { fetchEvents } from "@/app/lib/data"
import EventCard from "./EventCard"

export default async function EventGallery ({ range = [0, 3] }: { range: [number, number] }) {
  const events = await fetchEvents(range)

  return (
    <div className="grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 sm:mx-auto gap-4">
      {events.map((item, index) => (
        <EventCard
          title={item.title}
          description={item.description}
          thumbnail={item.thumbnail}
          date={item.date}
          link={item.link}
          key={index}
        />
      ))}
    </div>
  )
}