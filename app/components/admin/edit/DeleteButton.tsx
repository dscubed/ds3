'use client'
import { deleteEvent } from '@/app/lib/action'
//@ts-expect-error
import { useFormStatus } from 'react-dom'
import { useFormStateFix } from '@/app/lib/utils'
import Spinner from '../../Spinner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function FormChild ({ id }: {id: number }) {
  const status = useFormStatus()

  return (
    <>
      {/* Hidden input to carry ID value */}
      <input name="id" defaultValue={id} required hidden />

      <button 
        className="flex gap-2 py-2 px-4 w-max font-medium text-center text-error bg-error/10 rounded-full"
        disabled={status.pending}
      >
        {status.pending && <Spinner className="my-auto" /> }
        <span className="my-auto">{status.pending ? 'Processing...' : 'Delete Event'}</span>
      </button>
    </>
  )
}

export default function DeleteButton ({ id }: { id: number }) {
  const [status, action] = useFormStateFix(deleteEvent, {})
  const router = useRouter()

  useEffect(() => {
    if (status.success) {
      console.log('Redirecting.')
      router.push('/admin')
      router.refresh()
    }
  }, [status])

  return (
    <form action={action}>
      <FormChild id={id} />
    </form>
  )
}