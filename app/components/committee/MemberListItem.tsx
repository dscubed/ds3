import clsx from "clsx";
import Image from "next/image";

// Use the 'filter' prop to set Tailwind css filters on the image

export default function MemberListItem ({ teamName,
  name,
  image,
  role,
  filter
}: {
  name: string,
  image: string,
  role: string,
  filter: string
}) {
  return (
    <div className="flex gap-4 bg-background rounded-md p-3">
      <Image
        className={clsx(
          "object-cover w-16 h-16 rounded-full",
          filter
        )}
        src={image}
        width={50}
        height={50}
        alt={`${name}'s profile picture`}
      ></Image>
      <div className="flex flex-col gap-1 my-auto">
      <h6 className="leading-tight text-lg">{name}</h6>
      <p className="text-text-secondary leading-tight text-lg">{role}</p>
      </div>
    </div>
  )
}