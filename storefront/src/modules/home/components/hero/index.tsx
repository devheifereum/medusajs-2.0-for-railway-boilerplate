"use client"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import { useEffect, useState } from "react"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Image paths for desktop and mobile
  const desktopImages = [
    "/images/homepage1.jpg",
    "/images/homepage2.jpg",
  ]

  const mobileImages = [
    "/images/homepage1.jpg",
    "/images/homepage2.jpg",
  ]

  // Check if the viewport is mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Auto slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === (isMobile ? mobileImages.length : desktopImages.length) - 1 ? 0 : prevSlide + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isMobile, mobileImages.length, desktopImages.length])

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Use the appropriate image array based on viewport size
  const currentImages = isMobile ? mobileImages : desktopImages

  return (
    <div className="w-full border-b border-ui-border-base relative bg-ui-bg-subtle overflow-hidden"
      style={{ height: isMobile ? "80vh" : "100vh" }}>
      {/* Carousel slides */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {currentImages.map((image, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{ transform: `translateX(${index * 100}%)` }}
          >
            <Image
              className="w-full h-full object-contain md:object-cover"
              src={image}
              alt={`Hero slide ${index + 1}`}
              priority={index === 0}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {currentImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index
              ? "bg-[#967b4f] w-6"
              : "bg-white/50 hover:bg-white/80"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero