'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function fetchEventCount () {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { count, error } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      throw error
    }

    return count
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch event count.')
  }
}

export async function fetchEvents (range: [number, number] = [0, 4]) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .range(...range)
    
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

export async function fetchThumbnail (path: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase
    .storage
    .from('thumbnails')
    .getPublicUrl(path)

  return data
}