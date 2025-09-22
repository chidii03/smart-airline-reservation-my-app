'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Partners() {
  const partners = [
   // Airlines
    { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_Logo.svg/2000px-Emirates_Logo.svg.png' },
    { name: 'Southwest', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Southwest_Airlines_Logo.svg/2560px-Southwest_Airlines_Logo.svg.png' },
    { name: 'Aer Lingus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aer_Lingus_Logo.svg/2560px-Aer_Lingus_Logo.svg.png' },
    { name: 'Delta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Delta_logo_2024.svg/2560px-Delta_logo_2024.svg.png' },
    { name: 'United', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/United_Airlines_Logo.svg/2560px-United_Airlines_Logo.svg.png' },
    { name: 'American Airlines', logo: 'https://tse2.mm.bing.net/th/id/OIP.CWQS5uVzC5A5X2iOvtls8wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'British Airways', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/British_Airways_Logo.svg/2560px-British_Airlines_Logo.svg.png' },
    { name: 'Lufthansa', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Lufthansa_Logo_2018.svg/2560px-Lufthansa_Logo_2018.svg.png' },
    { name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png' },
    { name: 'Qantas', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Qantas_Logo_2016.svg/2560px-Qantas_Logo_2016.svg.png' },
    { name: 'Air France', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Air_France_Logo_2023.svg/2560px-Air_France_Logo_2023.svg.png' },
    { name: 'KLM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/KLM_Logo.svg/2560px-KLM_Logo.svg.png' },
    { name: 'Turkish Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Turkish_Airlines_logo_2019.svg/2560px-Turkish_Airlines_logo_2019.svg.png' },
    { name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Qatar_Airways_Logo.svg/300px-Qatar_Airways_Logo.svg.png' },
    { name: 'Etihad', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Etihad_Airways_Logo.svg/2560px-Etihad_Airways_Logo.svg.png' },
    { name: 'Virgin Atlantic', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Virgin_Atlantic_logo.svg/2560px-Virgin_Atlantic_logo.svg.png' },
    { name: 'Air Canada', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Air_Canada_Logo_2017.svg/2560px-Air_Canada_Logo_2017.svg.png' },
    { name: 'Cathay Pacific', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Cathay_Pacific_logo.svg/300px-Cathay_Pacific_logo.svg.png' },
    { name: 'ANA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/All_Nippon_Airways_Logo.svg/2560px-All_Nippon_Airways_Logo.svg.png' },
    { name: 'JAL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Japan_Airlines_logo.svg/2560px-Japan_Airlines_logo.svg.png' },
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png' },
    { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_symbol.svg/2560px-LG_symbol.svg.png' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/814px-Apple_logo_black.svg.png' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png' },
    { name: 'Coca-Cola', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png' },
    { name: 'Pepsi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_2014_logo.svg/2560px-Pepsi_2014_logo.svg.png' },
    { name: 'McDonalds', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png' },
    { name: 'Starbucks', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_2011_logo.svg/1200px-Starbucks_Corporation_2011_logo.svg.png' },
  ]
  const extendedPartners = [...partners, ...partners]

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Our Trusted Partners</h2>
          <p className="text-gray-600 mt-2">Trusted by 287+ million creatives, marketers, and businesses</p>
        </div>

        <div className="relative h-20 w-full overflow-hidden">
          <motion.div
            className="flex absolute left-0 space-x-8"
            animate={{
              x: ['0%', '-50%']
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: '200%' }}
          >
            {extendedPartners.map((partner, index) => (
              <div key={index} className="flex-shrink-0 h-16 w-32 relative">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-all duration-300 "
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}