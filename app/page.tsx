import Navbar from "@/app/components/Navbar"
import Footer from "./components/Footer"
import IntroSection from "./components/home/IntroSection"
import WhatWeDoSection from "./components/home/WhatWeDoSection"
import AimsSection from "./components/home/AimsSection"
import ReasonsSection from "./components/home/ReasonsSection"
import MapSection from "./components/home/MapSection"
import HeroSection from "./components/home/HeroSection"
import EventSection from "./components/home/EventSection"
import GallerySection from "./components/home/GallerySection"
import FAQSection from "./components/home/FAQSection"

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
