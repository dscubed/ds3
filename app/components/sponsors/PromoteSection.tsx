import Image from 'next/image'
import Section from '@/app/components/Section'
import image from '@/public/sponsors/robot-human.jpg'
import Link from 'next/link'

export default function PromoteSection () {
  return (
    <Section>
      <div className="grid grid-cols-[1fr,1fr] lg:grid-cols-1 gap-20 sm:gap-10">
        <div className="flex flex-col gap-10 my-auto max-w-xl lg:max-w-xl">
          <h2 className="text-6xl xl:text-5xl sm:text-4xl">
            <span className="block leading-tight xl:leading-snug">Become a</span>
            <span className="block leading-tight xl:leading-snug">Sponsor Today</span>
          </h2>
          <p className="text-text-secondary text-xl sm:text-lg leading-relaxed">Your invaluable support grants you exclusive access to the finest data science graduates, paving the way for your top-tier recruitment and innovation in the data-driven landscape.</p>
          <Link
            target="_blank"
            href="mailto:hello@dscubed.org.au"
            className="w-max bg-foreground text-background px-8 py-4 font-medium rounded-full"
          >
            Let&apos;s get in touch!
          </Link>
        </div>
        <Image
          className="w-full aspect-square object-cover rounded-2xl"
          src={image}
          alt="DALL-E generated image of money and currency"
        ></Image>
      </div>
    </Section>
  )
}