'use client'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'

export default function Banner ({
  text,
  link,
}: {
  text: string,
  link: string,
}) {
  const [show, toggleShow] = useState(true)

  if (!show) {
    return
  }

  return (
    <div className="sticky top-0 py-3 px-4 bg-theme text-white">
      <div className='grid grid-cols-[auto,1fr,auto] gap-10 w-full'>
        <div></div>
        <Link
          href={link}
          target="_blank"
          className="flex gap-2 w-max mx-auto"
        >
          <span className="my-auto w-max">{text}</span>
          <ArrowRightIcon className="my-auto w-5 h-5"/>
        </Link>

        <XMarkIcon className="my-auto w-5 h-5 cursor-pointer" onClick={e => toggleShow(false)}/>
      </div>
    </div>
  )
}