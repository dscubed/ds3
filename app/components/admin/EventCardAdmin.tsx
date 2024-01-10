import { PencilSquareIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import EventCard from "../events/EventCard"

export default function EventCardAdmin ({ ...props }) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <EventCard {...props} />
      
      <div className="flex gap-2 justify-between rounded-md text-text-secondary">
        <Link
          href={`/admin/edit/${props.id}`}
          className="flex flex-1 justify-center gap-1.5 border border-border bg-background py-1 px-2 rounded-md"
        >
          <PencilSquareIcon className="my-auto w-5 h-5" />
          <span className="my-auto">Edit</span>
        </Link>
      </div>
    </div>
  )
}