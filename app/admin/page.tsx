import { getUser } from "@/app/lib/auth.server";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import EventCardAdmin from "../components/admin/EventCardAdmin";
import Link from "next/link";
import { fetchEventCount, fetchEvents, fetchThumbnail } from "../lib/data";
import SignOutButton from "../components/admin/SignOutButton";
import { pageToRange } from "../lib/utils.server";
import Paginator from "../components/Paginator";
import { redirect } from "next/navigation";

export default async function AdminPage({ searchParams }: { searchParams: { page: number } }) {
  const user = await getUser()

  if (!user) {
    return redirect('/admin/login')
  }

  const page = Number(searchParams.page || 1)
  const limit = 3
  const count = await fetchEventCount()
  const range = pageToRange(page, limit)
  const events = await fetchEvents(range)

  return (
    <>
      <Navbar />

      <main className='p-4'>
        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <h3 className="text-4xl  leading-tight">Admin Dashboard</h3>
          <p className="text-xl text-text-secondary leading-tight">
            Logged in As 
            <span className="text-text-secondary"> {user?.email}</span>
          </p>
          <SignOutButton />
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <div className="flex justify-between gap-8 mb-10">
            <h4 className="text-2xl my-auto">Manage Events</h4>
            <Link href="/admin/create" className="py-3 px-6 rounded-full bg-foreground text-lg text-background w-max my-auto">Create New</Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {events.map(item => (
              <EventCardAdmin
                id={item.id}
                title={item.title}
                description={item.description}
                thumbnail={item.thumbnail}
                link={item.link}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-xl mx-auto my-40">
          <Paginator page={page} limit={limit} count={count} />
        </div>
      </main>

      <Footer />
    </>
  )
}