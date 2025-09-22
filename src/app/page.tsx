'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';
import {
  Plane,
  Shield,
  Clock,
  HeadphonesIcon,
  Globe,
  Award,
  Users,
  Star,
  MapPin,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  User,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react'

// Components
import SearchForm from '@/app/components/shared/SearchForm'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import TestimonialSlider from '@/app/components/shared/TestimonialSlider'
import HeroBanner from './components/shared/HeroBanner'
import ThemeToggle from './components/shared/ThemeToggle'
import Partners from './components/shared/Partners';
import Header from './components/shared/Header';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [currentDeal, setCurrentDeal] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const currentYear = new Date().getFullYear() // Define currentYear

  useEffect(() => {
    setIsMounted(true)

    // Auto-rotate deals
    const dealInterval = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % featuredDeals.length)
    }, 5000)

    return () => clearInterval(dealInterval)
  }, [])

  useEffect(() => {
    // Play video muted when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked in some browsers
        console.log("Video autoplay was prevented")
      })
    }
  }, [])

  // NEW: Add a scroll lock to the body when the mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset body style when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navigationItems = [
  { href: '/dashboard', label: 'Dashboard'},
  { href: '/booking', label: 'Booking' },
  { href: '/flights', label: 'Flights' },
  { href: '/flights/deals', label: 'Deals' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/support', label: 'Support' },
]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com' },
  ]

  const features = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Global Destinations",
      description: "Fly to over 200 destinations worldwide with our extensive network",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Your safety is our priority with industry-leading security measures",
      gradient: "from-green-500 to-green-700"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "On-time Performance",
      description: "90%+ on-time arrival rate with real-time flight tracking",
      gradient: "from-purple-500 to-purple-700"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service for all your travel needs",
      gradient: "from-orange-500 to-orange-700"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Coverage",
      description: "Comprehensive network covering all major continents and cities",
      gradient: "from-red-500 to-red-700"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award Winning",
      description: "Recognized as the best airline for customer satisfaction",
      gradient: "from-indigo-500 to-indigo-700"
    }
  ]

  const stats = [
    { value: '500K+', label: 'Happy Passengers', icon: <Users className="w-6 h-6" /> },
    { value: '200+', label: 'Destinations', icon: <MapPin className="w-6 h-6" /> },
    { value: '50+', label: 'Aircrafts', icon: <Plane className="w-6 h-6" /> },
    { value: '98%', label: 'Satisfaction Rate', icon: <Star className="w-6 h-6" /> }
  ]

  const featuredDeals = [
    {
      id: 1,
      title: "Summer Escape",
      description: "Enjoy the sunny beaches with up to 40% off on tropical destinations",
      price: "$299",
      originalPrice: "$499",
      route: "New York to Bali",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      badge: "Popular"
    },
    {
      id: 2,
      title: "European Adventure",
      description: "Explore historic cities with our special European packages",
      price: "$459",
      originalPrice: "$699",
      route: "Dubai to Singapore",
      image: "https://images.pexels.com/photos/6980283/pexels-photo-6980283.jpeg?_gl=1*120zws1*_ga*NDUzNDEyNjAuMTc1MTc0OTgzNg..*_ga_8JE65Q40S6*czE3NTgxMjQ5MTgkbzE2JGcxJHQxNzU4MTI1MTE2JGo2MCRsMCRoMA..",
      badge: "Limited Time"
    },
    {
      id: 3,
      title: "Business Class Upgrade",
      description: "Experience luxury travel,30% off business class upgrades",
      price: "From $799",
      originalPrice: "$1149",
      route: "All International Flights",
      image: "https://images.pexels.com/photos/3846629/pexels-photo-3846629.jpeg?_gl=1*ky7mck*_ga*NDUzNDEyNjAuMTc1MTc0OTgzNg..*_ga_8JE65Q40S6*czE3NTgxMjQ5MTgkbzE2JGcxJHQxNzU4MTI0OTk0JGo1OSRsMCRoMA..",
      badge: "Premium"
    },
    {
    id: 4,
    title: "Tropical Getaway",
    description: "Relax on the white sand beaches with 50% off all-inclusive resorts",
    price: "$599",
    originalPrice: "$1200",
    route: "Los Angeles to Maldives",
    image: "https://images.pexels.com/photos/4603884/pexels-photo-4603884.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Exclusive"
  },
  {
    id: 5,
    title: "Asian Exploration",
    description: "Embark on a journey through the heart of Asia with discounts up to 30%",
    price: "$399",
    originalPrice: "$599",
    route: "Hong Kong to Tokyo",
    image: "https://images.pexels.com/photos/31013239/pexels-photo-31013239.jpeg?_gl=1*fcfjqy*_ga*NDUzNDEyNjAuMTc1MTc0OTgzNg..*_ga_8JE65Q40S6*czE3NTgyODQxMTYkbzIxJGcxJHQxNzU4Mjg0ODI1JGo2MCRsMCRoMA..",
    badge: "Hot Deal"
  },
  {
    id: 6,
    title: "Caribbean Breeze",
    description: "All-inclusive resort packages with 60% off in the Caribbean",
    price: "$799",
    originalPrice: "$1500",
    route: "Miami to Bahamas",
    image: "https://media.istockphoto.com/id/637492262/photo/saint-barths-skyline.webp?a=1&b=1&s=612x612&w=0&k=20&c=V3V7BOIaMxeZI6WUNFFG7zF2rOxkW-DJ-yViWkg9s0g=",
    badge: "Best Value"
  },
  {
    id: 7,
    title: "Luxury Cruise",
    description: "Set sail on a luxurious cruise with up to 40% off your booking",
    price: "$999",
    originalPrice: "$1500",
    route: "Los Angeles to Caribbean",
    image: "https://media.istockphoto.com/id/1400603311/photo/marina-bay-night-skyline-in-dubai-city-uae.webp?a=1&b=1&s=612x612&w=0&k=20&c=q0KJELINiigGc0KsaXxdbdY5Bt4dV65b57gWuyGF4bA=",
    badge: "Featured"
  },
  {
    id: 8,
    title: "Safari Adventure",
    description: "Explore the African wild with discounts on safari tours and hotels",
    price: "$899",
    originalPrice: "$1300",
    route: "Johannesburg to Cape Town",
    image: "https://media.istockphoto.com/id/517702606/photo/life-as-opening.jpg?b=1&s=612x612&w=0&k=20&c=_PCTAdPJgk0YVynAtBfCxA2FLmNGRJjmgHHMG3uNJVA=",
    badge: "Adventure"
  },
  {
    id: 9,
    title: "Winter Wonderland",
    description: "Enjoy a 50% off ski vacations in the Swiss Alps",
    price: "$499",
    originalPrice: "$999",
    route: "Zurich to Geneva",
    image: "https://images.pexels.com/photos/6532668/pexels-photo-6532668.jpeg",
    badge: "Winter"
  },
  {
    id: 10,
    title: "New Zealand Escape",
    description: "Discover breathtaking landscapes",
    price: "$799",
    originalPrice: "$1300",
    route: "Auckland to Wellington",
    image: "https://images.pexels.com/photos/1903694/pexels-photo-1903694.jpeg?_gl=1*96cnn2*_ga*NDUzNDEyNjAuMTc1MTc0OTgzNg..*_ga_8JE65Q40S6*czE3NTgyOTI4MzYkbzIyJGcxJHQxNzU4Mjk1MDAyJGo2MCRsMCRoMA..",
    badge: "Explore"
  }
]

  const popularDestinations = [
    {
      name: "Dubai",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "From $499"
    },
    {
      name: "London",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
      price: "From $599"
    },
    {
      name: "Tokyo",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "From $699"
    },
    {
      name: "New York",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "From $399"
    },
      {
      name: "Paris ",
      image: "https://plus.unsplash.com/premium_photo-1661964003610-2422de390fec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "From $299"
    },
      {
      name: "Sydney",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "From $799"
    },
      {
      name: "Singapore",
      image: "https://plus.unsplash.com/premium_photo-1726863168543-d55ba37271fd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "From $739"
    },

      {
      name: "Rome",
      image: "https://images.unsplash.com/photo-1705605435323-e67bf54c2b7c?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "From $349"
    },
    
  ]
  
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <div>
        {/* Header */}
         <Header />

        {/* Hero Banner with Video */}
        <HeroBanner /> 

        {/* Search Section */}
        <section className="container mx-auto px-4 py-12 -mt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
          >
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                Where would you like to go?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-gray-600"
              >
                Discover your next adventure with our premium flight options
              </motion.p>
            </div>
           <SearchForm onSubmit={function (searchParams: {
              origin: string;
              destination: string;
              departureDate?: string;
              returnDate?: string;
               passengers: string;
    }): void {
           // Handle the form submission here
             console.log('Search params:', searchParams);
           // You can redirect to search results or update state
      }} />
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-red-700 to-red-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-white/10 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
 {/* Featured Deal Carousel */}
   <section className="py-20 bg-white relative overflow-hidden">
     <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
       <div className="container mx-auto px-4">
          <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        Special Offers
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-xl text-gray-600"
      >
        Do not miss out on our exclusive flight deals
      </motion.p>
    </div>
    <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
      <AnimatePresence mode="wait">
        {featuredDeals.map((deal, index) => (
          index === currentDeal && (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div
                className="h-full w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${deal.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="max-w-2xl">
                    {deal.badge && (
                      <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {deal.badge}
                      </span>
                    )}
                    <h3 className="text-3xl font-bold mb-2">{deal.title}</h3>
                    <p className="text-xl mb-4 opacity-90">{deal.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-3xl font-bold">{deal.price}</span>
                      <span className="text-xl line-through opacity-70">{deal.originalPrice}</span>
                    </div>
                    <p className="flex items-center gap-2 mb-6">
                      <MapPin className="w-5 h-5" />
                      <span>{deal.route}</span>
                    </p>
                    {/* Updated "Book Now" button to use Next.js Link */}
                    <Link href="/flights" passHref>
                      <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100">
                        Book Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {featuredDeals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentDeal(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentDeal ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
    <div className="text-center">
      {/* Updated "View All Deals" button to use Next.js Link */}
      <Link href="/flights" passHref>
        <Button
          variant="outline"
          size="lg"
          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
        >
          View All Deals <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </div>
  </div>
</section>

        {/* Popular Destinations */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Popular Destinations
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600"
              >
                Discover our most sought-after travel destinations
              </motion.p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDestinations.map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg group-hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="h-48 relative overflow-hidden">
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${destination.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{destination.name}</h3>
                        <p className="text-sm">{destination.price}</p>
                      </div>
                    </div>
                   <CardContent className="p-4">
                    <Link href="/flights" passHref> 
                      <Button variant="ghost" className="w-full group-hover:text-red-600 transition-colors">
                        Explore Flights <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                     </Link>
                   </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}

        <TestimonialSlider />

        {/* Partners Section */}
            <Partners/>

        {/* Newsletter Section */}
        <section className="bg-gray-100 py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Stay Updated</h2>
                <p className="text-gray-600 mt-2">
                  Subscribe to our newsletter for exclusive deals and travel tips
                </p>
              </div>
              <form className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-4 text-center">
                By subscribing, you agree to our Privacy Policy and consent to receive
                updates from our airline.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-red-700 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Plane className="h-8 w-8 text-red-500" />
                  <span className="text-xl font-bold">SkyJet Airlines</span>
                </div>
                <p className="text-gray-300">
                  Your trusted partner for seamless air travel experiences.
                  Book your next journey with confidence.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Support</h3>
                <ul className="space-y-2">
                  <li><a href="/support" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="/support/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="/support/contact" className="text-gray-300 hover:text-white transition-colors">Contact Support</a></li>
                  <li><a href="/support/cancellation" className="text-gray-300 hover:text-white transition-colors">Cancellation Policy</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-300">
                © {currentYear} SkyJet Airlines. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 md:hidden"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <span className="text-lg font-bold">Navigation</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm font-bold transition-colors hover:text-red-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t">
                <a href="/login" className="block py-2 text-sm font-bold text-red-600">
                  Sign In
                </a>
                <a href="/register" className="block py-2 text-sm font-bold">
                  Create Account
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

