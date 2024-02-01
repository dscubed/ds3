import Image from 'next/image'
import Section from '@/app/components/Section'
import image from '@/public/home/robot-running.jpg'
import Link from 'next/link'

export default function IntroSection () {
  return (
    <Section>
      <div className="grid grid-cols-[1fr,1fr] lg:grid-cols-1 gap-20 sm:gap-10">
        <div className="flex flex-col gap-10 my-auto max-w-xl lg:max-w-xl">
          <h1 className="text-5xl sm:text-4xl">
            <span className="block leading-tight xl:leading-snug">The Leading </span>
            <span className="block leading-tight xl:leading-snug">Data Science Club at </span>
            <span className="block leading-tight xl:leading-snug">The University of </span>
            <span className="block leading-tight xl:leading-snug">Melbourne.</span>
          </h1>
          <p className="text-xl sm:text-lg leading-relaxed">We are committed in our mission to connect and empower data enthusiasts, providing an unparalleled platform for students who are passionate about Data Science.</p>
          <Link 
            target="_blank"
            href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/dscubed/"
            className="w-max bg-foreground text-background px-8 py-4 font-medium rounded-full"
          >
            Become a Member
          </Link>
        </div>
        <Image
          className="w-full aspect-square object-cover rounded-2xl"
          src={image}
          alt=""
        ></Image>
      </div>
    </Section>
  )
}