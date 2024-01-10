import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Paginator from "../components/Paginator";
import EventGallery from "../components/events/EventGallery";
import { fetchEventCount } from "../lib/data";
import { pageToRange } from "../lib/utils.server";

export default async function SponsersPage({ searchParams }: { searchParams: { page: number } }) {
  const page = Number(searchParams.page || 1)
  const limit = 4
  const count = await fetchEventCount()
  const range = pageToRange(page, limit)

  return (
    <>
      <Navbar />

      <main className='p-4'>
        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <h3 className="text-4xl text-center mx-auto leading-tight">What's Happening at DS3</h3>
          <p className="text-xl text-text-secondary text-center mx-auto leading-tight">Browse our latest events, workshop sessions, and updates.</p>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <EventGallery range={range} />
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <Paginator page={page} limit={limit} count={count} />
        </div>
      </main>

      <Footer />
    </>
  )
}