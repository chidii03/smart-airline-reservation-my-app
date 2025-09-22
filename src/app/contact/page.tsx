// app/contact/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Plane,
  User,
  ArrowRight,
  Star,
  Shield,
  Headphones
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch  {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Friendly customer service team at SkyJet Airlines"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-airline-red-900/80 to-airline-red-600/60"></div>
        
        {/* Animated elements in hero */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-2xl text-white"
          >
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              We are Here to Help
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl opacity-90 mb-8">
              Connect with our dedicated team for any travel inquiries or assistance
            </motion.p>
            
             <motion.div variants={fadeIn} className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Headphones className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">24/7 Support Available</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 -mt-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Clock className="w-6 h-6" />, value: "98%", label: "Response Rate" },
            { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: "Customer Satisfaction" },
            { icon: <Shield className="w-6 h-6" />, value: "24/7", label: "Support Availability" }
          ].map((stat, index) => (
            <Card key={index} className="text-center bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-airline-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-airline-red-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Multiple ways to reach us. Choose what works best for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Phone className="w-8 h-8" />,
              title: "Phone Support",
              content: "+1 (555) 123-4567",
              description: "Available 24/7 for urgent matters",
              color: "bg-blue-100 text-blue-600",
              action: "Call Now"
            },
            {
              icon: <Mail className="w-8 h-8" />,
              title: "Email",
              content: "support@skyjet.com",
              description: "We'll respond within 24 hours",
              color: "bg-green-100 text-green-600",
              action: "Send Email"
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "Headquarters",
              content: "123 Aviation Way, Suite 100 New York, NY 10001",
              description: "Visit our corporate offices",
              color: "bg-purple-100 text-purple-600",
              action: "Get Directions"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-900 font-medium mb-3 leading-relaxed">{item.content}</p>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <Button variant="outline" className="w-full">
                    {item.action} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
              <p className="text-lg text-gray-600">
                Have a question or need assistance? Fill out the form below and our team 
                will get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-airline-red-50 to-airline-red-100 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-airline-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-airline-red-900 mb-2">Response Time</h4>
                      <p className="text-airline-red-700">
                        We typically respond to all inquiries within 24 hours during business days.
                        Emergency requests are prioritized and addressed immediately.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Emergency Support</h4>
                      <p className="text-blue-700">
                        For urgent matters related to ongoing travel, please call our 
                        24/7 support line at <strong>+1 (555) 123-4567</strong>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="SkyJet support team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="font-bold text-lg mb-1">Our Support Team</h3>
                  <p className="text-sm opacity-90">Ready to assist you with any travel needs</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-airline-red-600 to-airline-red-700 text-white py-6">
                <CardTitle className="text-2xl flex items-center">
                  <Send className="w-6 h-6 mr-2" />
                  Contact Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name 
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address 
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject 
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message 
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your inquiry in detail..."
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className=" border  w-full h-12 bg-gradient-to-r from-airline-red-600 to-airline-red-700 hover:from-airline-red-700 hover:to-airline-red-800 text-black bg-red-600"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mt-4"
                    >
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        Thank you for your message! We will get back to you soon.
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4"
                    >
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        Sorry, there was an error sending your message. Please try again.
                      </div>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="bg-gradient-to-r from-airline-red-50 to-airline-red-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Office Hours</h2>
              <p className="text-lg text-gray-600">
                We are available to assist you during these hours
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 border-r border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 text-airline-red-600 mr-2" />
                    Customer Service
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-700">Monday - Friday</span>
                      <span className="font-semibold text-gray-900">6:00 AM - 12:00 AM EST</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-700">Saturday - Sunday</span>
                      <span className="font-semibold text-gray-900">7:00 AM - 11:00 PM EST</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-700">Holidays</span>
                      <span className="font-semibold text-gray-900">8:00 AM - 10:00 PM EST</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 bg-gray-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Headphones className="w-6 h-6 text-airline-red-600 mr-2" />
                    Emergency Support
                  </h3>
                  <div className="space-y-4">
                    <div className="py-3 border-b border-gray-200">
                      <div className="text-gray-700 mb-1">24/7 Support Line</div>
                      <div className="font-semibold text-airline-red-600 text-lg">+1 (555) 123-4567</div>
                    </div>
                    <div className="py-3 border-b border-gray-200">
                      <div className="text-gray-700 mb-1">Emergency Email</div>
                      <div className="font-semibold text-airline-red-600">emergency@skyjet.com</div>
                    </div>
                    <div className="py-3">
                      <div className="text-gray-700 mb-1">Live Chat</div>
                      <div className="font-semibold text-airline-red-600">Available 24/7 on our website</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global Offices */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Offices</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              With offices around the world, we are always close by to assist with your travel needs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: "Seoul",
                country: "South Korea",
                address: "123 Aviation Way, Suite 100\nseoul, NY 10001",
                image: "https://images.pexels.com/photos/2122447/pexels-photo-2122447.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                city: "Macua",
                country:"China",
                address: "456 Sky Avenue\nchina, EC1A 1BB",
                image: "https://images.pexels.com/photos/1707213/pexels-photo-1707213.jpeg"
              },
              {
                city: "Dubia",
                country: "United Arab Emirates",
                address: "789 Flight Street\nShibuya, dubia 150-0043",
                image: "https://media.istockphoto.com/id/1309800198/photo/aerial-skyline-of-downtown-dubai-filled-with-modern-skyscrapers-in-the-uae.jpg?b=1&s=612x612&w=0&k=20&c=YHfInwmGDv1AdX8pYG3F5bHUJT9JhvYdfr_qO2khSFs="
              }
            ].map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={office.image}
                      alt={`${office.city} office`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-xl">{office.city}</h3>
                      <p className="text-sm opacity-90">{office.country}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 whitespace-pre-line">{office.address}</p>
                    <Button variant="link" className="p-0 mt-4 text-airline-red-600 hover:text-airline-red-700">
                      View on map <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}