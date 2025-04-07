import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import ProductPolicy from "./product-policy"
import ProductDescription from "../components/product-description"
import DiscountInformation from "../components/discount-information"
import PaymentSecurityInfo from "../components/payment-security-info"
import ProductReview from "../components/product-review"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Extract product type to determine if we should show benefits
  const isBeautyProduct = product?.type?.value === "beauty" ||
    product?.tags?.some(tag => tag.value === "skincare") ||
    true // Default to showing benefits for all products

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="block w-full relative small:w-1/2">
          <ImageGallery images={product?.images || []} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:w-1/2 small:pl-16 w-full py-8 gap-y-6">
          <div>

            <h1 className="text-2xl font-medium">{product.title}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              {/* <span className="text-gray-500">{product.reviews?.length || 4} REVIEWS</span> */}
              <a href="#reviews" className="text-black underline ml-2">VIEW ALL REVIEWS</a>
            </div>
          </div>

          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>

          {/* Discount information */}
          <DiscountInformation />

          {/* Payment security info */}
          <PaymentSecurityInfo />
        </div>
      </div>

      <ProductDescription />
      
      <div className="content-container">
        <ProductReview />
        <ProductPolicy />
      </div>

      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate