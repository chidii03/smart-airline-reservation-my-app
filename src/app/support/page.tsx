'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  FileText,
  Video,
  Users,
  Clock,
  Headphones,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState('booking')
  const [] = useState('')

  const faqCategories = {
    booking: [
      {
        question: "How do I book a flight?",
        answer: "You can book a flight through our website, mobile app, or by calling our reservation center. Simply enter your travel details, select your preferred flight, and complete the payment process."
      },
      {
        question: "Can I modify my booking?",
        answer: "Yes, you can modify your booking online up to 24 hours before departure. Some changes may incur fees depending on your fare type. Visit 'Manage Booking' on our website or app to make changes."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit cards, debit cards, PayStack, and bank transfers. All payments are processed securely through our payment partners. Corporate accounts and travel agencies can also arrange special payment terms."
      }
    ],
    checkin: [
      {
        question: "When can I check in for my flight?",
        answer: "Online check-in opens 24 hours before departure and closes 1 hour before domestic flights and 2 hours before international flights. You can check in through our website, mobile app, or at the airport counter."
      },
      {
        question: "What do I need for airport check-in?",
        answer: "Please bring your government-issued ID, boarding pass (digital or printed), and any required travel documents for your destination. For international flights, ensure you have a valid passport and necessary visas."
      }
    ],
    baggage: [
      {
        question: "What is the baggage allowance?",
        answer: "Baggage allowance varies by fare type and route. Generally, economy class includes 1 carry-on and 1 checked bag, while business class includes 2 carry-ons and 2 checked bags. Check your specific fare conditions for details."
      },
      {
        question: "What items are prohibited in baggage?",
        answer: "Prohibited items include explosives, flammable substances, weapons, and certain liquids. Please check our detailed baggage policy for complete information. Lithium batteries and other restricted items have specific guidelines."
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/7709240/pexels-photo-7709240.jpeg?_gl=1*1uoxtv5*_ga*NDUzNDEyNjAuMTc1MTc0OTgzNg..*_ga_8JE65Q40S6*czE3NTgyMTU4NzkkbzE3JGcxJHQxNzU4MjE5NDc3JGo2MCRsMCRoMA.."
          alt="Friendly customer support team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-airline-red-900/80 to-airline-red-600/60"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Support Center
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Get help with your bookings, travel plans, and any questions you may have
            </p>
            
          </motion.div>
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help You?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the best way to get assistance with your travel needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Phone className="w-8 h-8" />,
              title: "Call Support",
              description: "Speak directly with our support agents",
              action: "+1 (555) 123-4567",
              color: "bg-blue-100 text-blue-600",
              details: "Available 24/7 for immediate assistance"
            },
            {
              icon: <Mail className="w-8 h-8" />,
              title: "Email Support",
              description: "Send us a detailed message",
              action: "support@skyjet.com",
              color: "bg-green-100 text-green-600",
              details: "Response within 24 hours"
            },
            {
              icon: <MessageCircle className="w-8 h-8" />,
              title: "Live Chat",
              description: "Instant messaging support",
              action: "Start Chat",
              color: "bg-purple-100 text-purple-600",
              details: "Available 6AM-12AM EST"
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
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="text-airline-red-600 font-semibold text-lg mb-2">{item.action}</div>
                  <p className="text-sm text-gray-500">{item.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions about our services
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {Object.keys(faqCategories).map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category.replace('_', ' ')}
              </Button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqCategories[activeCategory as keyof typeof faqCategories]?.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-0 shadow-lg hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <HelpCircle className="w-5 h-5 text-airline-red-600 mr-2" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-lg text-gray-600">
              Explore our comprehensive travel resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Travel Guides",
                description: "Comprehensive destination guides",
                link: "/travel-guides"
              },
              {
                icon: <Video className="w-8 h-8" />,
                title: "Video Tutorials",
                description: "Step-by-step booking guides",
                link: "/tutorials"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Forum",
                description: "Connect with other travelers",
                link: "/forum"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Travel Alerts",
                description: "Real-time flight status updates",
                link: "/alerts"
              }
            ].map((resource, index) => (
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
                    <div className="w-16 h-16 bg-airline-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-airline-red-600">
                        {resource.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Button variant="link" className="text-airline-red-600 hover:text-airline-red-700 p-0">
                      Explore <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mt-16 bg-red-50 rounded-2xl p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-4">Emergency Support</h2>
            <p className="text-red-700 mb-6">
              For urgent matters related to ongoing travel, missed flights, or emergencies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-2xl font-bold text-red-900">+1 (555) 911-HELP</div>
              <span className="text-red-400 hidden sm:block">•</span>
              <div className="text-red-900">Available 24/7</div>
              <span className="text-red-400 hidden sm:block">•</span>
              <div className="text-red-900">emergency@skyjet.com</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}