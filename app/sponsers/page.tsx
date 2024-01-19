import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Section from '@/app/components/Section'
import PromoteSection from '@/app/components/sponsors/PromoteSection'
import SpeakersSection from '@/app/components/sponsors/SpeakersSection'
import GoldTierSection from '@/app/components/sponsors/GoldTierSection'

export const metadata = {
  title: 'Sponsors | DS Cubed',
  description: 'View past sponsors of DS Cubed',
  openGraph: {
    title: 'Sponsors | DS Cubed',
    description: 'View past sponsors of DS Cubed',
    url: '/sponsors',
    siteName: 'DS Cubed',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sponsors | DS Cubed",
    description: 'View past sponsors of DS Cubed',
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
            <p className="text-xl text-text-secondary text-center mx-auto !leading-relaxed">Organisations that have sponsored us in the past.</p>
          </div>
        </Section>

        <GoldTierSection />
        <SpeakersSection />
        <PromoteSection />
      </main>

      <Footer />
    </>
  )
}