import Navbar from "@/app/components/Navbar"
import IntroMatrix from "./components/IntroMatrix"
import Image from "next/image"
import MapMatrix from "./components/MapMatrix"
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from "next/link"
import Footer from "./components/Footer"
import FollowSection from "./components/FollowSection"
import FAQItem from "./components/FAQItem"
import EventGallery from "./components/events/EventGallery"
import Gallery from "./components/Gallery"
import FAQSection from "./components/FAQSection"
import Section from "./components/Section"

export default function Index() {
  return (
    <>
      <div className="w-screen h-screen">
        <IntroMatrix />
      </div>
      <div className="h-dvh pointer-events-none"></div>

      {/* Add shadow to hide matrix edges */}
      {/* <div
        className="absolute block w-screen h-screen top-0 left-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 50px 50px rgb(var(--background-secondary))'
        }}
      ></div> */}

      <Navbar />

      <main className="relative bg-background-secondary">
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
              className="w-full h-full object-cover rounded-2xl"
              src="/dalle-robot-chess.webp"
              width={1024}
              height={1024}
              alt="DALL-E generated image of money and currency"
            ></Image>
          </div>
        </Section>

        <Section>
          <h3 className="text-5xl sm:text-4xl">What We Do</h3>

          <div className="grid grid-cols-3 lg:grid-cols-1 gap-10 lg:gap-20 sm:gap-10">
            <div className="grid gap-4 h-max">
              <h4 className="text-xl">Data Science Career Help</h4>
              <Image
                className="rounded-md object-cover w-full h-[250px] xl:h-[200px] lg:h-[250px] md:h-[200px]"
                src="/dalle-suitcase.png"
                width={1024}
                height={1024}
                alt="Data science career help cover image"
              ></Image>
              <p className="text-text-secondary text-lg leading-relaxed">We're the one-stop hub to provide data science career help. We are hosting recruitment talk throughout the academic calendars and data science related jobs through our newsletters.</p>
            </div>

            <div className="grid gap-4 h-max">
              <h4 className="text-xl">Technical Workshops</h4>
              <Image
                className="rounded-md object-cover w-full h-[250px] xl:h-[200px] lg:h-[250px] md:h-[200px]"
                src="/dalle-tabletop-cropped.png"
                width={1024}
                height={1024}
                alt="Data science career help cover image"
              ></Image>
              <p className="text-text-secondary text-lg leading-relaxed">We explore data science topics and organise technical workshops for our fellow members. From creating data visualisation dashboards to building E2E Machine Learning pipelines, we got you covered for any essential skills that you may require during your AI/ML career.</p>
            </div>

            <div className="grid gap-4 h-max">
              <h4 className="text-xl">Student Networking</h4>
              <Image
                className="rounded-md object-cover w-full h-[250px] xl:h-[200px] lg:h-[250px] md:h-[200px]"
                src="/dalle-people.png"
                width={1024}
                height={1024}
                alt="Data science career help cover image"
              ></Image>
              <p className="text-text-secondary text-lg leading-relaxed">We organize student community events and here’s your chance to meet and network with other like-minded students. Apart from the get-along events, we also host revision workshop for common data science subjects with past tutors.</p>
            </div>
          </div>  
        </Section>

        <Section>
          <h3 className="text-5xl sm:text-4xl">Club Aims</h3>

          <div className="grid grid-cols-3 gap-10 lg:grid-cols-2 sm:grid-cols-1">
            <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
              <h4 className="text-xl text-theme">Connection</h4>
              <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To provide an environment that encourage Data Science students to connect through social events and study groups.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
              <h4 className="text-xl text-theme">Education</h4>
              <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To provide seminars, workshops and discussions on Data Science & AI subjects to broaden and improve students’ skills and knowledge.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
              <h4 className="text-xl text-theme">Events</h4>
              <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To host events that provide opportunities for students to network with Data Science research and industry partners.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
              <h4 className="text-xl text-theme">Advocacy</h4>
              <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To co-ordinate the representation of Data Science students to the Science and Computer Science Faculties, and to the University.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
              <h4 className="text-xl text-theme">Support</h4>
              <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To support students and their studies with Data Science related courses. </p>
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-[1fr,1fr] lg:grid-cols-1 lg:gap-20 sm:gap-10">
            <div className="">
              <div className="sticky max-w-sm sm:max-w-none top-[calc(102.55px+20px)]">
                <h3 className="mb-10 text-5xl sm:text-4xl !leading-tight">Four reasons to join the club.</h3>
                <p className="text-text-secondary text-xl leading-relaxed">Embrace the unknown, for within it lies the canvas of endless possibilities waiting to be painted with the strokes of your curiosity and courage.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-20 sm:gap-10 max-w-xl lg:max-w-none">
              <div className="flex flex-col gap-4 rounded-md">
                <Image
                  className="w-full h-72 object-cover rounded-md"
                  src="/dalle-basketball.webp"
                  width={1024}
                  height={1024}
                  alt=""
                />
                <h4 className="text-4xl">203</h4>
                <h4 className="text-xl">Active Members</h4>
                <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">As a prominent club at the University of Melbourne, with 203 members, we cater to diverse interests with events tailored for data hungry people like you.</p>
              </div>
              <div className="flex flex-col gap-4 rounded-md">
                <Image
                  className="w-full h-72 object-cover rounded-md"
                  src="/dalle-people.png"
                  width={1024}
                  height={1024}
                  alt=""
                />
                <h4 className="text-4xl">006</h4>
                <h4 className="text-xl">Degree / Majors</h4>
                <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Our vibrant community comprises members from 6 diverse majors—connect with individuals across various academic realms and broaden your horizons.</p>
              </div>
              <div className="flex flex-col gap-4 rounded-md">
                <Image
                  className="w-full h-72 object-cover rounded-md"
                  src="/dalle-future-city.png"
                  width={1024}
                  height={1024}
                  alt=""
                />
                <h4 className="text-4xl">048</h4>
                <h4 className="text-xl">Planned Events</h4>
                <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Embark on an exciting journey with our lineup of 48 planned events this year, ranging from competitions to careers night—join us to learn, connect, and forge new friendships.</p>
              </div>
              <div className="flex flex-col gap-4 rounded-md">
                <Image
                  className="w-full h-72 object-cover rounded-md"
                  src="/dalle-monster.webp"
                  width={1024}
                  height={1024}
                  alt=""
                />
                <h4 className="text-4xl">010</h4>
                <h4 className="text-xl">Workshop Session</h4>
                <p className="text-xl lg:text-lg text-text-secondary leading-relaxed">Data science can be tough, but we are here to help. Join our 10 student-lead workshops this year covering R, statistics, probability, and more.</p>
              </div>
            </div>
          </div>
        </Section>

        <div className="p-4 my-40 sm:my-20">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <div className="flex flex-col gap-10">
              <h4 className="text-5xl sm:text-4xl !leading-tight text-center max-w-lg sm:max-w-sm mx-auto mb-10">Meet members from all over the world.</h4>
              <div className="w-full h-[600px]">
                <MapMatrix></MapMatrix>
              </div>
            </div>
          </div>
        </div>

        <FollowSection />
        
        <div className="p-4 my-40 sm:my-20">
          <div className="flex flex-col gap-10 max-w-screen-xl mx-auto">
            <h3 className="text-5xl sm:text-4xl text-center">Activities For Everyone</h3>
            <Gallery />
          </div>
        </div>

        <Section>
          <EventGallery range={[0, 3]} />
          
          <Link className="flex gap-2 text-xl text-theme mx-auto" href="/events">
            <span className="my-auto">Browse All Events</span>
            <ArrowRightIcon className="w-6 h-6 my-auto" />
          </Link>
        </Section>

        <Section>
          <div className="grid grid-cols-[auto,1fr] lg:grid-cols-1 gap-10">
            <h3 className="text-5xl sm:text-4xl max-w-lg sm:max-w-sm !leading-tight h-max">Frequently Asked Questions</h3>
            <div>
              <FAQSection />
              <div className="flex gap-4 py-8">
                <Link className="flex gap-2 text-xl text-theme my-auto" href="mailto:hello@dscubed.org.au">
                  <span className="my-auto">Get In Touch</span>
                  <ArrowRightIcon className="w-6 h-6 my-auto" />
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  )
}
