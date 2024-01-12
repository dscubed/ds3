import clsx from "clsx";
import Image from "next/image";

// Use the 'filter' prop to set Tailwind css filters on the image

export default function MemberCard ({
  name,
  role,
  image,
  filter = ''
}: {
  name: string,
  role: string,
  image: string,
  filter: string
}) {
  return (
    <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
      <Image
        className={clsx(
          "object-cover w-52 h-52 sm:w-40 sm:h-40 rounded-full mx-auto mb-2",
          filter
        )}
        src={image}
        width={300}
        height={300}
        alt={`${name}'s profile picture`}
      ></Image>
      <h6 className="text-center leading-tight text-lg text-ellipsis truncate overflow-hidden">{name}</h6>
      <p className="text-text-secondary text-center leading-tight text-lg text-ellipsis truncate overflow-hidden">{role}</p>
    </div>
  )
}