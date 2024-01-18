import { getUser } from '@/app/lib/auth.server'
import Footer from '@/app/components/Footer'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import CreateForm from '@/app/components/admin/create/CreateForm'
import { redirect } from 'next/navigation'

export default async function CreatePage() {
  const user = await getUser()

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
            <h4 className="text-2xl my-auto">Create new event</h4>
          </div>

          <CreateForm />
        </div>
      </main>

      <Footer />
    </>
  )
}