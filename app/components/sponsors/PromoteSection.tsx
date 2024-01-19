import Image from 'next/image'
import Section from '@/app/components/Section'
import image from '@/public/sponsors/money.png'

export default function PromoteSection () {
  return (
    <Section>
      <div className="grid grid-cols-[1fr,1fr] lg:grid-cols-1 gap-20 sm:gap-10">
        <div className="flex flex-col gap-10 my-auto max-w-xl lg:max-w-xl">
          <h2 className="text-6xl xl:text-5xl sm:text-4xl">
            <span className="block leading-tight xl:leading-snug">Become a</span>
            <span className="block leading-tight xl:leading-snug">sponsor today</span>
          </h2>
          <p className="text-text-secondary text-xl sm:text-lg leading-relaxed">Empower student excellence and fuel future leaders in data science by sponsoring DS Cubed. Your support propels students into the forefront of data-driven innovation.</p>
          <button className="w-max bg-foreground text-background px-8 py-4 font-medium rounded-full">Let&apos;s get in touch!</button>
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