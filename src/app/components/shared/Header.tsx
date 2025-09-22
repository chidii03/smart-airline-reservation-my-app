'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Plane,
  Menu,
  X,
  User,
} from 'lucide-react'

import ThemeToggle from './ThemeToggle'
import { Button } from '@/app/components/ui/button'

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/booking', label: 'Booking' },
  { href: '/flights', label: 'Flights' },
  { href: '/flights/deals', label: 'Deals' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/support', label: 'Support' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use useEffect to handle body scroll lock, which is important for accessibility
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-red-600" />
          <Link href="/" className="text-xl font-bold">
            SkyJet Airline
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-bold transition-colors hover:text-red-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 md:hidden"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <span className="text-lg font-bold">Navigation</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-4 bg-white">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm font-bold transition-colors hover:text-red-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <Link href="/login" className="block py-2 text-sm font-bold text-red-600">
                  Sign In
                </Link>
                <Link href="/register" className="block py-2 text-sm font-bold">
                  Create Account
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}