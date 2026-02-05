"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DestinationCard } from "@/components/destination-card"
import { getFeaturedDestinations } from "@/lib/destinations-data"

const featuredDestinations = getFeaturedDestinations()

export function Destinations() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        }
      },
      { threshold: 0.1 }
    )

    const elements = section.querySelectorAll("[data-animate]")
    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="destinations" ref={sectionRef} className="py-28 md:py-40 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span
            data-animate
            className="opacity-0 text-primary uppercase tracking-[0.2em] text-sm font-semibold"
          >
            Featured Destinations
          </span>
          <h2
            data-animate
            className="opacity-0 delay-100 font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-5 mb-4 text-balance"
          >
            Where Will <span className="text-shimmer">Time</span> Take You?
          </h2>
          <div data-animate className="opacity-0 delay-100 divider-gold w-24 mx-auto my-6" />
          <p
            data-animate
            className="opacity-0 delay-200 max-w-2xl mx-auto text-foreground/70 text-lg leading-relaxed font-light"
          >
            Explore our most sought-after temporal destinations. Each journey is
            meticulously curated for an unforgettable experience.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              data-animate
              className={`opacity-0 delay-${(index + 1) * 100}`}
            >
              <DestinationCard destination={destination} priority={index === 0} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div data-animate className="opacity-0 delay-500 text-center mt-20">
          <Button
            asChild
            size="lg"
            className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-[0.15em] text-sm px-12 py-7 font-semibold"
          >
            <Link href="/destinations">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
