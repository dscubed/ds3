import Image from "next/image"
import Navbar from "../components/Navbar"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Footer from "../components/Footer"
import Link from "next/link"
import MemberCard from "../components/committee/MemberCard"
import { executives, directors, representatives, teams } from './members'
import MemberList from "../components/committee/MemberList"
import Section from "../components/Section"

export default function CommitteePage () {
  return (
    <>
      <Navbar />

      <main>
        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <h3 className="text-4xl">2024 Committee</h3>
              {(new Date()).getFullYear() > 2024 && (
                <Link className="flex gap-2 text-xl text-theme" href="#">
                  <span className="my-auto">Past Committee</span>
                  <ArrowRightIcon className="w-6 h-6 my-auto" />
                </Link>
              )}
            <p className="text-text-secondary text-xl"></p>
          </div>
        </div>


        <div className="px-2 mx-auto">
          <Image
            className="w-full max-w-screen-4xl h-full min-h-[300px] max-h-[1000px] mx-auto rounded-lg object-cover contrast-[1.1] brightness-[0.9] saturate-[1.2]"
            src="/cissa.jpg"
            width={2000}
            height={2000}
            alt="Committee group photo"
          ></Image>
        </div>

        <Section>
          <h4 className="text-2xl">Executive Team</h4>
          <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 xs:grid-cols-1">
            {executives.map(profile => <MemberCard {...profile} />)}
          </div>
        </Section>

        <Section>
          <h4 className="text-2xl">Directors</h4>
          <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 xs:grid-cols-1">
            {directors.map(profile => <MemberCard {...profile} />)}
          </div>
        </Section>

        <Section>
          <h4 className="text-2xl">Representatives</h4>
          <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 xs:grid-cols-1">
            {representatives.map(profile => <MemberCard {...profile} />)}
          </div>
        </Section>

        <Section>
          <h4 className="text-2xl">Officers</h4>
          <MemberList teams={teams}/>
        </Section>
      </main>

      <Footer />
    </>
  )
}