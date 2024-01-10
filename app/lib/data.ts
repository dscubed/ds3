'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function fetchEvents () {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      // .range(0, 1)
    
    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch events.')
  }
}

export async function fetchEvent (id: number) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch event.')
  }
}

export async function fetchThumbnail (path) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase
    .storage
    .from('thumbnails')
    .getPublicUrl(path)

  return data
}