import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { fetchThumbnail } from "../../lib/data";
import { formatDate } from "@/app/lib/utils.server";

export default async function EventCard ({
  title,
  description,
  thumbnail,
  date,
  link = '#',
}: {
  title: string,
  description: string,
  thumbnail: string,
  date: string,
  link: string
}) {
  const image = await fetchThumbnail(thumbnail)

  return (
    <div className="flex flex-col w-[350px] max-w-full h-full rounded-2xl bg-background">
      <Image
        className="w-full aspect-square object-cover rounded-2xl"
        src={image.publicUrl}
        width={300}
        height={300}
        alt={`${title} cover image`}
      ></Image>
      <div className="flex flex-col gap-2 p-4 h-full">
        <h4 className="text-lg truncate">{title}</h4>
        <p className="text-text-secondary">{formatDate(date)}</p>
        <p className="text-text-secondary line-clamp-4">{description}</p>
        <Link 
          className="flex gap-2 text-text-secondary hover:text-text-primary transition mt-auto"
          href={link}
          target="_blank"
        >
          <span className="my-auto">View Event</span>
          <ArrowRightIcon className="w-4 h-4 my-auto" />
        </Link>
      </div>
    </div>
  )
}