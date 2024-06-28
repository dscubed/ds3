import Image from 'next/image'
import Navbar from '@/app/components/Navbar'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import Section from '@/app/components/Section'
import committeePhoto from '@/public/people/committee.png'
import ExecutiveSection from '@/app/components/committee/ExecutiveSection'
import DirectorSection from '@/app/components/committee/DirectorSection'
import RepresentativeSection from '@/app/components/committee/RepresentativeSection'
import TeamsSection from '@/app/components/committee/TeamsSection'

export const metadata = {
  title: 'Committee | DSCubed',
  description: 'Meet the team behind DSCubed. Introducing our committee for 2024.',
  openGraph: {
    title: 'Committee | DSCubed',
    description: 'Meet the team behind DSCubed. Introducing our committee for 2024.',
    url: '/committee',
    siteName: 'DSCubed',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Committee | DSCubed",
    description: 'Meet the team behind DSCubed. Introducing our committee for 2024.',
  },
}

export default function CommitteePage() {
  return (
    <>
      <Navbar />

      <main>
        <Section>
          <div>
            <h1 className="text-5xl mb-5 sm:text-4xl">2024 Committee</h1>
            {(new Date()).getFullYear() > 2024 && (
              <Link className="flex gap-2 text-xl text-theme" href="#">
                <span className="my-auto">Past Committee</span>
                <ArrowRightIcon className="w-6 h-6 my-auto" />
              </Link>
            )}
          </div>
        </Section>


        <div className="px-2 mx-auto max-w-screen-xl">
          <Image
            className="w-full max-w-screen-2xl min-h-80 aspect-video mx-auto rounded-2xl object-cover brightness-[1.1] saturate-[1.2]"
            src={committeePhoto}
            alt="Committee group photo"
            width={1280}
          ></Image>
        </div>

        <ExecutiveSection />
        <DirectorSection />
        {/* <RepresentativeSection /> */}
        {/* <TeamsSection /> */}
      </main>

      <Footer />
    </>
  )
}