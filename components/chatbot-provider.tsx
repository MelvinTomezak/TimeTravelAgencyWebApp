"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { ChatMessage } from "@/lib/types"

interface ChatbotContextType {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider")
  }
  return context
}

interface ChatbotProviderProps {
  children: ReactNode
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to Chronos Luxe! I'm your temporal travel assistant. How may I help you plan your journey through time today?",
  timestamp: new Date(),
}

export function ChatbotProvider({ children }: ChatbotProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openChat = useCallback(() => setIsOpen(true), [])
  const closeChat = useCallback(() => setIsOpen(false), [])
  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), [])

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Placeholder for AI integration
    // In production, this would call your AI endpoint
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: getPlaceholderResponse(content),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([INITIAL_MESSAGE])
  }, [])

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        isLoading,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}

// Placeholder response generator - replace with actual AI integration
function getPlaceholderResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("destination") || lowerMessage.includes("where")) {
    return "We offer three exclusive destinations: Paris 1889 during the Belle Époque, the Cretaceous period to witness dinosaurs, and Renaissance Florence in 1504. Each journey is meticulously curated for an unforgettable experience. Would you like to learn more about any specific destination?"
  }

  if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
    return "Our journeys start at $45,000 for Paris 1889, $125,000 for the Cretaceous period, and $68,000 for Florence 1504. Prices vary based on duration and group size. Would you like a detailed quote?"
  }

  if (lowerMessage.includes("safe") || lowerMessage.includes("danger")) {
    return "Safety is our top priority. All journeys include personal temporal guides, emergency extraction protocols, and period-appropriate safety equipment. Our Cretaceous tours use state-of-the-art observation pods for complete protection."
  }

  if (lowerMessage.includes("book") || lowerMessage.includes("reserve")) {
    return "To book a journey, please visit our destinations page and select your preferred time period. You can also contact our concierge team directly for personalized assistance with your booking."
  }

  return "Thank you for your interest in Chronos Luxe! I'd be happy to help you learn more about our time travel experiences. You can ask me about our destinations, pricing, safety measures, or booking process."
}
