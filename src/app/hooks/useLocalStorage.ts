"use client"

import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize from localStorage
  useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        setIsInitialized(true)
        return
      }

      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
      setIsInitialized(true)
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      setIsInitialized(true)
    }
  }, [key])

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  const clearStorage = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.clear()
      }
      setStoredValue(initialValue)
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }, [initialValue])

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearStorage,
    isInitialized
  }
}

// Hook for storing objects with type safety
export function useLocalStorageObject<T extends object>(key: string, initialValue: T) {
  const { value, setValue, ...rest } = useLocalStorage<T>(key, initialValue)

  const updateValue = useCallback((updates: Partial<T>) => {
    setValue(prev => ({ ...prev, ...updates }))
  }, [setValue])

  return {
    value,
    setValue,
    updateValue,
    ...rest
  }
}

// Hook for storing arrays
export function useLocalStorageArray<T>(key: string, initialValue: T[] = []) {
  const { value, setValue, ...rest } = useLocalStorage<T[]>(key, initialValue)

  const addItem = useCallback((item: T) => {
    setValue(prev => [...prev, item])
  }, [setValue])

  const removeItem = useCallback((index: number) => {
    setValue(prev => prev.filter((_, i) => i !== index))
  }, [setValue])

  const updateItem = useCallback((index: number, item: T) => {
    setValue(prev => prev.map((oldItem, i) => i === index ? item : oldItem))
  }, [setValue])

  const clearItems = useCallback(() => {
    setValue([])
  }, [setValue])

  return {
    value,
    setValue,
    addItem,
    removeItem,
    updateItem,
    clearItems,
    ...rest
  }
}

// Hook for storing with expiration
export function useLocalStorageWithExpiry<T>(key: string, initialValue: T, expiryMs: number) {
  const { value, setValue, ...rest } = useLocalStorage<{ value: T; expiry: number }>(
    key,
    { value: initialValue, expiry: Date.now() + expiryMs }
  )

  const setValueWithExpiry = useCallback((newValue: T) => {
    setValue({
      value: newValue,
      expiry: Date.now() + expiryMs
    })
  }, [setValue, expiryMs])

  const isExpired = Date.now() > value.expiry
  const actualValue = isExpired ? initialValue : value.value

  return {
    value: actualValue,
    setValue: setValueWithExpiry,
    isExpired,
    ...rest
  }
}

// Hook for storing session data (clears when tab closes)
export function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        setIsInitialized(true)
        return
      }

      const item = window.sessionStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
      setIsInitialized(true)
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error)
      setIsInitialized(true)
    }
  }, [key])

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return {
    value: storedValue,
    setValue,
    removeValue,
    isInitialized
  }
}