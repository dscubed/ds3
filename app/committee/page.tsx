import Image from "next/image"
import Navbar from "../components/Navbar"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Footer from "../components/Footer"
import Link from "next/link"

export default function CommitteePage () {
  return (
    <>
      <Navbar />

      <main className="p-4">
        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-32">
          <div className="grid grid-cols-[auto,1fr] gap-10">
            <div className="flex flex-col gap-10 max-w-lg my-auto">
              <h4 className="text-2xl">We Are Hiring</h4>
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
              width={300}
              height={300}
              alt="Oil painting of a baskball player"
            ></Image>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-32">
          <h3 className="mt-32 mb-10 text-4xl">2024 Committee</h3>
          <Image
            className="w-full max-h-[700px] object-cover rounded-md contrast-[1.1] brightness-[0.9] saturate-[1.2]"
            src="/committee.jpg"
            width={300}
            height={300}
            alt="Oil painting of a baskball player"
          ></Image>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-32">
          <h4 className="mt-16 mb-5 text-2xl">Executive Team</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
              <Image
                className="object-cover w-52 h-52 rounded-full mx-auto mb-2"
                src="/demo-avatar.jpeg"
                width={300}
                height={300}
                alt="Club president photo"
              ></Image>
              <h6 className="text-center leading-none text-lg">Nathan Luo</h6>
              <p className="text-text-secondary text-center leading-none text-lg">President</p>
            </div>
            <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
              <Image
                className="object-cover w-52 h-52 rounded-full mx-auto mb-2"
                src="/demo-avatar.jpeg"
                width={300}
                height={300}
                alt="Club president photo"
              ></Image>
              <h6 className="text-center leading-none text-lg">Hanshi Tang</h6>
              <p className="text-text-secondary text-center leading-none text-lg">Vice President</p>
            </div>
            <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
              <Image
                className="object-cover w-52 h-52 rounded-full mx-auto mb-2"
                src="/demo-avatar.jpeg"
                width={300}
                height={300}
                alt="Club president photo"
              ></Image>
              <h6 className="text-center leading-none text-lg">Justin Lee</h6>
              <p className="text-text-secondary text-center leading-none text-lg">Secretary</p>
            </div>
            <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
              <Image
                className="object-cover w-52 h-52 rounded-full mx-auto mb-2"
                src="/demo-avatar.jpeg"
                width={300}
                height={300}
                alt="Club president photo"
              ></Image>
              <h6 className="text-center leading-none text-lg">Georgina Qiu</h6>
              <p className="text-text-secondary text-center leading-none text-lg">Treasurer</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-32">
          <h4 className="mt-16 mb-5 text-2xl">Directors</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
              <Image
                className="object-cover w-52 h-52 rounded-full mx-auto mb-2"
                src="/demo-avatar.jpeg"
                width={300}
                height={300}
                alt="Club president photo"
              ></Image>
              <h6 className="text-center leading-none text-lg">Daksh Agrawal</h6>
              <p className="text-text-secondary text-center leading-none text-lg">Education Director</p>
            </div>
            <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
              <Image
                className="object-cover w-52 h-52 rounded-full mx-auto mb-2"
                src="/demo-avatar.jpeg"
                width={300}
                height={300}
                alt="Club president photo"
              ></Image>
              <h6 className="text-center leading-none text-lg">Hannah Luo</h6>
              <p className="text-text-secondary text-center leading-none text-lg">Events Director</p>
            </div>
            <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
              <Image
                className="object-cover w-52 h-52 rounded-full mx-auto mb-2"
                src="/demo-avatar.jpeg"
                width={300}
                height={300}
                alt="Club president photo"
              ></Image>
              <h6 className="text-center leading-none text-lg">Kevin Tang</h6>
              <p className="text-text-secondary text-center leading-none text-lg">Industry Director</p>
            </div>
            <div className="flex flex-col gap-3 py-10 px-5 bg-background rounded-md">
              <Image
                className="object-cover w-52 h-52 rounded-full mx-auto mb-2"
                src="/demo-avatar.jpeg"
                width={300}
                height={300}
                alt="Club president photo"
              ></Image>
              <h6 className="text-center leading-none text-lg">Michael Ren</h6>
              <p className="text-text-secondary text-center leading-none text-lg">IT Director</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-20 max-w-screen-xl mx-auto my-32">
          <h4 className="mt-16 mb-5 text-2xl">Subcommittees</h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-20">
            <div className="flex flex-col gap-5">
              <h5 className="text-2xl">Education</h5>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h5 className="text-2xl">Events</h5>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h5 className="text-2xl">Industry</h5>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h5 className="text-2xl">Marketing</h5>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
                </div>
                <div className="flex gap-4 bg-background rounded-md p-3">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src="/demo-avatar.jpeg"
                    width={50}
                    height={50}
                    alt="Club president photo"
                  ></Image>
                  <h6 className="leading-none text-lg my-auto">Daniel Everest</h6>
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