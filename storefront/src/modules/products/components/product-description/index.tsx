"use client"

import { useState } from "react"
import { clx } from "@medusajs/ui"
import Image from "next/image"

const ProductDescription = () => {
    const [activeTab, setActiveTab] = useState("description")
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")

    const images = [
        "/images/Acne_relief_set.jpg",
        "/images/Brightening_Set.jpg",
        "/images/Nuuha_Full_Set.jpg"
    ]

    const nextImage = () => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setSlideDirection("right")
        setActiveImageIndex((prev) => (prev + 1) % images.length)
        setTimeout(() => setIsTransitioning(false), 500)
    }

    const prevImage = () => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setSlideDirection("left")
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
        setTimeout(() => setIsTransitioning(false), 500)
    }

    return (
        <div className="content-container py-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-4">
                <div className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab("description")}
                        className={clx(
                            "pb-4 font-bold text-lg border-b-2 -mb-px",
                            activeTab === "description"
                                ? "border-amber-500 text-black"
                                : "border-transparent text-gray-400 hover:text-gray-500"
                        )}
                    >
                        DESCRIPTION
                    </button>
                </div>
            </div>

            {/* Product Images */}
            <div className="w-full relative">
                {/* Desktop View - Single Image with Navigation */}
                <div className="hidden md:block relative w-full h-[500px] overflow-hidden">
                    <div 
                        className={clx(
                            "absolute inset-0 transition-all duration-500 ease-in-out",
                            isTransitioning 
                                ? slideDirection === "right" 
                                    ? "translate-x-full opacity-0" 
                                    : "-translate-x-full opacity-0"
                                : "translate-x-0 opacity-100"
                        )}
                    >
                        <Image
                            src={images[activeImageIndex]}
                            alt="Product Description"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    {/* Navigation Buttons - Desktop Only */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile View - Scrollable Images */}
                <div className="md:hidden flex flex-col space-y-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-full h-[300px]">
                            <Image
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductDescription
