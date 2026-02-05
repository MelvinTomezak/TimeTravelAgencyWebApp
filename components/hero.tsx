"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = section.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Time vortex background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24 pb-32">
        <div
          data-animate
          className="opacity-0 inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-premium mb-10 animate-pulse-glow"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm uppercase tracking-[0.2em] text-foreground/90 font-medium">
            Exclusive Time Journeys
          </span>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>

        <h1
          data-animate
          className="opacity-0 delay-100 font-serif text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[1.1] mb-8 text-balance"
        >
          <span className="text-foreground">Travel Through</span>
          <br />
          <span className="text-shimmer">Time Itself</span>
        </h1>

        <div data-animate className="opacity-0 delay-200 divider-gold w-32 mx-auto mb-8" />

        <p
          data-animate
          className="opacity-0 delay-200 max-w-2xl mx-auto text-lg md:text-xl text-foreground/70 mb-12 leading-relaxed font-light"
        >
          Experience the extraordinary. Journey to history&apos;s most iconic moments
          with unparalleled luxury and sophistication.
        </p>

        <div
          data-animate
          className="opacity-0 delay-300 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Button
            asChild
            size="lg"
            className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-[0.15em] text-sm px-10 py-7 font-semibold"
          >
            <a href="#destinations">Explore Time Destinations</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-foreground/30 text-foreground hover:bg-foreground/10 hover:border-foreground/50 uppercase tracking-[0.15em] text-sm px-10 py-7 bg-transparent transition-all duration-300"
          >
            <a href="#about">Learn More</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div
          data-animate
          className="opacity-0 delay-500 absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-medium">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
