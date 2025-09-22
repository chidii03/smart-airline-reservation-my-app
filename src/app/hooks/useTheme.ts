"use client"

import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type Theme = 'light' | 'dark' | 'system'

interface UseThemeReturn {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
  isLight: boolean
}

export function useTheme(): UseThemeReturn {
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const { value: theme, setValue: setTheme } = useLocalStorage<Theme>('theme', 'system')

  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  const updateResolvedTheme = useCallback(() => {
    if (theme === 'system') {
      setResolvedTheme(getSystemTheme())
    } else {
      setResolvedTheme(theme)
    }
  }, [theme, getSystemTheme])

  const toggleTheme = useCallback(() => {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  // Update resolved theme when theme changes
  useEffect(() => {
    updateResolvedTheme()
  }, [theme, updateResolvedTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      updateResolvedTheme()
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, updateResolvedTheme])

  // Apply theme to document
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light'
  }
}

// Hook for theme-aware styles
export function useThemeAwareStyle(lightStyle: string, darkStyle: string): string {
  const { resolvedTheme } = useTheme()
  return resolvedTheme === 'dark' ? darkStyle : lightStyle
}

// Hook for component that only renders on client
export function useThemeClient() {
  const [isClient, setIsClient] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? theme : { theme: 'light' as Theme, resolvedTheme: 'light' as const, setTheme: () => {}, toggleTheme: () => {}, isDark: false, isLight: true }
}

// Hook for theme toggle with animation
export function useThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleWithAnimation = useCallback(() => {
    setIsAnimating(true)
    toggleTheme()
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }, [toggleTheme])

  return {
    theme,
    isDark,
    toggleTheme: toggleWithAnimation,
    isAnimating
  }
}

// Hook for theme context provider
export function useThemeProvider() {
  const theme = useTheme()
  
  const getThemeClass = useCallback((className: string) => {
    return `${className} ${theme.resolvedTheme}`
  }, [theme.resolvedTheme])

  const getThemeStyle = useCallback((lightStyle: React.CSSProperties, darkStyle: React.CSSProperties) => {
    return theme.resolvedTheme === 'dark' ? darkStyle : lightStyle
  }, [theme.resolvedTheme])

  return {
    ...theme,
    getThemeClass,
    getThemeStyle
  }
}

export default useTheme