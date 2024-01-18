import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import IntroSection from '@/app/components/home/IntroSection'
import WhatWeDoSection from '@/app/components/home/WhatWeDoSection'
import AimsSection from '@/app/components/home/AimsSection'
import ReasonsSection from '@/app/components/home/ReasonsSection'
import MapSection from '@/app/components/home/MapSection'
import HeroSection from '@/app/components/home/HeroSection'
import EventSection from '@/app/components/home/EventSection'
import GallerySection from '@/app/components/home/GallerySection'
import FAQSection from '@/app/components/home/FAQSection'

export default function Index() {
  return (
    <>
      <HeroSection />
      <Navbar />

      <main className="relative bg-background-secondary z-10">
        <IntroSection />
        <WhatWeDoSection />
        <AimsSection />
        <ReasonsSection />
        <MapSection />
        {/* <FollowSection /> */}
        <EventSection />
        <GallerySection />
        <FAQSection />
      </main>

      <Footer />
    </>
  )
}
