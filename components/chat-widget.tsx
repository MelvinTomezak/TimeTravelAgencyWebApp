"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ChatMessage } from "@/lib/types"

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to Chronos Luxe! I'm your temporal travel assistant. How may I help you plan your journey through time today?",
  timestamp: new Date(),
}

const SUGGESTIONS = [
  "View destinations",
  "Pricing info",
  "Safety measures",
  "Book a trip",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: getResponse(content),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <div
        className={`absolute bottom-20 right-0 w-80 md:w-[400px] glass-premium rounded-3xl overflow-hidden transition-all duration-500 ${
          isOpen ? "opacity-100 visible translate-y-0 scale-100" : "opacity-0 invisible translate-y-4 scale-95"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-5 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-foreground">Chronos Assistant</h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-foreground/60">Always here to help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex-shrink-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-secondary rounded-tl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex-shrink-0 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-tl-none p-4">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            </div>
          )}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 ml-11">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  className="text-xs px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card/50">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-12 h-12 rounded-xl disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
          isOpen
            ? "bg-secondary text-foreground rotate-0"
            : "bg-primary text-primary-foreground hover:shadow-primary/40 hover:shadow-2xl hover:scale-110 animate-pulse-glow"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  )
}

// Placeholder response - replace with actual AI integration
function getResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase()

  if (lower.includes("destination") || lower.includes("where") || lower.includes("view")) {
    return "We offer three exclusive destinations: Paris 1889 during the Belle Époque, the Cretaceous period to witness dinosaurs, and Renaissance Florence in 1504. Each journey is meticulously curated. Would you like details on any specific era?"
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("pricing")) {
    return "Our journeys range from $45,000 for Paris 1889 to $125,000 for the Cretaceous period. Florence 1504 starts at $68,000. All prices include period attire, accommodations, and personal guides. Shall I provide a detailed breakdown?"
  }

  if (lower.includes("safe") || lower.includes("danger") || lower.includes("risk")) {
    return "Safety is paramount at Chronos Luxe. All journeys include emergency temporal extraction, personal guides, and appropriate safety equipment. Our Cretaceous tours use advanced observation pods for complete protection from prehistoric wildlife."
  }

  if (lower.includes("book") || lower.includes("reserve") || lower.includes("trip")) {
    return "To book a journey, visit our destinations page and select your preferred era. You can also request a custom quote for personalized itineraries. Would you like me to guide you through the booking process?"
  }

  return "Thank you for your interest in Chronos Luxe! I can help you explore our destinations, understand pricing, learn about safety measures, or start the booking process. What would you like to know more about?"
}
