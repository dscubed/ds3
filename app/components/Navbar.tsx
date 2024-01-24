'use client'
import clsx from 'clsx'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Banner from '@/app/components/Banner'
import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Logo from '@/app/components/Logo'

const ThemeToggle = dynamic(
  () => import('./ThemeToggle'),
  { ssr: false }
)

export default function Navbar ({ className = '', ...rest }: { className?: string }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    // Use top: -1px to remove gap on some browsers
    <div className="sticky top-[-1px] z-20" id="navbar">
      {/* <Banner text="We Are Recruiting For 2024" link="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/dscubed/" /> */}

      <nav {...rest} className={clsx('relative w-full bg-background-secondary border-b border-border pt-px', className)}>
        <div className="px-5 py-3">
          <div className="relative max-w-screen-xl flex justify-between gap-3 mx-auto">
            {/* Logo */}
            <div className="flex">
              <Link href="/">
                <Logo className="w-28 h-12" />
              </Link>
            </div>

            {/* Desktop links */}
            <div className="flex gap-6 md:hidden">
              <ThemeToggle showText={false} />
              <div className="block h-1/2 w-0 border-l border-border my-auto"></div>
              <Link className="my-auto" href="/events">Events</Link>
              <Link className="my-auto" href="/committee">Committee</Link>
              <Link className="my-auto" href="/sponsers">Sponsors</Link>
              <Link className="my-auto px-4 py-2 bg-foreground text-background rounded-full" href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/dscubed/" target="_blank">Membership</Link>
            </div>

            {/* Mobile menu toggle */}
            <button className="hidden md:block" onClick={() => setShowMenu(showMenu ? false : true)}>
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>


        {/* Mobile links */}
        <div className={clsx("absolute hidden flex-col w-full bg-background-secondary top-full border-t border-border", {
          'md:flex': showMenu,
        })}>
          <Link className="p-4 border-b border-border" href="/events">Events</Link>
          <Link className="p-4 border-b border-border" href="/committee">Committee</Link>
          <Link className="p-4 border-b border-border" href="/sponsers">Sponsors</Link>
          <Link className="p-4 border-b border-border" href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/dscubed/" target="_blank">Membership</Link>
          <ThemeToggle className="p-4 border-b border-border" />
        </div>
      </nav>
    </div>
  )
}