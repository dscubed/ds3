import Image from 'next/image'
import Section from '@/app/components/Section'
import membersImage from '@/public/home/fruits.jpg'
import degreesImage from '@/public/home/degree.jpg'
import eventsImage from '@/public/home/time.jpg'
import workshopsImage from '@/public/home/books.jpg'

export default function AboutSection () {
  return (
    <Section>
      {/* <h2 className="text-5xl sm:text-4xl"></h2> */}

      <div className="max-w-screen-xl grid grid-cols-2 lg:grid-cols-1 gap-20 sm:gap-10 mx-auto">
        <div className="grid gap-5 h-max">
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={membersImage}
            alt=""
          ></Image>
          <h3 className="text-4xl">400+</h3>
          <h3 className="text-xl">Active Members</h3>
          <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">As a prominent club at The University of Melbourne, with more than 400 members, we cater to diverse interests with events tailored for data hungry people like you.</p>
        </div>

        <div className="grid gap-5 h-max">
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={degreesImage}
            alt=""
          ></Image>
          <h3 className="text-4xl">007</h3>
          <h3 className="text-xl">Degrees</h3>
          <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Our vibrant community comprises members from seven diverse majors—connect with individuals across various academic realms and broaden your horizons.</p>
        </div>

        <div className="grid gap-5 h-max">
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={eventsImage}
            alt=""
          ></Image>
          <h3 className="text-4xl">048</h3>
          <h3 className="text-xl">Planned Events</h3>
          <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Embark on an exciting journey with our lineup of 48 planned events, ranging from competitions to careers night—join us to learn, connect, and forge new friendships.</p>
        </div>

        <div className="grid gap-5 h-max">
          <Image
            className="rounded-2xl object-cover w-full aspect-video"
            src={workshopsImage}
            alt=""
          ></Image>
          <h3 className="text-4xl">010</h3>
          <h3 className="text-xl">Workshop Session</h3>
          <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Data science can be tough, but we are here to help. Join our ten student-lead workshops this year covering R, statistics, probability, and more.</p>
        </div>
      </div>  
    </Section>
  )
}