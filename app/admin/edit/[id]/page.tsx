import { getUser } from "@/app/lib/auth.server";
import Footer from "@/app/components/Footer";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import UpdateForm from "@/app/components/admin/edit/UpdateForm";
import { fetchEvent } from "@/app/lib/data";
import DeleteButton from "@/app/components/admin/edit/DeleteButton";

export default async function EditPage({ params }: { params: { id: string } }) {
  const user = await getUser()
  const event = await fetchEvent(Number(params.id))

  if (!user) {
    return redirect('/admin/login')
  }

  return (
    <>
      <main className="p-4">
        <div className="flex flex-col gap-10 w-full max-w-md mx-auto my-40">
          <div className="flex flex-col gap-2">
            <Link href="/admin" className="flex gap-2 text-theme">
              <ArrowLeftIcon className="w-5 h-5 my-auto" />
              <span className="my-auto">Dashboard</span>
            </Link>
            <h4 className="text-2xl my-auto">Update Event</h4>
          </div>

          <UpdateForm 
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            link={event.link}
          />

          <DeleteButton id={event.id} />
        </div>
      </main>

      <Footer />
    </>
  )
}