import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DestinationCard } from "@/components/destination-card"
import { destinations } from "@/lib/destinations-data"

export const metadata: Metadata = {
  title: "All Destinations | Chronos Luxe",
  description:
    "Explore all available time travel destinations. From ancient civilizations to prehistoric eras, discover your perfect journey through time.",
}

export default function DestinationsPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative">
          {/* Back Button */}
          <Button
            asChild
            variant="outline"
            className="mb-8 border-foreground/20 text-foreground hover:bg-foreground/10 bg-transparent"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
            All Destinations
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-5 mb-4 text-balance">
            Choose Your <span className="text-shimmer">Era</span>
          </h1>
          <div className="divider-gold w-24 my-6" />
          <p className="max-w-2xl text-foreground/70 text-lg leading-relaxed font-light">
            Browse our complete collection of temporal destinations. Each journey offers a unique
            glimpse into history&apos;s most remarkable moments.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                priority={index < 3}
              />
            ))}
          </div>

          {/* Empty State Placeholder */}
          {destinations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-foreground/60 text-lg">
                No destinations available at this time.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
