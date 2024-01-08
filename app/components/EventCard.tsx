import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function EventCard ({
  name,
  description,
  image,
  link = '#',
}: {
  name: string,
  description: string,
  image: string,
  link: string
}) {
  return (
    <div className="flex flex-col max-w-[350px] rounded-md bg-background">
      <Image
        className="w-full max-h-[150px] object-cover rounded-md"
        src={image}
        width={300}
        height={300}
        alt={`${name} cover image`}
      ></Image>
      <div className="flex flex-col gap-4 p-4">
        <h4 className="text-lg">{name}</h4>
        <p className="text-lg text-text-secondary">{description}</p>
        {/* <Link 
          className="border border-border bg-btn-background hover:bg-btn-background-hover hover:text-text-primary transition text-text-secondary p-1.5 rounded-md text-center"
          href={link}
        >View Event</Link> */}
        <Link className="flex gap-2 text-lg text-text-secondary hover:text-text-primary transition my-auto" href="mailto:hello@dscubed.org.au">
          <span className="my-auto">Learn More</span>
          <ArrowRightIcon className="w-6 h-6 my-auto" />
        </Link>
      </div>
    </div>
  )
}