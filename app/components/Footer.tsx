import Link from 'next/link'
import * as Icon from 'react-bootstrap-icons'

export default function Footer () {
  return (
    <footer className="relative z-20 px-5 py-8 bg-background-secondary">
      <div className="flex flex-col gap-10 max-w-screen-xl mx-auto">
        <div className="flex md:flex-col gap-4 md:gap-5 justify-between text-text-secondary">
          <p className="md:text-center">© {(new Date).getFullYear()} DSCubed · Data Science Student Society</p>
          <div className="flex gap-8 md:mx-auto">
            <Link href="mailto:hello@dscubed.org.au" target="_blank">
              <Icon.EnvelopeFill className="w-5 h-5"/>
            </Link>
            <Link href="https://instagram.com/dscubed.unimelb" target="_blank">
              <Icon.Instagram className="w-5 h-5"/>
            </Link>
            <Link href="https://www.facebook.com/dscubed.unimelb/" target="_blank">
              <Icon.Facebook className="w-5 h-5"/>
            </Link>
            <Link href="https://discord.gg/hFX4PJZ5MQ" target="_blank">
              <Icon.Discord className="w-5 h-5"/>
            </Link>
            <Link href="https://medium.com/dscubed-unimelb" target="_blank">
              <Icon.Medium className="w-5 h-5"/>
            </Link>
            <Link href="https://www.linkedin.com/company/dscubed/" target="_blank">
              <Icon.Linkedin className="w-5 h-5"/>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
