import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

export default function Navbar ({
  children, 
  className,
  ...rest
}: {
  children: React.ReactNode
  className: string
}) {
  return (
    <nav
      {...rest}
      className={clsx(
        'sticky top-0 w-full px-4 py-2 bg-background-secondary',
        className
      )}
    >
      <div className="max-w-screen-xl flex justify-between gap-3 mx-auto">
        {/* saturate-0 brightness-[10] */}
        <div className="flex flex-1">
          {/* <h3 className="font-medium my-auto">DSCubed</h3> */}
          <Image
            className="filter-invert"
            src='/logo.png' 
            width={1363/15} 
            height={552/15} 
            alt="DS Cubed logo"
          ></Image>
        </div>
        <div className="flex gap-6">
          <Link className="my-auto" href="#">Committee</Link>
          <Link className="my-auto" href="#">Sponsors</Link>
          <Link className="my-auto" href="#">Events</Link>
          <Link className="my-auto" href="#">Projects</Link>
          <Link className="my-auto" href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/dscubed/" target="_blank">Membership</Link>
        </div>
      </div>
    </nav>
  )
}