import Image from 'next/image'
import Section from '@/app/components/Section'
import membersImage from '@/public/home/pineapple.jpg'
import degreesImage from '@/public/home/degree.jpg'
import eventsImage from '@/public/home/abstract.jpg'
import workshopsImage from '@/public/home/robot.jpg'

export default function ReasonsSection () {
  return (
    <Section>
      <div className="grid grid-cols-[1fr,1fr] lg:grid-cols-1 lg:gap-20 sm:gap-10">
        <div className="">
          <div className="sticky max-w-sm sm:max-w-none top-[calc(102.55px+20px)]">
            <h2 className="mb-10 text-5xl sm:text-4xl !leading-tight">Four reasons to join the club.</h2>
            <p className="text-text-secondary text-xl leading-relaxed">Embrace the unknown, for within it lies the canvas of endless possibilities waiting to be painted with the strokes of your curiosity and courage.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-20 sm:gap-10 max-w-xl lg:max-w-none">
          <div className="flex flex-col gap-4 rounded-md">
            <Image
              className="w-full aspect-video object-cover rounded-2xl"
              src={membersImage}
              alt=""
            />
            <h3 className="text-4xl">203</h3>
            <h3 className="text-xl">Active Members</h3>
            <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">As a prominent club at the University of Melbourne, with 203 members, we cater to diverse interests with events tailored for data hungry people like you.</p>
          </div>
          <div className="flex flex-col gap-4 rounded-md">
            <Image
              className="w-full aspect-video object-cover rounded-2xl"
              src={degreesImage}
              alt=""
            />
            <h3 className="text-4xl">006</h3>
            <h3 className="text-xl">Degrees</h3>
            <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Our vibrant community comprises members from 6 diverse majors—connect with individuals across various academic realms and broaden your horizons.</p>
          </div>
          <div className="flex flex-col gap-4 rounded-md">
            <Image
              className="w-full aspect-video object-cover rounded-2xl"
              src={eventsImage}
              alt=""
            />
            <h3 className="text-4xl">048</h3>
            <h3 className="text-xl">Planned Events</h3>
            <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Embark on an exciting journey with our lineup of 48 planned events this year, ranging from competitions to careers night—join us to learn, connect, and forge new friendships.</p>
          </div>
          <div className="flex flex-col gap-4 rounded-md">
            <Image
              className="w-full aspect-video object-cover rounded-2xl"
              src={workshopsImage}
              alt=""
            />
            <h3 className="text-4xl">010</h3>
            <h3 className="text-xl">Workshop Session</h3>
            <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Data science can be tough, but we are here to help. Join our 10 student-lead workshops this year covering R, statistics, probability, and more.</p>
          </div>
        </div>
      </div>
    </Section>
  )
}