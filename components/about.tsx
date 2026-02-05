"use client"

import { useEffect, useRef } from "react"
import { Clock, Shield, Star, Compass } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Temporal Precision",
    description: "Our proprietary chronological navigation ensures you arrive at the exact moment you desire.",
  },
  {
    icon: Shield,
    title: "Safety Assured",
    description: "Advanced paradox prevention systems and real-time monitoring keep every journey secure.",
  },
  {
    icon: Star,
    title: "Luxury Experience",
    description: "First-class accommodations and personalized service throughout your temporal voyage.",
  },
  {
    icon: Compass,
    title: "Expert Guides",
    description: "Historian companions fluent in the era&apos;s language and customs accompany every expedition.",
  },
]

export function About() {
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
    <section id="about" ref={sectionRef} className="py-28 md:py-40 relative">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span
            data-animate
            className="opacity-0 text-primary uppercase tracking-[0.2em] text-sm font-semibold"
          >
            About Us
          </span>
          <h2
            data-animate
            className="opacity-0 delay-100 font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-5 mb-4 text-balance"
          >
            Redefining the <span className="text-shimmer">Impossible</span>
          </h2>
          <div data-animate className="opacity-0 delay-100 divider-gold w-24 mx-auto my-6" />
          <p
            data-animate
            className="opacity-0 delay-200 max-w-3xl mx-auto text-foreground/70 text-lg leading-relaxed font-light"
          >
            Founded in 2089, Chronos Luxe pioneered the world&apos;s first commercial time travel
            service. We combine cutting-edge temporal technology with uncompromising luxury
            to offer journeys beyond imagination.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              data-animate
              className={`opacity-0 delay-${(index + 1) * 100} group card-cinematic glass-premium rounded-2xl p-8 text-center`}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3">
                <feature.icon className="w-8 h-8 text-primary transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-4 text-foreground group-hover:text-gold-gradient transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          data-animate
          className="opacity-0 delay-500 mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 glass-premium rounded-3xl p-10 md:p-14"
        >
          {[
            { value: "2,847", label: "Journeys Completed" },
            { value: "156", label: "Time Periods Available" },
            { value: "100%", label: "Safe Return Rate" },
            { value: "98.7%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="font-serif text-4xl md:text-5xl font-bold text-shimmer mb-3 transition-transform duration-300 group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-foreground/50 text-xs uppercase tracking-[0.15em] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
