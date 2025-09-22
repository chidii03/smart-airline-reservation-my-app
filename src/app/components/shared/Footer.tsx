import Link from 'next/link'
import { Plane, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'
import Newsletter from './Newsletter'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Newsletter />
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold">SkyJet Airlines</span>
            </Link>
            <p className="text-gray-300">
              Your trusted partner for seamless air travel experiences. 
              Book your next journey with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/flights" className="text-gray-300 hover:text-white transition-colors">Flights</Link></li>
              <li><Link href="/flights/deals" className="text-gray-300 hover:text-white transition-colors">Deals</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/support/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/support/contact" className="text-gray-300 hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/support/cancellation" className="text-gray-300 hover:text-white transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} SkyJet Airlines. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}