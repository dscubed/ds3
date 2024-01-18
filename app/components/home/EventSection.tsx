import Link from "next/link";
import Section from "../Section";
import EventGallery from "../events/EventGallery";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function EventSection () {
  return (
    <Section>
      <h3 className="text-4xl text-center mx-auto mb-5 leading-tight">Recent updates</h3>

      <EventGallery range={[0, 3]} />
      
      <Link className="flex gap-2 text-xl text-theme mx-auto" href="/events">
        <span className="my-auto">Browse All Events</span>
        <ArrowRightIcon className="w-6 h-6 my-auto" />
      </Link>
    </Section>
  )
}