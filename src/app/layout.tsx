import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/shared/Header'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SkyJet Airlines - Premium Air Travel',
    template: '%s | SkyJet Airlines'
  },
  description: 'Experience world-class air travel with SkyJet Airlines. Book flights to over 200 destinations worldwide with our premium service and competitive prices.',
  keywords: 'flights, airline, travel, booking, tickets, vacation',
  authors: [{ name: 'SkyJet Airlines' }],
  creator: 'SkyJet Airlines',
  publisher: 'SkyJet Airlines',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://skyjet-airlines.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://skyjet-airlines.com',
    siteName: 'SkyJet Airlines',
    title: 'SkyJet Airlines - Premium Air Travel',
    description: 'Experience world-class air travel with SkyJet Airlines.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SkyJet Airlines',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkyJet Airlines - Premium Air Travel',
    description: 'Experience world-class air travel with SkyJet Airlines.',
    images: ['/images/twitter-image.jpg'],
    creator: '@skyjetairlines',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Header />
          {children}
      </body>
    </html>
  )
}