import Image from "next/image"
import Navbar from "../components/Navbar"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Footer from "../components/Footer"
import Link from "next/link"
import Section from "../components/Section"
import committeePhoto from '@/public/people/committee.jpg'
import ExecutiveSection from "../components/committee/ExecutiveSection"
import DirectorSection from "../components/committee/DirectorSection"
import RepresentativeSection from "../components/committee/RepresentativeSection"
import TeamsSection from "../components/committee/TeamsSection"

export default function CommitteePage () {
  return (
    <>
      <Navbar />

      <main>
        <Section>
          <div>
            <h3 className="text-4xl mb-5">2024 Committee</h3>
            {(new Date()).getFullYear() > 2024 && (
              <Link className="flex gap-2 text-xl text-theme" href="#">
                <span className="my-auto">Past Committee</span>
                <ArrowRightIcon className="w-6 h-6 my-auto" />
              </Link>
            )}
          </div>
        </Section>


        <div className="px-2 mx-auto">
          <Image
            className="w-full max-w-screen-4xl h-full min-h-[300px] max-h-[1000px] mx-auto rounded-2xl object-cover contrast-[1.1] brightness-[0.9] saturate-[1.2]"
            src={committeePhoto}
            width={2000}
            height={2000}
            alt="Committee group photo"
          ></Image>
        </div>

        <ExecutiveSection />
        <DirectorSection />
        <RepresentativeSection />
        <TeamsSection />
      </main>

      <Footer />
    </>
  )
}