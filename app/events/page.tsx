import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import EventGallery from "../components/events/EventGallery";

export default function SponsersPage() {
  return (
    <>
      <Navbar />

      <main className='p-4'>
        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <h3 className="text-4xl text-center mx-auto leading-tight">What's Happening at DS3</h3>
          <p className="text-xl text-text-secondary text-center mx-auto leading-tight">Browse our latest events, workshop sessions, and updates.</p>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <EventGallery />
        </div>
      </main>

      <Footer />
    </>
  )
}