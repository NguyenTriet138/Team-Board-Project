import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery } from 'convex/react';
import { createContext, useCallback, useContext } from 'react';
import { api } from '../../convex/_generated/api';
import type { ReactNode } from 'react';

interface User {
  _id: string
  name: string
  email: string
  pictureUrl?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const createUser = useMutation(api.auth.createUser)
  const user = useQuery(api.auth.getUser)
  const isLoading = user === undefined

  const signInWithGoogle = useCallback(async () => {
    // Start Google OAuth flow
    await window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async ({ credential }: { credential: string }) => {
        // Decode the JWT token to get user info
        const decoded = JSON.parse(atob(credential.split('.')[1]))
        const { name, email, picture } = decoded

        try {
          await createUser({
            name,
            email,
            pictureUrl: picture,
          })
          navigate({ to: '/' })
        } catch (error) {
          if (
            typeof error === 'object' &&
            error !== null &&
            'message' in error &&
            typeof (error as { message?: unknown }).message === 'string' &&
            (error as { message: string }).message !== 'User already exists'
          ) {
            console.error('Error creating user:', error)
          }
          navigate({ to: '/' })
        }
      },
    })

    window.google.accounts.id.prompt()
  }, [createUser, navigate])

  const signOut = useCallback(async () => {
    // Remove credentials and navigate to login
    window.google.accounts.id.revoke('', () => {
      navigate({ to: '/login' })
    })
  }, [navigate])

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
