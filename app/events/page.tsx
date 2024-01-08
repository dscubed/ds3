import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

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
          <div className="flex gap-4">
            <EventCard 
              name="Elements of Data Processing"
              description="Calling all data disciples! Prepare to ace your upcoming 'Elements of Data Processing' exam at our revision workshop!"
              image="/dalle-crowd.png"
            />
              <EventCard 
              name="Statistics"
              description="Calling all data disciples! Prepare to ace your upcoming 'Elements of Data Processing' exam at our revision workshop!"
              image="/dalle-robot-chess.webp"
            />
              <EventCard 
              name="Machine Learning Basics"
              description="Calling all data disciples! Prepare to ace your upcoming 'Elements of Data Processing' exam at our revision workshop!"
              image="/dalle-city.png"
            />
            <EventCard 
              name="Movie Night"
              description="Calling all data disciples! Prepare to ace your upcoming 'Elements of Data Processing' exam at our revision workshop!"
              image="/dalle-crowd.png"
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}