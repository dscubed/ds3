import Image from 'next/image'
import Section from '@/app/components/Section'
import briefcaseImage from '@/public/home/briefcase.png'
import tabletopImage from '@/public/home/tabletop.png'
import peopleImage from '@/public/home/people.png'

export default function WhatWeDoSection() {
  return (
    <Section>
      <h2 className="text-5xl sm:text-4xl">What We Do</h2>

      <div className="grid grid-cols-3 lg:grid-cols-1 gap-10 lg:gap-20 sm:gap-10">
        <div className="grid gap-4 h-max">
          <h3 className="text-xl">Industry Opportunities</h3>
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={briefcaseImage}
            alt=""
          ></Image>
          <p className="text-lg leading-relaxed">As the go-to hub for industry opportunities in data science, we offer comprehensive support for your career journey. Our program includes hosting recruitment talks with industry leaders throughout the academic year and sharing exclusive data science job opportunities in our newsletters.</p>
        </div>

        <div className="grid gap-4 h-max">
          <h3 className="text-xl">Technical Workshops</h3>
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={tabletopImage}
            alt=""
          ></Image>
          <p className="text-lg leading-relaxed">We explore data science topics and organise technical workshops for our fellow members. From creating data visualisation dashboards to building E2E Machine Learning pipelines, we got you covered for any essential skills that you may require during your AI/ML career.</p>
        </div>

        <div className="grid gap-4 h-max">
          <h3 className="text-xl">Student Networking</h3>
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={peopleImage}
            alt=""
          ></Image>
          <p className="text-lg leading-relaxed">We organize student community events and here’s your chance to meet and network with other like-minded students. Apart from the get-along events, we also host revision workshop for common data science subjects with past tutors.</p>
        </div>
      </div>  
    </Section>
  )
}