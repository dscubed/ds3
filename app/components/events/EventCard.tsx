import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { fetchThumbnail } from "../../lib/data";

export default async function EventCard ({
  title,
  description,
  thumbnail,
  link = '#',
}: {
  title: string,
  description: string,
  thumbnail: string,
  link: string
}) {
  const image = await fetchThumbnail(thumbnail)

  return (
    <div className="flex flex-col max-w-[350px] rounded-md bg-background">
      <Image
        className="w-full max-h-[150px] object-cover rounded-md"
        src={image.publicUrl}
        width={300}
        height={300}
        alt={`${title} cover image`}
      ></Image>
      <div className="flex flex-col gap-4 p-4">
        <h4 className="text-lg">{title}</h4>
        <p className="text-lg text-text-secondary">{description}</p>
        <Link 
          className="flex gap-2 text-text-secondary hover:text-text-primary transition my-auto"
          href={link}
        >
          <span className="my-auto">View Event</span>
          <ArrowRightIcon className="w-5 h-5 my-auto" />
        </Link>
      </div>
    </div>
  )
}