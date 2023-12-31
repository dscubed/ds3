import clsx from "clsx"
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
        'sticky top-0 w-full px-4 py-2 border-b border-border bg-background',
        className
      )}
    >
      <div className="max-w-screen-xl flex justify-between gap-3 mx-auto">
        <div className="flex flex-1">
          <h3 className="font-medium my-auto">DSCubed</h3>
        </div>
        <div className="flex gap-4">
          <Link href="#">Committee</Link>
          <Link href="#">Sponsors</Link>
          <Link href="#">Events</Link>
          <Link href="#">Projects</Link>
          <Link href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/dscubed/" target="_blank">Membership</Link>
        </div>
      </div>
    </nav>
  )
}