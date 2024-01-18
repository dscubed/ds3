import Image from "next/image";
import Section from "../Section";
import suitcaseImage from '@/public/home/suitcase.png'
import tabletopImage from '@/public/home/tabletop.png'
import peopleImage from '@/public/home/people.png'

export default function WhatWeDoSection() {
  return (
    <Section>
      <h3 className="text-5xl sm:text-4xl">What We Do</h3>

      <div className="grid grid-cols-3 lg:grid-cols-1 gap-10 lg:gap-20 sm:gap-10">
        <div className="grid gap-4 h-max">
          <h4 className="text-xl">Data Science Career Help</h4>
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={suitcaseImage}
            alt="Data science career help cover image"
          ></Image>
          <p className="text-text-secondary text-lg leading-relaxed">We&apos;re the one-stop hub to provide data science career help. We are hosting recruitment talk throughout the academic calendars and data science related jobs through our newsletters.</p>
        </div>

        <div className="grid gap-4 h-max">
          <h4 className="text-xl">Technical Workshops</h4>
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={tabletopImage}
            alt="Data science career help cover image"
          ></Image>
          <p className="text-text-secondary text-lg leading-relaxed">We explore data science topics and organise technical workshops for our fellow members. From creating data visualisation dashboards to building E2E Machine Learning pipelines, we got you covered for any essential skills that you may require during your AI/ML career.</p>
        </div>

        <div className="grid gap-4 h-max">
          <h4 className="text-xl">Student Networking</h4>
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={peopleImage}
            alt="Data science career help cover image"
          ></Image>
          <p className="text-text-secondary text-lg leading-relaxed">We organize student community events and here’s your chance to meet and network with other like-minded students. Apart from the get-along events, we also host revision workshop for common data science subjects with past tutors.</p>
        </div>
      </div>  
    </Section>
  )
}