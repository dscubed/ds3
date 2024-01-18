import Image from 'next/image'
import Section from '@/app/components/Section'
import image from '@/public/home/chess.webp'

export default function IntroSection () {
  return (
    <Section>
      <div className="grid grid-cols-[1fr,1fr] lg:grid-cols-1 gap-20 sm:gap-10">
        <div className="flex flex-col gap-10 my-auto max-w-xl lg:max-w-xl">
          <h1 className="text-6xl xl:text-5xl sm:text-4xl">
            <span className="block leading-tight xl:leading-snug">The leading </span>
            <span className="block leading-tight xl:leading-snug">data science club at </span>
            <span className="block leading-tight xl:leading-snug">The University of </span>
            <span className="block leading-tight xl:leading-snug">Melbourne.</span>
          </h1>
          <p className="text-text-secondary text-xl sm:text-lg leading-relaxed">We are dedicated to connect all data enthusiasts, to support and engage students who have a passion for Data Science at The University of Melbourne</p>
          <button className="w-max bg-foreground text-background px-8 py-4 font-medium rounded-full">Become a Member</button>
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