import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Destinations } from "@/components/destinations"
import { ChatWidget } from "@/components/chat-widget"
import { Footer } from "@/components/footer"

function DestinationsSkeleton() {
  return (
    <section className="py-28 md:py-40 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-4 w-40 bg-secondary rounded mx-auto mb-5" />
          <div className="h-12 w-96 bg-secondary rounded mx-auto mb-4" />
          <div className="h-1 w-24 bg-secondary rounded mx-auto my-6" />
          <div className="h-6 w-2/3 bg-secondary rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl bg-card/80 overflow-hidden animate-pulse">
              <div className="h-72 bg-secondary" />
              <div className="p-7 space-y-4">
                <div className="h-8 w-2/3 bg-secondary rounded" />
                <div className="h-4 w-1/2 bg-secondary rounded" />
                <div className="h-20 bg-secondary rounded" />
                <div className="h-12 bg-secondary rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Suspense fallback={<DestinationsSkeleton />}>
        <Destinations />
      </Suspense>
      <Footer />
      <ChatWidget />
    </main>
  )
}
