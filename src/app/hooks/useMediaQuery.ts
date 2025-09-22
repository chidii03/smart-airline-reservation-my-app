"use client"

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)
    
    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Add listener
    media.addEventListener('change', listener)
    
    // Clean up
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

// Common media query hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}

export function useIsLargeScreen(): boolean {
  return useMediaQuery('(min-width: 1280px)')
}

export function useIsExtraLargeScreen(): boolean {
  return useMediaQuery('(min-width: 1536px)')
}

export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useOrientation(): 'portrait' | 'landscape' {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  return isPortrait ? 'portrait' : 'landscape'
}

export function useTouchDevice(): boolean {
  return useMediaQuery('(hover: none) and (pointer: coarse)')
}

export function useHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: high)')
}

// Hook for responsive values
export function useResponsiveValue<T>(
  values: {
    mobile: T
    tablet?: T
    desktop?: T
    large?: T
    xlarge?: T
  }
): T {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const isLarge = useIsLargeScreen()
  const isXLarge = useIsExtraLargeScreen()

  if (isMobile) return values.mobile
  if (isTablet) return values.tablet || values.mobile
  if (isXLarge) return values.xlarge || values.large || values.desktop || values.tablet || values.mobile
  if (isLarge) return values.large || values.desktop || values.tablet || values.mobile
  if (isDesktop) return values.desktop || values.tablet || values.mobile
  
  return values.mobile
}

// Hook for breakpoint detection
export function useBreakpoint(): string {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const isLarge = useIsLargeScreen()
  const isXLarge = useIsExtraLargeScreen()

  if (isMobile) return 'mobile'
  if (isTablet) return 'tablet'
  if (isXLarge) return 'xlarge'
  if (isLarge) return 'large'
  if (isDesktop) return 'desktop'
  
  return 'unknown'
}

// Hook for responsive styles
export function useResponsiveStyles(styles: {
  mobile: React.CSSProperties
  tablet?: React.CSSProperties
  desktop?: React.CSSProperties
  large?: React.CSSProperties
  xlarge?: React.CSSProperties
}): React.CSSProperties {
  const breakpoint = useBreakpoint()
  
  switch (breakpoint) {
    case 'mobile': return styles.mobile
    case 'tablet': return styles.tablet || styles.mobile
    case 'desktop': return styles.desktop || styles.tablet || styles.mobile
    case 'large': return styles.large || styles.desktop || styles.tablet || styles.mobile
    case 'xlarge': return styles.xlarge || styles.large || styles.desktop || styles.tablet || styles.mobile
    default: return styles.mobile
  }
}

// Hook for device detection
export function useDeviceInfo() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const isTouch = useTouchDevice()
  const prefersDark = usePrefersDarkMode()
  const prefersReducedMotion = usePrefersReducedMotion()
  const orientation = useOrientation()
  const highContrast = useHighContrast()

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    prefersDark,
    prefersReducedMotion,
    orientation,
    highContrast,
    deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
  }
}

export default useMediaQuery