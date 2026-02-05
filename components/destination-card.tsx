"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/lib/types"

interface DestinationCardProps {
  destination: Destination
  priority?: boolean
}

export function DestinationCard({ destination, priority = false }: DestinationCardProps) {
  const safetyColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  }

  const availabilityLabels = {
    available: "Available Now",
    limited: "Limited Spots",
    "sold-out": "Sold Out",
  }

  const availabilityColors = {
    available: "bg-primary",
    limited: "bg-yellow-500",
    "sold-out": "bg-red-500",
  }

  // ✅ Force local assets (Projet 1) for the 3 featured destinations
  const getImageSrc = () => {
    const slug = (destination.slug || "").toLowerCase()
    const title = (destination.title || "").toLowerCase()

    if (slug.includes("paris") || title.includes("paris")) {
      return "/assets/destinations/paris.png"
    }
    if (slug.includes("cretaceous") || slug.includes("cretace") || title.includes("cretaceous") || title.includes("crétacé") || title.includes("cretace")) {
      return "/assets/destinations/cretaceous.png"
    }
    if (slug.includes("florence") || title.includes("florence")) {
      return "/assets/destinations/florence.png"
    }

    // fallback: if destination.image exists, use it, otherwise placeholder
    return destination.image || "/placeholder.svg"
  }

  const imageSrc = getImageSrc()

  return (
    <div className="group card-cinematic rounded-3xl overflow-hidden bg-card/80">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={imageSrc}
          alt={destination.title}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover img-zoom"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgEEAgMBAAAAAAAAAAAAAQIDAAQFERIhBhMxQf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADBBEh/9oADAMBAAIRAxEAPwCq8T8gvLjMR2ty8cscqBTcBVZtfVJ0R1v8NUnuJJJGkdizMdkk7JNKVQlrHQCRxM6tdn//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

        {/* Cinematic overlay on hover */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating badge */}
        <div className="absolute top-5 right-5 glass-premium rounded-full px-4 py-1.5 backdrop-blur-lg">
          <span className="text-xs uppercase tracking-[0.15em] text-primary font-semibold">
            {destination.subtitle}
          </span>
        </div>

        {/* Availability indicator */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${availabilityColors[destination.availability]} animate-pulse`} />
          <span className="text-xs uppercase tracking-wider text-foreground/70 font-medium">
            {availabilityLabels[destination.availability]}
          </span>
        </div>

        {/* Safety rating */}
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
          <Shield className={`w-3.5 h-3.5 ${safetyColors[destination.safetyRating]}`} />
          <span className="text-xs text-foreground/60 capitalize">{destination.safetyRating} risk</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-foreground group-hover:text-gold-gradient transition-all duration-300">
          {destination.title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center gap-5 mb-5">
          <div className="flex items-center gap-2 text-foreground/50 text-sm">
            <Calendar className="w-4 h-4 text-primary/70" />
            <span className="font-medium">{destination.date}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/50 text-sm">
            <MapPin className="w-4 h-4 text-primary/70" />
            <span className="font-medium">{destination.location}</span>
          </div>
        </div>

        <p className="text-foreground/60 leading-relaxed mb-5 text-[15px] line-clamp-3">
          {destination.description}
        </p>

        {/* Price */}
        <div className="mb-6">
          <span className="text-sm text-foreground/50">Starting at</span>
          <p className="text-xl font-serif font-bold text-primary">{destination.price}</p>
        </div>

        <Button
          asChild
          className="w-full btn-glow bg-secondary text-foreground border border-foreground/20 hover:bg-primary hover:text-primary-foreground hover:border-primary group/btn uppercase tracking-[0.1em] text-sm py-6 font-semibold"
        >
          <Link href={`/destinations/${destination.slug}`}>
            <span>Discover Journey</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}