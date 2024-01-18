import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUser } from '@/app/lib/auth.server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
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
  }

  return (
    <>
      {children}
    </>
  )
}
