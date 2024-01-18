import clsx from 'clsx'
import Image from 'next/image'
import GenericAvatar from '@/app/components/committee/GenericAvatar'

// Use the 'filter' prop to set Tailwind css filters on the image

export default function MemberListItem ({
  name,
  image,
  role,
  filter = ''
}: {
  name: string,
  image?: string,
  role: string,
  filter?: string
}) {
  return (
    <div className="flex gap-4 bg-background rounded-xl p-3">
      {image 
        ? (<Image
            className={clsx("object-cover w-16 h-16 rounded-full", filter)}
            src={image}
            width={50}
            height={50}
            alt={`${name}'s profile picture`}
          ></Image>) 
        : <GenericAvatar />}
      <div className="flex flex-col gap-1 my-auto truncate">
      <h6 className="leading-tight text-lg text-ellipsis overflow-hidden">{name}</h6>
      <p className="text-text-secondary leading-tight text-lg text-ellipsis overflow-hidden">{role}</p>
      </div>
    </div>
  )
}