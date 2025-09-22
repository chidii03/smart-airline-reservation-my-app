// "use client"

// import { createContext, useContext, useEffect } from 'react'
// import { useTheme } from '@/app/hooks/useTheme'

// interface ThemeContextType {
//   theme: string
//   resolvedTheme: 'light' | 'dark'
//   setTheme: (theme: string) => void
//   toggleTheme: () => void
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const theme = useTheme()

//   return (
//     <ThemeContext.Provider value={theme}>
//       <div className={theme.resolvedTheme}>
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   )
// }

// export function useThemeContext() {
//   const context = useContext(ThemeContext)
//   if (context === undefined) {
//     throw new Error('useThemeContext must be used within a ThemeProvider')
//   }
//   return context
// }