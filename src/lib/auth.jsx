import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from './supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  // Envía un "enlace mágico" al email indicado. Al pinchar el enlace,
  // Supabase devuelve al usuario a la propia app ya autenticado.
  const signInWithEmail = (email) =>
    supabase.auth.signInWithOtp({
      email,
      options: {
        // Vuelve a la propia app tras autenticarse (respeta el base path de Pages)
        emailRedirectTo: window.location.origin + import.meta.env.BASE_URL,
      },
    })

  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, loading, signInWithEmail, signOut, configured: isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
