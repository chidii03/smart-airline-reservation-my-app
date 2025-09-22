'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/app/components/ui/card'
import { Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function TestimonialSlider() {
  const testimonials = [
    { name: 'Sarah Johnson', role: 'Frequent Traveler', avatar: 'S', quote: 'SkyJet made my business trips so much easier. The booking process is seamless and their customer service is exceptional.', rating: 5 },
    { name: 'Michael Chen', role: 'Travel Blogger', avatar: 'M', quote: 'I\'ve flown with many airlines, but SkyJet stands out for their attention to detail and comfortable flights.', rating: 5 },
    { name: 'Emily Rodriguez', role: 'Adventure Seeker', avatar: 'E', quote: 'Their deals are incredible! I never thought I could afford to visit so many destinations until I found SkyJet.', rating: 5 },
    { name: 'David Wilson', role: 'Business Executive', avatar: 'D', quote: 'The premium service is worth every penny. SkyJet has become my preferred airline for all international travels.', rating: 5 },
    { name: 'Anna Lee', role: 'Family Traveler', avatar: 'A', quote: 'Perfect for family trips. The staff was so helpful with our kids.', rating: 5 },
    { name: 'Robert Taylor', role: 'Solo Explorer', avatar: 'R', quote: 'Great value for money. Smooth experience from booking to landing.', rating: 5 },
    { name: 'Lisa Kim', role: 'Digital Nomad', avatar: 'L', quote: 'Reliable Wi-Fi on board helps me stay connected while traveling.', rating: 5 },
    { name: 'James Brown', role: 'Retired Traveler', avatar: 'J', quote: 'Comfortable seats and excellent service for long-haul flights.', rating: 5 },
    { name: 'Maria Garcia', role: 'Student', avatar: 'M', quote: 'Affordable student discounts made my study abroad trip possible.', rating: 5 },
    { name: 'Thomas Martinez', role: 'Corporate Traveler', avatar: 'T', quote: 'Efficient business class service with great lounge access.', rating: 5 },
    { name: 'Patricia Hernandez', role: 'Honeymooner', avatar: 'P', quote: 'Romantic destinations with special honeymoon packages.', rating: 5 },
    { name: 'Christopher Lopez', role: 'Adventure Enthusiast', avatar: 'C', quote: 'Easy booking for extreme sports locations worldwide.', rating: 5 },
    { name: 'Barbara Gonzalez', role: 'Food Blogger', avatar: 'B', quote: 'Flights to culinary hotspots with excellent meal options on board.', rating: 5 },
    { name: 'Daniel Wilson', role: 'Photographer', avatar: 'D', quote: 'Great for scenic routes with window seat preferences honored.', rating: 5 },
    { name: 'Susan Moore', role: 'Writer', avatar: 'S', quote: 'Quiet cabins perfect for working during flights.', rating: 5 },
    { name: 'Joseph Taylor', role: 'Musician', avatar: 'J', quote: 'Careful handling of musical instruments as baggage.', rating: 5 },
    { name: 'Linda Anderson', role: 'Teacher', avatar: 'L', quote: 'Educational tours and group bookings made simple.', rating: 5 },
    { name: 'William Thomas', role: 'Engineer', avatar: 'W', quote: 'Reliable service for international conferences.', rating: 5 },
    { name: 'Elizabeth Jackson', role: 'Artist', avatar: 'E', quote: 'Inspiring views from above for creative minds.', rating: 5 },
    { name: 'George White', role: 'Scientist', avatar: 'G', quote: 'Efficient travel to research facilities worldwide.', rating: 5 },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            Hear from travelers who have experienced our premium service
          </motion.p>
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 text-xl font-bold">
                      {testimonial.avatar}
                    </div>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}