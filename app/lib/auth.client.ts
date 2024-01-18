import { createClient } from "@/utils/supabase/client";

export async function getUser () {
	const supabase = createClient()
	const { data: { user } } = await supabase.auth.getUser()
	return user
}

export async function signIn (next: string = '/admin') {
  const params = new URLSearchParams({ next }).toString()
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({ 
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback?${params}`
    },
  })
}

export async function signOut () {
  const supabase = createClient()
  await supabase.auth.signOut()
}