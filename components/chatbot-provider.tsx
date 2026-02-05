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
    "Bienvenue chez Chronos Luxe. Je suis votre concierge temporel. Dites-moi ce que vous aimez (art, aventure, histoire, nature) et je vous recommande l’époque idéale.",
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
    const trimmed = content.trim()
    if (!trimmed) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    }

    // On crée le nouvel historique tout de suite (pour l'envoyer à l'API)
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setIsLoading(true)

    try {
      // ⚡ Appel à l'API Groq via notre endpoint Next.js
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Format OpenAI-style attendu par la route API
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const errMsg =
          typeof data?.error === "string"
            ? data.error
            : "Erreur côté serveur. Vérifiez la clé GROQ_API_KEY."
        throw new Error(errMsg)
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer || "Désolé, je n’ai pas compris. Pouvez-vous reformuler ?",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)

      const assistantErrorMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "Je rencontre un souci pour répondre (connexion IA). Vérifiez votre clé API et relancez le serveur.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantErrorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

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