import { createThumbnail } from '@/app/lib/image'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import { createUniqueFileName } from './utils'

export async function createEvent (
  prevState: string | undefined,
  formData: FormData
) {
  const date = formData.get('date') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const link = formData.get('link') as string

  // Get and compress image
  const file = formData.get('file') as Blob
  const image = await createThumbnail(file) as Blob

  if (!image) {
    return { 
      error: {
        message: 'Failed to process image.'
      }
     }
  }

  console.log('Processed image.')

  const supabase = createClient()
  const fileName = createUniqueFileName(image.name)

  try {
    const { error } = await supabase
      .storage
      .from('thumbnails')
      .upload(fileName, image, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    console.log('Uploaded image.')
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Failed to upload event thumbnail.'
      }
    }
  }

  try {
    const { error } = await supabase
      .from('events')
      .insert({
        date,
        title,
        description,
        link,
        thumbnail: fileName
      })

    if (error) {
      throw error
    }

    console.log('Created event.')
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Failed to create new event.'
      }
    }
  }

  return { success: true }
}

export async function updateEvent (
  prevState: string | undefined,
  formData: FormData
) {
  const id = formData.get('id') as string
  const date = formData.get('date') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const link = formData.get('link') as string

  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('events')
      .update({
        date,
        title,
        description,
        link,
      })
      .eq('id', id)

    if (error) {
      throw error
    }

    console.log('Updated event.')
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Failed to update event.'
      }
    }
  }
  
  return redirect('/admin')
}

export async function deleteEvent (
  prevState: string | undefined,
  formData: FormData
) {
  const id = formData.get('id') as string
  const supabase = createClient()

  // Only delete event,
  // thumbnail is deleted automatically via Supabase trigger
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    console.log('Deleted event.')
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Failed to delete event.'
      }
    }
  }
  
  return redirect('/admin')
}