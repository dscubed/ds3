import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export default function SponsorCardSmall ({
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
    <div className={clsx('relative max-w-[633px] w-full lg:aspect-none h-32 xs:h-20 rounded-2xl overflow-hidden', className)} style={{backgroundColor: color}}>
      <Image
        className={clsx("absolute w-40 h-max max-h-9 sm:max-h-8 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] saturate-0 object-contain dark:invert pointer-events-none", filter)}
        src={image}
        width={200}
        height={200}
        alt={`${name} logo`}
      />
    </div>
  )
}