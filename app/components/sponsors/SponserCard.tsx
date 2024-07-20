import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export default function SponsorCard ({
  className,
  name,
  category,
  color,
  image,
  link,
  filter = '',
}: {
  className?: string,
  name: string,
  category: string,
  color: string,
  image: string,
  link: string,
  filter: string
}) {
  return (
    <div className={clsx('relative max-w-[633px] w-full aspect-video min-h-80 rounded-2xl overflow-hidden', className)} style={{backgroundColor: color}}>
      <div className="absolute w-full grid grid-cols-[1fr,auto] gap-2 p-4">
        <div className="flex flex-col gap-1 my-auto">
          <h4 className="text-xl leading-tight text-text-primary">{name}</h4>
          <p className="text-black/60 dark:text-white/60 leading-none text-lg">{category}</p>
        </div>
        <Link
          href={link} 
          target="_blank"
          className="flex h-max bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-black/60 dark:text-white/60 transition gap-2 px-4 py-3.5 rounded-lg cursor-pointer"
        >
          <span className="my-auto w-max">More</span>
          <ArrowRightIcon className="my-auto w-5 h-5"/>
        </Link>
      </div>
      <Image
        className={clsx("absolute w-80 sm:w-60 h-max max-h-16 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] saturate-0 object-contain dark:invert pointer-events-none", filter)}
        src={image}
        width={200}
        height={200}
        alt={`${name} logo`}
      />
    </div>
  )
}