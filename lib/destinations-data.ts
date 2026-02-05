import type { Destination } from "./types"

export const destinations: Destination[] = [
  {
    id: "1",
    slug: "paris-1889",
    title: "Paris 1889",
    subtitle: "Belle Époque",
    description:
      "Witness the unveiling of the Eiffel Tower during the World's Fair. Stroll along the Seine as artists and intellectuals shape the golden age of French culture.",
    longDescription:
      "Experience the pinnacle of French civilization during the Universal Exposition of 1889. Walk beneath the newly constructed Eiffel Tower, mingle with the artistic elite at Montmartre cafés, and witness the birth of impressionism. Our exclusive temporal access allows you to attend the Tower's grand opening ceremony and explore the fairgrounds showcasing human achievement from around the world.",
    image: "/assets/destinations/paris.png",
    gallery: [
      "/assets/destinations/paris.png",
      "/assets/destinations/paris.png",
      "/assets/destinations/paris.png",
      "/assets/destinations/paris.png",
    ],
    date: "April 1889",
    location: "France",
    era: "Victorian Era",
    duration: "3-7 days",
    price: "From $45,000",
    highlights: [
      "Eiffel Tower opening ceremony",
      "Private tour of the World's Fair",
      "Dinner at Le Grand Véfour",
      "Montmartre artist encounters",
      "Seine River cruise",
    ],
    included: [
      "Period-appropriate attire",
      "Personal temporal guide",
      "Luxury accommodation",
      "All meals and transportation",
      "Commemorative documentation",
    ],
    safetyRating: "low",
    availability: "available",
    featured: true,
  },
  {
    id: "2",
    slug: "cretaceous-65m",
    title: "Cretaceous -65M",
    subtitle: "Age of Dinosaurs",
    description:
      "Walk among the giants of prehistory. Experience Earth's most magnificent creatures in their natural habitat from the safety of our temporal observation pods.",
    longDescription:
      "Journey to Earth's most spectacular era, 65 million years before the present day. From the security of our state-of-the-art temporal observation pods, witness Tyrannosaurus Rex in its natural hunting grounds, observe herds of Triceratops, and marvel at pterosaurs soaring overhead. This is humanity's only opportunity to experience the age of dinosaurs safely and responsibly.",
    image: "/assets/destinations/cretaceous.png",
    gallery: [
      "/assets/destinations/cretaceous.png",
      "/assets/destinations/cretaceous.png",
      "/assets/destinations/cretaceous.png",
      "/assets/destinations/cretaceous.png",
    ],
    date: "65 Million BC",
    location: "Prehistoric Earth",
    era: "Mesozoic Era",
    duration: "1-3 days",
    price: "From $125,000",
    highlights: [
      "T-Rex observation experience",
      "Pterosaur flight formations",
      "Volcanic landscape views",
      "Prehistoric flora exploration",
      "Night sky observation",
    ],
    included: [
      "Advanced observation pod",
      "Paleontologist guide",
      "Emergency temporal extraction",
      "Specialized safety equipment",
      "Documentary footage",
    ],
    safetyRating: "high",
    availability: "limited",
    featured: true,
  },
  {
    id: "3",
    slug: "florence-1504",
    title: "Florence 1504",
    subtitle: "Renaissance",
    description:
      "Stand in Michelangelo's workshop as he unveils David. Immerse yourself in the artistic revolution that transformed Western civilization forever.",
    longDescription:
      "Step into the heart of the Italian Renaissance during its most glorious moment. Witness Michelangelo's David unveiled to the public, attend Leonardo da Vinci's workshop demonstrations, and walk the same streets as Botticelli, Raphael, and the Medici family. Experience the intellectual and artistic fervor that would shape Western civilization for centuries to come.",
    image: "/assets/destinations/florence.png",
    gallery: [
      "/assets/destinations/florence.png",
      "/assets/destinations/florence.png",
      "/assets/destinations/florence.png",
      "/assets/destinations/florence.png",
    ],
    date: "September 1504",
    location: "Italy",
    era: "Renaissance",
    duration: "5-10 days",
    price: "From $68,000",
    highlights: [
      "David unveiling ceremony",
      "Medici Palace reception",
      "Leonardo's workshop visit",
      "Duomo private access",
      "Tuscan countryside tour",
    ],
    included: [
      "Renaissance attire collection",
      "Art historian guide",
      "Palazzo accommodation",
      "Period-authentic cuisine",
      "Artistic souvenirs",
    ],
    safetyRating: "low",
    availability: "available",
    featured: true,
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured)
}

export function getAvailableDestinations(): Destination[] {
  return destinations.filter((d) => d.availability !== "sold-out")
}
