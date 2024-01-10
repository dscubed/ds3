import Image from "next/image"
import Navbar from "../components/Navbar"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Footer from "../components/Footer"
import Link from "next/link"
import MemberCard from "../components/committee/MemberCard"
import { executives, directors, representatives, teams } from './members'
import MemberList from "../components/committee/MemberList"

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


        <div className="relative px-2 w-[calc(100vw-16px)] min-h-[500px] h-[100vh] max-h-[1000px] mx-auto">
          <Image
            className="rounded-lg object-cover contrast-[1.1] brightness-[0.9] saturate-[1.2]"
            src="/cissa.jpg"
            fill={true}
            alt="Committee group photo"
          ></Image>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-[auto,1fr] gap-10">
              <div className="flex flex-col gap-10 max-w-lg my-auto">
                <h4 className="text-2xl">We Are Recruiting</h4>
                <p className="text-text-secondary text-xl leading-relaxed">We are currently seeking motivated and passionate individuals to join our committee and help us grow and improve our club. This is your opportunity to be part of a vibrant community, develop new skills, and connect with like-minded students and industry professionals.</p>
                <Link
                  href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/dscubed/" 
                  target="_blank"
                  className="flex gap-2 w-max bg-foreground text-background px-10 py-4 font-medium rounded-md text-lg cursor-pointer"
                >
                  <span className="my-auto w-max">Apply Now</span>
                  <ArrowRightIcon className="my-auto w-7 h-7"/>
                </Link>
              </div>
              <Image
                className="w-full max-h-[550px] object-cover rounded-md"
                src="/dalle-basketball.webp"
                width={1024}
                height={1024}
                alt="DALL-E generated image of ..."
              ></Image>
            </div>
          </div>
        </div>  
        
       

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <h4 className="mb-5 text-2xl">Executive Team</h4>
            <div className="grid grid-cols-4 gap-4">
              {executives.map(profile => <MemberCard {...profile} />)}
            </div>
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <h4 className="mb-5 text-2xl">Directors</h4>
            <div className="grid grid-cols-4 gap-4">
              {directors.map(profile => <MemberCard {...profile} />)}
            </div>
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <h4 className="mb-5 text-2xl">Representatives</h4>
            <div className="grid grid-cols-4 gap-4">
              {representatives.map(profile => <MemberCard {...profile} />)}
            </div>
          </div>
        </div>

        <div className="p-4 my-40">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
            <h4 className="mb-5 text-2xl">Officers</h4>
            <MemberList teams={teams}/>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}