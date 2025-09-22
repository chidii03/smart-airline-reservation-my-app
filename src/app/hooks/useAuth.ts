"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { authService } from '@/app/lib/auth'
import { apiClient } from '@/app/lib/api'
import { User, LoginData, RegisterData } from '@/app/types/user'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  error: string | null
  login: (data: LoginData) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  refreshUser: () => void
}

// Define the API response type
interface AuthResponse {
  token: string
  userId: string
  user?: User
  expiresIn?: number
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true)
      const currentUser = authService.getCurrentUser()
      const token = authService.getToken()

      if (!currentUser || !token) {
        setUser(null)
        return
      }

      // Verify token is still valid
      if (authService.isTokenExpired(token)) {
        authService.clearAuthData()
        setUser(null)
        return
      }

      setUser(currentUser)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication check failed')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (data: LoginData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.login(data)
      const authData = response.data as AuthResponse
      
      // Create a proper auth response object
      const loginResponse = {
        token: authData.token,
        userId: authData.userId,
        user: authData.user || { 
          id: authData.userId, 
          email: data.email,
          firstName: '',
          lastName: '',
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          emailVerified: false,
          phoneVerified: false
        },
        expiresIn: authData.expiresIn || 3600
      }
      
      authService.setAuthData(loginResponse)
      setUser(loginResponse.user)
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.register(data)
      const authData = response.data as AuthResponse
      
      // Create a proper auth response object
      const registerResponse = {
        token: authData.token,
        userId: authData.userId,
        user: authData.user || { 
          id: authData.userId, 
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          emailVerified: false,
          phoneVerified: false
        },
        expiresIn: authData.expiresIn || 3600
      }
      
      authService.setAuthData(registerResponse)
      setUser(registerResponse.user)
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.clearAuthData()
    setUser(null)
    router.push('/login')
  }, [router])

  const refreshUser = useCallback(async () => {
    try {
      const response = await apiClient.getCurrentUser()
      setUser(response.data as User)
    } catch {
      logout()
    }
  }, [logout])

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Redirect if not authenticated on protected routes
  useEffect(() => {
    if (!loading && !user && pathname?.startsWith('/dashboard')) {
      router.push('/login')
    }
  }, [loading, user, pathname, router])

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    refreshUser
  }
}

// Hook for protected routes
export function useRequireAuth(redirectTo: string = '/login') {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  return { user, loading }
}

// Hook for admin routes
export function useRequireAdmin(redirectTo: string = '/') {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user?.role !== 'admin') {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  return { user, loading }
}

// Hook for social login
export function useSocialLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSocialLogin = useCallback(async (provider: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // This would integrate with your social login provider
      // For now, simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : `${provider} login failed`)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    handleSocialLogin
  }
}