'use client'
import { createEvent } from '@/app/lib/action'
import { getToday, getOneYearFromToday, convertBase64 } from '@/app/lib/utils'
import { useRef, useState } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { createThumbnail } from '@/app/lib/image'
import Spinner from '../Spinner'

function EventFormChild () {
  const fileRef = useRef()
  const [imageData, setImageData] = useState()
  const status = useFormStatus()

  async function onChangeHandler (e) {
    const file = e.target.files[0]
    const image = await createThumbnail(file)

    if (!image) {
      return
    }

    // Set image preview
    const base64Data = await convertBase64(image)
    setImageData(base64Data)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="text-text-secondary">Thumbnail (min 100 KB, max 50 MB)</label>

        {/* Image preview */}
        <div
          onClick={e => fileRef.current.click()}
          className="flex w-full h-64 p-2 bg-background bg-no-repeat bg-center bg-cover rounded-md cursor-pointer" 
          style={{ backgroundImage: `url(${imageData})` }}
        >
          {/* Instructions */}
          {
            imageData 
            ? <p className="w-max h-max py-1 px-2 text-center text-sm text-text-secondary bg-background-secondary border border-border rounded-md">Edit</p>
            : <p className="m-auto py-2 px-6 text-center text-text-secondary bg-background-secondary border border-border rounded-full">Click to Select Image</p>
          }
        </div>

        {/* Hidden file input */}
        <input name="file" ref={fileRef} onChange={onChangeHandler} type="file" hidden/>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-text-secondary">Event Date</label>
        <input
          name="date"
          min={getToday()}
          max={getOneYearFromToday()}
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
        <span className="my-auto">{status.pending ? 'Processing...' : 'Publish Event'}</span>
      </button>
    </>
  )
  
}

export default function EventForm () {
  const [status, action] = useFormState(createEvent, {})

  return (
    <form className="flex flex-col gap-4 w-full mx-auto" action={action}>
      {/* Form message */}
      {status?.error && (
        <div className="bg-error/10 rounded-md p-2">
          <p className="text-center text-error">{status.error.message}</p>
        </div>
      )}

      {/* Fields */}
      <EventFormChild />
    </form>
  )
}