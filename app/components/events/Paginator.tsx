'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageToRange } from '@/app/lib/utils.server'

function PageLink ({ 
  pageNum, 
  children,
  disabled = false,
}: {
  pageNum: number,
  children: React.ReactNode,
  disabled?: boolean,
}) {
  const currentPage = Number(useSearchParams().get('page') || 1)
  const pathname = usePathname()
  const queryParamString = new URLSearchParams({ page: pageNum.toString() }).toString()

  const url = disabled 
    ? '#' 
    : `${pathname}?${queryParamString}`

  return (
    <Link 
      href={url} 
      className={clsx(
        "flex text-lg w-10 h-10 text-text-secondary bg-background-secondary hover:bg-background transition rounded-full",
        {
          'bg-foreground text-background-secondary border-0': pageNum === currentPage,
          'opacity-30 pointer-events-none': disabled,
        }
      )}
    >
      <span className="m-auto">{children}</span>
    </Link>
  )
}

export default function Paginator ({
  page,
  limit,
  count,
}: { 
  page: number,
  limit: number,
  count: number,
}) {
  const pageCount = Math.ceil(count / limit)
  const [rangeStart, rangeEnd] = pageToRange(page, limit)
  const links = []

  for (let i=0; i<pageCount; i++) {
    links.push((
      <PageLink pageNum={i+1} key={i}>{i+1}</PageLink>
    ))
  }

  return (
    <div className="flex justify-between max-w-full w-max mx-auto gap-10">
    {/* <div className="flex sm:flex-col justify-between gap-10"> */}
      {/* <p className="text-text-secondary my-auto sm:text-center">Showing <b>{rangeStart + 1}</b> to <b>{Math.min(rangeEnd + 1, count)}</b> of <b>{count}</b> results</p> */}
      <div className="flex gap-2 my-auto flex-wrap justify-center">
        <PageLink pageNum={page - 1} disabled={page <= 1}>
          <ChevronLeftIcon className="w-5 h-5"/>
        </PageLink>

        {links}

        <PageLink pageNum={page + 1} disabled={page >= pageCount}>
          <ChevronRightIcon className="w-5 h-5"/>
        </PageLink>
      </div>
    </div>
  )
}