import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import HeroAds from "@modules/home/components/hero-ads"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>

      <div className="w-full flex justify-center">
        <video
          width="320"
          height="240"
          controls
          className="w-1/2 aspect-video object-cover">
          <source src="/lisa-nuuha.mp4" />
          Your browser does not support the video tagg.
        </video>
      </div>


      <HeroAds />


      <div className="flex flex-col gap-4 items-center w-full mt-12 mb-12">

        <p className="text-2xl font-bold text-center">Be Part of the Nuuha Family</p>

        <div className="flex md:flex-row flex-col items-center gap-8">
          {
            [
              "/images/home/affilate.png",
              "/images/home/job-vacancy.png",
              "/images/home/membership.png",
            ].map((image, index) => (
              <img
                src={image}
                alt="Affiliate"
                key={index}
                className="w-[300px] h-[300px] aspect-square" />
            ))
          }

        </div>

      </div>



    </>
  )
}
