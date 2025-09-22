'use client'

import { motion } from 'framer-motion'
import { 
  Plane, 
  Users, 
  Globe, 
  Award, 
  Heart,
  Shield,
  Clock,
  ArrowRight,
  Target,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'

export default function AboutPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
          alt="SkyJet Airlines plane flying over clouds"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-airline-red-900/80 to-airline-red-600/60"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-2xl text-white"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About SkyJet Airlines
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl opacity-90">
              Connecting people and places with excellence, safety, and unparalleled service since 2010
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-airline-red-100 text-airline-red-700 rounded-full px-4 py-2 mb-6">
              <Target className="w-5 h-5 mr-2" />
              <span className="font-medium">Our Mission</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Redefining Air Travel Excellence</h2>
            <p className="text-lg text-gray-600 mb-6">
              To make air travel accessible, enjoyable, and sustainable for everyone. 
              We believe that flying should be an experience filled with comfort, 
              reliability, and exceptional service.
            </p>
            <p className="text-lg text-gray-600">
              With a fleet of modern aircraft and a team of dedicated professionals, 
              we are committed to connecting people across the globe while maintaining 
              the highest standards of safety and environmental responsibility.
            </p>
         </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-airline-red-100 rounded-2xl p-8">
              <Plane className="w-24 h-24 text-airline-red-600 mx-auto" />
            </div>
            
            {/* Floating stats */}
            <motion.div 
              className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-bold text-airline-red-600">15+</div>
              <div className="text-sm text-gray-600">Years of Excellence</div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-bold text-airline-red-600">5M+</div>
              <div className="text-sm text-gray-600">Happy Passengers</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By The Numbers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our journey in numbers showcasing our growth and commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Globe className="w-8 h-8" />, number: "50+", label: "Destinations", delay: 0 },
              { icon: <Plane className="w-8 h-8" />, number: "100+", label: "Aircraft", delay: 0.1 },
              { icon: <Users className="w-8 h-8" />, number: "5M+", label: "Passengers", delay: 0.2 },
              { icon: <Award className="w-8 h-8" />, number: "15+", label: "Awards", delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-airline-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group hover:bg-airline-red-600 transition-colors">
                  <div className="text-airline-red-600 group-hover:text-white transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do and define who we are as a company
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Safety First",
              description: "The safety of our passengers and crew is our highest priority. We invest in the latest technology and training to ensure every flight is secure."
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Customer Care",
              description: "We go above and beyond to ensure every passenger feels valued. Your comfort and satisfaction are at the heart of our service."
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Reliability",
              description: "You can count on us to get you where you need to be, on time. Our operational excellence ensures minimal delays and disruptions."
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-airline-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group hover:bg-airline-red-600 transition-colors">
                    <div className="text-airline-red-600 group-hover:text-white transition-colors">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals leading our airline to new heights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Chief Technical Officer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                bio: "Aviation industry veteran with over 25 years of experience"
              },
              {
                name: "Michael Chen",
                role: "Chief Operations Officer",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                bio: "Expert in airline operations and logistics management"
              },
              {
                name: "Emily Rodriguez",
                role: "Chief Financial Officer",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
                bio: "Financial strategist with expertise in aviation economics"
              },
              {
                name: "David Kim",
                role: "Chief Technology Officer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                bio: "Innovator in aviation technology and digital transformation"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
                <p className="text-airline-red-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Presence Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Presence</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connecting the world with our extensive network of destinations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
          >
            <motion.div 
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="h-full w-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg"
                  alt="World map with flight routes"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-airline-red-900/20 to-transparent"></div>
              
              {/* Animated flight paths */}
              <motion.div 
                className="absolute top-1/4 left-1/4 w-4 h-4 bg-airline-red-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-1/3 right-1/3 w-3 h-3 bg-airline-red-400 rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-airline-red-300 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
      
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Our Global Network</h3>
            <p className="text-gray-600">
              With flights to over 50 destinations across 6 continents, SkyJet Airlines connects 
              travelers to the world&apos;s most exciting cities and beautiful destinations.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { region: "North America", count: "15 destinations", icon: "🇺🇸" },
                { region: "Europe", count: "18 destinations", icon: "🇪🇺" },
                { region: "Asia", count: "12 destinations", icon: "🇯🇵" },
                { region: "Australia", count: "5 destinations", icon: "🇦🇺" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-airline-red-300 transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{item.icon}</span>
                    <div className="font-semibold text-gray-900">{item.region}</div>
                  </div>
                  <div className="text-airline-red-600 font-medium">{item.count}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-4">
              <Button asChild className="bg-gradient-to-r from-airline-red-600 to-airline-red-700 hover:from-airline-red-700 hover:to-airline-red-800">
                <Link href="/flights">
                  Explore All Destinations <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="bg-airline-red-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to Sustainability</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;re dedicated to reducing our environmental impact and promoting sustainable air travel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Carbon Neutral Goals",
                description: "Committed to achieving carbon neutrality by 2040 through fleet modernization and carbon offset programs",
                icon: <Globe className="w-8 h-8" />
              },
              {
                title: "Fuel Efficiency",
                description: "Investing in the most fuel-efficient aircraft and optimizing flight paths to reduce emissions",
                icon: <Shield className="w-8 h-8" />
              },
              {
                title: "Sustainable Practices",
                description: "Implementing waste reduction programs and sustainable sourcing throughout our operations",
                icon: <Heart className="w-8 h-8" />
              },
              
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-airline-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-black">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-airline-red-600 py-16 text-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Fly With Us?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience the difference of flying with an airline that truly cares about your journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/flights"
                className=" bg-red-600 text-airline-red-600 px-8 py-3 rounded-md font-semibold text-white "
              >
                Book a Flight
              </Link>
              <Link
                href="/contact"
                className="border bg-red-600 text-white px-8 py-3 rounded-md font-semibold "
              >
                Contact Us
              </Link>
              <Link
                href="/register"
                className="border bg-red-600 text-white px-8 py-3 rounded-md font-semibold "
              >
                View Special Deals
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}