import { motion } from 'framer-motion'
import { Users, MapPin, Plane, Star } from 'lucide-react'

export default function StatsSection() {
  const stats = [
    { value: '500K+', label: 'Happy Passengers', icon: <Users className="w-6 h-6" /> },
    { value: '200+', label: 'Destinations', icon: <MapPin className="w-6 h-6" /> },
    { value: '50+', label: 'Aircrafts', icon: <Plane className="w-6 h-6" /> },
    { value: '98%', label: 'Satisfaction Rate', icon: <Star className="w-6 h-6" /> }
  ]

  return (
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
  )
}