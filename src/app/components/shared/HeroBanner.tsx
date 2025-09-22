'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react'
import Link from 'next/link';

export default function HeroBanner() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
            
              const playPromise = videoRef.current.play()

                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        if (error.name === 'AbortError') {
                            console.log('Video play was aborted. This is expected behavior on some browsers.')
                        } else {
                            console.error('Error attempting to play video:', error)
                        }
                    })
                }
            } else {
                videoRef.current.pause()
            }
        }
    }, [isPlaying])

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    muted={isMuted} 
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="\videos\Airline.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Video Controls */}
                <div className="absolute bottom-4 right-4 z-10 flex space-x-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={togglePlay}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={toggleMute}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="container relative z-10 text-center text-white px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                >
                    Premium Air Travel Experience
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                >
                    Discover the world with our luxury flight services. Experience comfort, reliability, and exceptional service at 30,000 feet.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full">
                        <Link href="/flights" passHref>
                            Book Your Flight
                        </Link>
                    </Button>
                    <Button size="lg" className="border-2 border-white text-white hover:bg-white/20 rounded-full">
                        <Link href="/register" passHref>
                            View Special Offers
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-3 bg-white rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    )
}