'use client'
import Navbar from "@/app/components/Navbar"
import { watchTimeout, watchInterval } from '@/app/lib/performance'
import IntroMatrix from "./components/IntroMatrix"
import Image from "next/image"
import MapMatrix from "./components/MapMatrix"
import Splide from "@splidejs/splide"
import { useEffectOnce } from "./lib/utils"
import '@splidejs/splide/css/core';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/solid'
import Link from "next/link"
import Footer from "./components/Footer"
import EventCard from "./components/EventCard"
import * as Icon from 'react-bootstrap-icons';
import fadeScaleTransition from '@/app/components/transition'
import FollowBox from "./components/FollowBox"
import { Intersection } from '@splidejs/splide-extension-intersection';
import FAQItem from "./components/FaqItem"

// watchInterval()
// watchTimeout()

export default function Index() {
  useEffectOnce(() => {
    var splide = new Splide('.splide', {
      rewind: true,
      height: '500px',
      padding: '5rem',
      gap: '20px',
      padding: '15%',
      interval: 4000,
      autoplay: 'pause',
      intersection: {
        inView: {
          autoplay: true,
        },
        outView: {
          autoplay: false,
        },
      },
    });
    splide.mount({ Intersection }, fadeScaleTransition)
  }, [])

  return (
    <>
      <div className="w-screen h-screen">
        <IntroMatrix />
      </div>

      {/* Add shadow to hide matrix edges */}
      <div
        className="absolute block w-screen h-screen top-0 left-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px 100px var(--background-secondary)'
        }}
      ></div>

      <Navbar />

      <main>
        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-[auto,1fr] gap-10">
              <div className="flex flex-col gap-10 max-w-lg my-auto">
                <p className="text-text-secondary">D3S / DS Cubed / Data Science Student Society</p>
                <h1 className="block text-3xl max-w-[700px] leading-normal">We are dedicated to connect all data enthusiasts, to support and engage students who have a passion for Data Science at The University of Melbourne</h1>
                <button className="w-max bg-foreground text-background px-10 py-4 font-medium rounded-md">Become a Member</button>
              </div>
              <Image
                className="w-full max-h-[550px] object-cover rounded-md"
                src="/dalle-suitcase2.png"
                width={1024}
                height={1024}
                alt="DALL-E generated image of money and currency"
              ></Image>
            </div>
          </div>
        </div>
        
        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-[1fr,auto] gap-10">
              <Image
                className="w-full max-h-[550px] object-cover rounded-md"
                src="/dalle-robot-chess.webp"
                width={1024}
                height={1024}
                alt="DALL-E generated image of money and currency"
              ></Image>
              <div className="flex flex-col gap-10 max-w-lg my-auto">
                <h4 className="text-2xl">About The Club</h4>
                <p className="text-text-secondary text-xl leading-relaxed">Explore data science at the University of Melbourne with our thriving club of 200+ members. We bridge disciplines, fostering collaboration for those passionate about extracting insights from data. Join us in unraveling the mysteries of data through workshops, events, and collaborative projects at the cutting edge of this transformative field.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <h3 className="mb-10 text-4xl">What We Do?</h3>

            <div className="grid grid-cols-3 gap-8">
              <div className="grid gap-4 h-max">
                <h4 className="text-lg">Data Science Career Help</h4>
                <Image
                  className="rounded-md object-cover w-full h-[250px]"
                  src="/dalle-suitcase.png"
                  width={1024}
                  height={1024}
                  alt="Data science career help cover image"
                ></Image>
                <p className="text-text-secondary text-lg">We're the one-stop hub to provide data science career help. We are hosting recruitment talk throughout the academic calendars and data science related jobs through our newsletters.</p>
              </div>

              <div className="grid gap-4 h-max">
                <h4 className="text-lg">Technical Workshops</h4>
                <Image
                  className="rounded-md object-cover w-full h-[250px]"
                  src="/dalle-tabletop-cropped.png"
                  width={1024}
                  height={1024}
                  alt="Data science career help cover image"
                ></Image>
                <p className="text-text-secondary text-lg">We explore data science topics and organise technical workshops for our fellow members. From creating data visualisation dashboards to building E2E Machine Learning pipelines, we got you covered for any essential skills that you may require during your AI/ML career.</p>
              </div>

              <div className="grid gap-4 h-max">
                <h4 className="text-lg">Student Networking</h4>
                <Image
                  className="rounded-md object-cover w-full h-[250px]"
                  src="/dalle-people.png"
                  width={1024}
                  height={1024}
                  alt="Data science career help cover image"
                ></Image>
                <p className="text-text-secondary text-lg">We organize student community events and here’s your chance to meet and network with other like-minded students. Apart from the get-along events, we also host revision workshop for common data science subjects with past tutors.</p>
              </div>
            </div>  
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <h3 className="mb-10 text-4xl">Club Aims</h3>

            <div className="grid grid-cols-3 gap-10">
              <div className="flex flex-col gap-4 max-w-[300px]">
                <h4 className="text-xl text-theme">Connection</h4>
                <p className="text-text-secondary text-xl leading-relaxed">To provide an environment that encourage Data Science students to connect through social events and study groups.</p>
              </div>
              <div className="flex flex-col gap-4 max-w-[300px]">
                <h4 className="text-xl text-theme">Education</h4>
                <p className="text-text-secondary text-xl leading-relaxed">To provide seminars, workshops and discussions on Data Science & AI subjects to broaden and improve students’ skills and knowledge.</p>
              </div>
              <div className="flex flex-col gap-4 max-w-[300px]">
                <h4 className="text-xl text-theme">Events</h4>
                <p className="text-text-secondary text-xl leading-relaxed">To host events that provide opportunities for students to network with Data Science research and industry partners.</p>
              </div>
              <div className="flex flex-col gap-4 max-w-[300px]">
                <h4 className="text-xl text-theme">Advocacy</h4>
                <p className="text-text-secondary text-xl leading-relaxed">To co-ordinate the representation of Data Science students to the Science and Computer Science Faculties, and to the University.</p>
              </div>
              <div className="flex flex-col gap-4 max-w-[300px]">
                <h4 className="text-xl text-theme">Support</h4>
                <p className="text-text-secondary text-xl leading-relaxed">To support students and their studies with Data Science related courses. </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-[1fr,1fr] gap-0">
              <div className="">
                <div className="sticky top-[calc(102.55px+20px)]">
                  <h3 className="max-w-sm mb-10 text-4xl leading-tight">Four Reasons Why You Should Join DS Cubed</h3>
                  <p className="max-w-md text-text-secondary text-xl leading-relaxed">Embrace the unknown, for within it lies the canvas of endless possibilities waiting to be painted with the strokes of your curiosity and courage.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-20 max-w-xl">
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
                  <p className="text-xl text-text-secondary leading-normal">As a prominent club at the University of Melbourne, with 203 members, we cater to diverse interests with events tailored for data hungry people like you.</p>
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
                  <p className="text-xl text-text-secondary leading-normal">Our vibrant community comprises members from 6 diverse majors—connect with individuals across various academic realms and broaden your horizons.</p>
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
                  <p className="text-xl text-text-secondary leading-normal">Embark on an exciting journey with our lineup of 48 planned events this year, ranging from competitions to careers night—join us to learn, connect, and forge new friendships.</p>
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
                  <p className="text-xl text-text-secondary leading-normal">Data science can be tough, but we are here to help. Join our 10 student-lead workshops this year covering R, statistics, probability, and more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <div className="flex flex-col gap-10">
              <h4 className="text-4xl text-center max-w-sm mx-auto leading-tight mb-10">Members From All Over The World</h4>
              <div className="w-full h-[600px]">
                <MapMatrix></MapMatrix>
              </div>
            </div>
          </div>
        </div>

        <FollowBox />
        
        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <h3 className="mb-10 text-4xl text-center">Activities For Everyone</h3>

            <div className="splide" role="group" aria-label="Gallery carousel">
              <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev flex w-10 h-10 bg-background-secondary rounded-full text-text-secondary hover:text-text-primary transition border border-border absolute left-[-18px] top-1/2 translate-y-[-50%] z-10">
                  <ChevronLeftIcon className="m-auto w-7 pr-0.5"></ChevronLeftIcon>
                </button>
                <button className="splide__arrow splide__arrow--next flex w-10 h-10 bg-background-secondary rounded-full text-text-secondary hover:text-text-primary transition border border-border absolute right-[-18px] top-1/2 translate-y-[-50%] z-10">
                  <ChevronRightIcon className="m-auto w-7 pl-0.5"></ChevronRightIcon>
                </button>
              </div>
            
              <div className="splide__track rounded-md">
                <ul className="splide__list">
                  <li className="splide__slide">
                    <Image
                      className="rounded-md object-cover w-full h-full"
                      src="/hero1.jpg"
                      width={300}
                      height={200}
                      alt="Data science career help cover image"
                    ></Image>
                  </li>
                  <li className="splide__slide">
                    <Image
                      className="rounded-md object-cover w-full h-full"
                      src="/hero1.jpg"
                      width={300}
                      height={200}
                      alt="Data science career help cover image"
                    ></Image>
                  </li>
                  <li className="splide__slide">
                    <Image
                      className="rounded-md object-cover w-full h-full"
                      src="/hero2.jpg"
                      width={300}
                      height={200}
                      alt="Data science career help cover image"
                    ></Image>  
                  </li>
                  <li className="splide__slide">
                    <Image
                      className="rounded-md object-cover w-full h-full"
                      src="/hero2.jpg"
                      width={300}
                      height={200}
                      alt="Data science career help cover image"
                    ></Image>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-10 max-w-screen-xl mx-auto">
            <div className="flex gap-4">
              <EventCard 
                name="Elements of Data Processing"
                description="Calling all data disciples! Prepare to ace your upcoming 'Elements of Data Processing' exam at our revision workshop!"
                image="/dalle-crowd.png"
              />
              <EventCard 
                name="Statistics"
                description="Calling all data disciples! Prepare to ace your upcoming 'Elements of Data Processing' exam at our revision workshop!"
                image="/dalle-robot-chess.webp"
              />
              <EventCard 
                name="Machine Learning Basics"
                description="Calling all data disciples! Prepare to ace your upcoming 'Elements of Data Processing' exam at our revision workshop!"
                image="/dalle-city.png"
              />
              <EventCard 
                name="Movie Night"
                description="Calling all data disciples! Prepare to ace your upcoming 'Elements of Data Processing' exam at our revision workshop!"
                image="/dalle-crowd.png"
              />
            </div>
            
            <Link className="flex gap-2 text-xl text-theme mx-auto" href="/events">
              <span className="my-auto">Browse All Events</span>
              <ArrowRightIcon className="w-6 h-6 my-auto" />
            </Link>
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-[auto,1fr] gap-10">
              <h3 className="text-4xl max-w-sm leading-relaxed h-max">Frequently Asked Questions</h3>
              <div className="flex flex-col">
                <FAQItem 
                  question="What is the difference between computer and data science?"
                  answer="Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains."
                />
                <FAQItem 
                  question="How much does the membership cost?"
                  answer="Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains."
                />
                <FAQItem 
                  question="When does the membership application open?"
                  answer="Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains."
                />
                <FAQItem 
                  question="I'm not a University of Melbourne student, can I still join?"
                  answer="Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains."
                />
                <div className="flex gap-4 py-8">
                  <Link className="flex gap-2 text-xl text-theme my-auto" href="mailto:hello@dscubed.org.au">
                    <span className="my-auto">Get In Touch</span>
                    <ArrowRightIcon className="w-6 h-6 my-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
