import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Clock, Shield, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDestinationBySlug, destinations } from "@/lib/destinations-data"

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)
  
  if (!destination) {
    return { title: "Destination Not Found" }
  }

  return {
    title: `${destination.title} | Chronos Luxe`,
    description: destination.description,
  }
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  const safetyLabels = {
    low: { label: "Low Risk", color: "text-green-400", bg: "bg-green-400/10" },
    medium: { label: "Medium Risk", color: "text-yellow-400", bg: "bg-yellow-400/10" },
    high: { label: "High Risk", color: "text-red-400", bg: "bg-red-400/10" },
  }

  const safety = safetyLabels[destination.safetyRating]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            asChild
            variant="outline"
            className="glass-premium border-foreground/20 text-foreground hover:bg-foreground/10 bg-transparent"
          >
            <Link href="/#destinations">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
            </Link>
          </Button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <span className="inline-block text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              {destination.subtitle}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-shimmer">
              {destination.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-foreground/70">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{destination.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{destination.duration}</span>
              </div>
              <div className={`flex items-center gap-2 ${safety.bg} px-3 py-1 rounded-full`}>
                <Shield className={`w-4 h-4 ${safety.color}`} />
                <span className={safety.color}>{safety.label}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">
                  About This Journey
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  {destination.longDescription || destination.description}
                </p>
              </div>

              {/* Highlights */}
              {destination.highlights && (
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">
                    Experience Highlights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 glass-premium rounded-xl p-4"
                      >
                        <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included */}
              {destination.included && (
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">
                    {"What's Included"}
                  </h2>
                  <div className="glass-premium rounded-2xl p-6">
                    <ul className="space-y-3">
                      {destination.included.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-foreground/80">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass-premium rounded-3xl p-8">
                <div className="text-center mb-6">
                  <span className="text-foreground/50 text-sm">Starting at</span>
                  <p className="font-serif text-4xl font-bold text-shimmer">
                    {destination.price}
                  </p>
                  <span className="text-foreground/50 text-sm">per traveler</span>
                </div>

                <div className="divider-gold mb-6" />

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Duration</span>
                    <span className="text-foreground font-medium">{destination.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Era</span>
                    <span className="text-foreground font-medium">{destination.era}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Availability</span>
                    <span className="text-foreground font-medium capitalize">
                      {destination.availability.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full btn-glow bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-[0.1em] text-sm py-6 font-semibold mb-4"
                >
                  Book This Journey
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-foreground/20 text-foreground hover:bg-foreground/10 uppercase tracking-[0.1em] text-sm py-6 bg-transparent"
                >
                  Request Custom Quote
                </Button>

                <p className="text-center text-foreground/40 text-xs mt-6">
                  Free cancellation up to 30 days before departure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
