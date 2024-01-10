'use client'
import { deleteEvent } from '@/app/lib/action'
import { useFormStatus, useFormState } from 'react-dom'
import Spinner from '../../Spinner'

function FormChild ({ id }) {
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

export default function DeleteButton ({ id }) {
  const [status, action] = useFormState(deleteEvent, {})

  return (
    <form action={action}>
      <FormChild id={id} />
    </form>
  )
}