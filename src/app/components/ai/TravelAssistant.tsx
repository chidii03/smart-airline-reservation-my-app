"use client"

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Bot, User, Send, Plane, Hotel, MapPin, Luggage, Clock, HelpCircle, Calendar, CreditCard } from 'lucide-react'
import { cn } from '@/app/lib/utils'

// Interface for a single message in the chat
interface Message {
  id: number
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
  type?: 'text' | 'suggestion'
  suggestions?: string[]
}

// Interface for the flight data
interface Flight {
  flightNumber: string
  origin: string
  destination: string
  airline: string
  departureTime: string
}

// Interface for the booking data
interface Booking {
  bookingRef: string
  // You can add more specific properties here as needed, e.g., passengerName, seatNumber, etc.
}

// Interface for the component props, now with specific types
interface TravelAssistantProps {
  flight: Flight
  booking: Booking
}

// Map keywords to specific icons for a richer user experience
const iconMap: { [key: string]: React.ElementType } = {
  'baggage': Luggage,
  'check-in': Plane,
  'document': CreditCard,
  'service': HelpCircle,
  'delay': Clock,
  'seat': MapPin,
  'status': Plane,
  'boarding': Calendar,
  'booking': Hotel, // Added a specific icon for booking
}

// Function to determine the appropriate icon based on message text
const getIconForMessage = (message: Message) => {
  if (message.sender === 'user') {
    return User
  }
  const lowerText = message.text.toLowerCase()
  for (const keyword in iconMap) {
    if (lowerText.includes(keyword)) {
      return iconMap[keyword]
    }
  }
  return Bot
}

export default function TravelAssistant({ flight, booking }: TravelAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello! I'm your AI travel assistant for flight ${flight.flightNumber} from ${flight.origin} to ${flight.destination}. How can I help you today?`,
      sender: 'assistant',
      timestamp: new Date(),
      type: 'suggestion',
      suggestions: [
        "What's the baggage policy?",
        "Tell me about in-flight services",
        "What documents do I need?",
        "What's the check-in process?"
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    handleSend(suggestion)
  }

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response with context-aware answers
    setTimeout(() => {
      let responseText = ''
      let suggestions: string[] = []
      const lowerText = messageText.toLowerCase()

      if (lowerText.includes('baggage') || lowerText.includes('luggage')) {
        responseText = `For flight ${flight.flightNumber} with ${flight.airline}, the baggage policy includes:\n\n• Carry-on: 1 piece up to 7kg (15 lbs)\n• Checked baggage: 23kg (50 lbs) included\n• Additional bags: $50 each\n• Maximum dimensions: 158cm (62 inches) total\n\nYou can add extra baggage during online check-in or at the airport.`
        suggestions = ["What about overweight baggage?", "Can I carry sports equipment?", "What are prohibited items?"]
      } else if (lowerText.includes('check-in') || lowerText.includes('boarding')) {
        responseText = `Check-in for your flight:\n\n• Opens: 24 hours before departure\n• Closes: 45 minutes prior to departure\n• Online check-in: Recommended (via app or website)\n• Airport counter: Opens 3 hours before departure\n\nYour flight boards at ${flight.departureTime}. Please be at the gate at least 30 minutes before departure.`
        suggestions = ["When should I arrive at the airport?", "What if I'm running late?", "Special assistance available?"]
      } else if (lowerText.includes('document') || lowerText.includes('passport') || lowerText.includes('visa')) {
        responseText = `For travel to ${flight.destination}, you'll need:\n\n• Valid passport (6+ months validity)\n• Printed or mobile boarding pass\n• Government-issued photo ID\n• Any required visas or travel authorizations\n\nSome destinations may have specific COVID-19 requirements. Check the latest travel advisories.`
        suggestions = ["What about COVID requirements?", "Do I need travel insurance?", "Visa on arrival available?"]
      } else if (lowerText.includes('service') || lowerText.includes('meal') || lowerText.includes('entertainment')) {
        responseText = `Your ${flight.airline} flight offers:\n\n• Complimentary meals and beverages\n• In-flight entertainment system with movies, TV shows, and music\n• WiFi available (purchase required)\n• USB power outlets at each seat\n• Pillows and blankets on request\n\nSpecial meals can be requested 24 hours before departure through our website.`
        suggestions = ["What meal options are available?", "Is there charging available?", "Entertainment options?"]
      } else if (lowerText.includes('delay') || lowerText.includes('status') || lowerText.includes('on time')) {
        responseText = `Your flight ${flight.flightNumber} is currently scheduled to depart on time at ${flight.departureTime} from ${flight.origin}.\n\nI'll monitor for any changes and notify you if there are updates. You can also check real-time status on our website or mobile app.`
        suggestions = ["What if my flight is delayed?", "Compensation for delays?", "How to get updates?"]
      } else if (lowerText.includes('seat') || lowerText.includes('upgrade')) {
        responseText = `Seat information for your flight:\n\n• Your current seat: To be assigned at check-in\n• Seat selection: Available during online check-in\n• Upgrade options: Business class upgrades may be available\n• Extra legroom seats: $50-$100 depending on location\n\nYou can select or change your seat during online check-in.`
        suggestions = ["How to select seats?", "What are upgrade costs?", "Extra legroom options?"]
      } else if (lowerText.includes('booking')) {
        responseText = `Your booking for flight ${flight.flightNumber} is confirmed! Your booking reference is ${booking.bookingRef}.`
        suggestions = ["Can I change my booking?", "How do I add a bag?", "How do I cancel?"]
      } else {
        responseText = "I'm here to help with your travel questions! You can ask me about baggage policies, check-in procedures, flight status, in-flight services, or travel requirements. What would you like to know?"
        suggestions = [
          "Baggage allowance",
          "Check-in process",
          "Flight status",
          "In-flight services"
        ]
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
        type: suggestions.length > 0 ? 'suggestion' : 'text',
        suggestions: suggestions.length > 0 ? suggestions : undefined
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-5 h-5" />
          AI Travel Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {messages.map((message) => {
              const IconComponent = getIconForMessage(message)
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === 'user' && 'flex-row-reverse'
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className={cn(
                      "max-w-xs p-3 rounded-lg",
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-8"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your trip..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Ask about baggage, check-in, flight status, documents, or services for your trip to {flight.destination}.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}