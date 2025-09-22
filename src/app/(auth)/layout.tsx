'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/hooks/useAuth'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-airline-red-50 to-airline-red-100">
      <div className="absolute inset-0 bg-[url('/images/backgrounds/auth-pattern.svg')] bg-repeat opacity-10"></div>
      
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-airline-red-600 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-airline-red-800">SkyJet Airlines</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-airline-red-800 text-sm">
            © {new Date().getFullYear()} SkyJet Airlines. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}