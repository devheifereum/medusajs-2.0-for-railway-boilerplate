import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div className="flex flex-col">
        {/* Product Image */}
        <div className="relative aspect-square mb-2 sm:mb-3 md:mb-4">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-y-1 sm:gap-y-1.5 md:gap-y-2">
          {/* Title */}
          <Text className="text-sm sm:text-base md:text-base font-medium text-gray-900 line-clamp-2">
            {product.title}
          </Text>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <div className="flex">
              {Array(4).fill(0).map((_, i) => (
                <span key={i} className="text-xs sm:text-sm md:text-base text-amber-400">★</span>
              ))}
              <span className="text-xs sm:text-sm md:text-base text-gray-300">★</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-500">1 REVIEW</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            {cheapestPrice && (
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                <Text className="text-base sm:text-lg md:text-xl font-bold text-[#967b4f]">
                  {cheapestPrice.calculated_price}
                </Text>
                {cheapestPrice.price_type === "sale" && (
                  <Text className="text-xs sm:text-sm line-through text-gray-500">
                    {cheapestPrice.original_price}
                  </Text>
                )}
              </div>
            )}
          </div>

          {/* Sold Count */}
          <Text className="text-xs sm:text-sm text-gray-500">
            5185 sold
          </Text>
        </div>
      </div>
    </LocalizedClientLink>
  )
}