import { useState, useEffect } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

export const DUMMY_ADMIN_EMAIL = 'admin@example.com'
export const DUMMY_ADMIN_PASSWORD = 'admin123'
const DUMMY_ADMIN_SESSION_KEY = 'dummy_admin_session'

export const getDummyAdminSession = () => {
  if (typeof window === 'undefined') return null

  return window.localStorage.getItem(DUMMY_ADMIN_SESSION_KEY) === 'true'
    ? {
        user: {
          email: DUMMY_ADMIN_EMAIL,
          role: 'admin',
        },
      }
    : null
}

export const setDummyAdminSession = () => {
  window.localStorage.setItem(DUMMY_ADMIN_SESSION_KEY, 'true')
}

export const clearDummyAdminSession = () => {
  window.localStorage.removeItem(DUMMY_ADMIN_SESSION_KEY)
}

export const useAuth = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const dummySession = getDummyAdminSession()
    if (dummySession) {
      setSession(dummySession)
      setLoading(false)
      return
    }

    if (!isSupabaseConfigured) {
      setSession(null)
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { session, loading, user: session?.user }
}
