import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUser } from '@/app/lib/auth.server'
import Error from '@/app/components/Error'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser() as any
  const pathname = headers().get('x-pathname')

  // Auth guard
  if (pathname === '/admin/login') {
    if (user) {
      return redirect('/admin')
    }
  } else {
    if (!user) {
      const params = new URLSearchParams({ next: pathname! }).toString()
      return redirect(`/admin/login?${params}`)
    }

    // If set, only allow users whose email is in the list to access admin pages
    // Note: this only provide client side validation, and does not prevent access to Supabase via other clients.
    if (process.env.ADMIN_EMAILS) {
      const allowedList = process.env.ADMIN_EMAILS.replaceAll(' ', '').split(',')
      if (allowedList.indexOf(user!.email) === -1) {
        return <Error code={403} message="You don't have access to admin pages. Please contact the IT team to request access." />
      }
    }
  }

  return (
    <>
      {children}
    </>
  )
}
