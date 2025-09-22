
"use client"

import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args)
    }, delay)

    setTimeoutId(newTimeoutId)
  }
}

export function useDebouncedState<T>(
  initialValue: T,
  delay: number
): [T, T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue)
  const debouncedValue = useDebounce(value, delay)

  return [value, debouncedValue, setValue]
}

export function useDebouncedEffect(
  effect: () => void,
  dependencies: unknown[],
  delay: number
) {
  useEffect(() => {
    const handler = setTimeout(effect, delay)
    return () => clearTimeout(handler)
  }, [...dependencies, delay]) // eslint-disable-line react-hooks/exhaustive-deps
}

// Hook for debouncing with immediate callback
export function useDebounceWithFlags<T>(
  value: T,
  
  delay: number
): { debouncedValue: T; isDebouncing: boolean } {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [isDebouncing, setIsDebouncing] = useState(false)

  useEffect(() => {
    setIsDebouncing(true)
    
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      setIsDebouncing(false)
    }, delay)

    return () => {
      clearTimeout(handler)
      setIsDebouncing(false)
    }
  }, [value, delay])

  return { debouncedValue, isDebouncing }
}

// Hook for leading debounce (executes immediately, then debounces)
export function useLeadingDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [isFirstCall, setIsFirstCall] = useState(true)

  return (...args: Parameters<T>) => {
    if (isFirstCall) {
      callback(...args)
      setIsFirstCall(false)
      return
    }

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args)
    }, delay)

    setTimeoutId(newTimeoutId)
  }
}

// Hook for debouncing with cancel capability
export function useCancelableDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): { execute: (...args: Parameters<T>) => void; cancel: () => void } {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const execute = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args)
    }, delay)

    setTimeoutId(newTimeoutId)
  }

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
  }

  return { execute, cancel }
}

export default useDebounce