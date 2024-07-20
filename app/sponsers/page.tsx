import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Section from '@/app/components/Section'
import PromoteSection from '@/app/components/sponsors/PromoteSection'
import SpeakersSection from '@/app/components/sponsors/SpeakersSection'
import SilverSponsorSection from '../components/sponsors/SilverSponsorSection'
import PartnerSection from '../components/sponsors/PartnerSection'
import PlatinumSponsorSection from '../components/sponsors/PlatinumSponsorSection'
import PastSponsorSection from '../components/sponsors/PastSponsorSection'

export const metadata = {
  title: 'Sponsors | DSCubed',
  description: 'View past sponsors of DSCubed',
  openGraph: {
    title: 'Sponsors | DSCubed',
    description: 'View past sponsors of DSCubed',
    url: '/sponsors',
    siteName: 'DSCubed',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sponsors | DSCubed",
    description: 'View past sponsors of DSCubed',
  },
}

export default function SponsersPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Section>
          <div className="">
            <h1 className="text-5xl sm:text-4xl text-center mx-auto mb-5 !leading-tight">Sponsorships</h1>
            {/* <p className="text-xl text-text-secondary text-center mx-auto !leading-relaxed">Organisations that have sponsored us in the past.</p> */}
          </div>
        </Section>

        <PlatinumSponsorSection />
        <SilverSponsorSection />
        <PartnerSection />
        <PastSponsorSection />
        <SpeakersSection />
        <PromoteSection />
      </main>

      <Footer />
    </>
  )
}