import { PencilSquareIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import EventCard from "../events/EventCard"

export default function EventCardAdmin ({ ...data }) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <EventCard 
        title={data.title}
        description={data.description}
        thumbnail={data.thumbnail}
        date={data.date}
        link={data.link}
      />
      
      <div className="flex gap-2 justify-between text-text-secondary">
        <Link
          href={`/admin/edit/${data.id}`}
          className="flex flex-1 justify-center gap-1.5 border border-border bg-background p-2 rounded-2xl"
        >
          <PencilSquareIcon className="my-auto w-5 h-5" />
          <span className="my-auto">Edit</span>
        </Link>
      </div>
    </div>
  )
}