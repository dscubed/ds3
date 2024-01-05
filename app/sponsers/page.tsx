import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import SponsorCard from "../components/SponserCard";
import Banner from "../components/Banner";

const images = [
  '/sponsors/citadel.svg',
  '/sponsors/csiro.svg',
  '/sponsors/deloitte.svg',
  '/sponsors/liberty.svg',
  '/sponsors/macquarie.svg',
  '/sponsors/maltem.png',
  '/sponsors/mantel-group.svg',
  '/sponsors/plotly.png',
  '/sponsors/rea-group.svg',
  '/sponsors/seek.svg',
]

export default function SponsersPage() {
  return (
    <>
      <Navbar />

      <main>
        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-32 p-4">
          <h4 className="mb-5 text-2xl">Gold Sponsors</h4>
          <div className="grid grid-cols-2 gap-4">
            <SponsorCard
              name="Citadel"
              category="Investment Management"
              color="#644d00"
              image="/sponsors/citadel.svg"
              link="#"
            />
            <SponsorCard
              name="Citadel"
              category="Investment Management"
              color="#644d00"
              image="/sponsors/citadel.svg"
              link="#"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-32 p-4">
          <h4 className="mb-5 text-2xl">Silver Sponsors</h4>
          <div className="grid grid-cols-2 gap-4">
            <SponsorCard
              name="Citadel"
              category="Investment Management"
              color="#333333"
              image="/sponsors/citadel.svg"
              link="#"
            />
            <SponsorCard
              name="Citadel"
              category="Investment Management"
              color="#333333"
              image="/sponsors/citadel.svg"
              link="#"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-32 p-4">
          <h4 className="mb-5 text-2xl">Bronze Sponsors</h4>
          <div className="grid grid-cols-2 gap-4">
            <SponsorCard
              name="Citadel"
              category="Investment Management"
              color="#4b2800"
              image="/sponsors/citadel.svg"
              link="#"
            />
            <SponsorCard
              name="Citadel"
              category="Investment Management"
              color="#4b2800"
              image="/sponsors/citadel.svg"
              link="#"
            />
          </div>
        </div>

        <div className="my-48">
          <div className="flex flex-col gap-4 max-w-screen-xl mx-auto p-4">
            <h4 className="mb-10 text-xl text-text-secondary text-center">Featured Speakers From</h4>
          </div>
          <Banner images={images} gap={80} speed={50000} />
        </div>

        <div className="flex flex-col gap-4 max-w-screen-lg mx-auto my-32 p-4">
          <div className="grid grid-cols-[auto,1fr] gap-10">
            <div className="flex flex-col gap-10 max-w-md my-auto">
              <h4 className="text-2xl">Become A Sponsor Today</h4>
              <p className="text-text-secondary text-xl leading-relaxed">Empower student excellence and fuel future leaders in data science by sponsoring DS Cubed. Your support propels students into the forefront of data-driven innovation.</p>
              <Link
                href="mailto:hello@dscubed.org.au" 
                target="_blank"
                className="flex gap-2 w-max bg-foreground text-background px-10 py-4 font-medium rounded-md text-lg cursor-pointer"
              >
                <span className="my-auto w-max">Get In Touch</span>
                <ArrowRightIcon className="my-auto w-7 h-7"/>
              </Link>
            </div>
            <Image
              className="w-full max-h-[450px] object-cover rounded-md"
              src="/dalle-money.png"
              width={300}
              height={300}
              alt="DALL-E generated image of money and currency"
            ></Image>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}