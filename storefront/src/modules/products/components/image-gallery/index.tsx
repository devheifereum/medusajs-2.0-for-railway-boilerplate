"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!images.length) {
    return null
  }

  // Get the currently selected image
  const selectedImage = images[selectedImageIndex]

  return (
    <div className="flex flex-col gap-y-4">
      {/* Main large image */}
      <div className="relative aspect-square w-full bg-gray-100 rounded-md overflow-hidden">
        {selectedImage?.url && (
          <Image
            src={selectedImage.url}
            priority={true}
            className="absolute inset-0"
            alt="Product image"
            fill
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            style={{
              objectFit: "contain",
            }}
          />
        )}



      </div>

      {/* Thumbnail gallery */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`relative aspect-square overflow-hidden border-2 rounded-md ${selectedImageIndex === index ? "border-amber-600" : "border-transparent"
              }`}
            onClick={() => setSelectedImageIndex(index)}
            aria-label={`View image ${index + 1}`}
          >
            {image.url && (
              <Image
                src={image.url}
                alt={`Product thumbnail ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery