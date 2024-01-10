'use client'
import { updateEvent } from '@/app/lib/action'
import { getToday, getOneYearFromToday } from '@/app/lib/utils'
import { useFormStatus, useFormState } from 'react-dom'
import Spinner from '../Spinner'

function FormChild ({
  id,
  title,
  description,
  date,
  link
}: {
  id: number,
  title: string,
  description: string,
  date: string,
  link: string
}) {
  const status = useFormStatus()

  return (
    <>
      {/* Hidden input to carry ID value */}
      <input name="id" defaultValue={id} required hidden />

      <div className="flex flex-col gap-2">
        <label className="text-text-secondary">Event Date</label>
        <input
          name="date"
          min={getToday()}
          max={getOneYearFromToday()}
          defaultValue={date}
          type="date"
          className="py-2 px-3 bg-background border border-border rounded-md placeholder:text-text-secondary focus:outline outline-2 outline-offset-2 outline-outline-border"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-text-secondary">Title</label>
        <input
          name="title"
          type="text"
          defaultValue={title}
          placeholder="Title"
          className="py-2 pr-2 indent-3 bg-background border border-border rounded-md placeholder:text-text-secondary focus:outline outline-2 outline-offset-2 outline-outline-border"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-text-secondary">Description</label>
        <textarea
          name="description"
          rows={6}
          maxLength={200}
          defaultValue={description}
          placeholder="Description"
          className="py-2 px-3 bg-background border border-border rounded-md placeholder:text-text-secondary focus:outline outline-2 outline-offset-2 outline-outline-border resize-none"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-text-secondary">Redirect Link</label>
        <input
          name="link"
          type="text"
          defaultValue={link}
          placeholder="Redirect Link (https://)"
          className="py-2 pr-2 indent-3 bg-background border border-border rounded-md placeholder:text-text-secondary focus:outline outline-2 outline-offset-2 outline-outline-border"
          required
        />
      </div>

      <button 
        className="flex gap-2 py-2 px-4 w-max font-medium text-center text-background bg-foreground rounded-full mt-10"
        disabled={status.pending}
      >
        {status.pending && <Spinner className="invert my-auto" /> }
        <span className="my-auto">{status.pending ? 'Processing...' : 'Update Event'}</span>
      </button>
    </>
  )
  
}

export default function EditForm ({ ...data }) {
  const [status, action] = useFormState(updateEvent, {})

  return (
    <form className="flex flex-col gap-4 w-full mx-auto" action={action}>
      {/* Form message */}
      {status?.error && (
        <div className="bg-error/10 rounded-md p-2">
          <p className="text-center text-error">{status.error.message}</p>
        </div>
      )}

      {/* Fields */}
      <FormChild {...data} />
    </form>
  )
}