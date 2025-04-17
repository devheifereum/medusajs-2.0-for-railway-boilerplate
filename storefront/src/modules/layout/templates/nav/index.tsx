import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  // Custom link styles for hover underline effect
  const linkClasses = "hover:text-ui-fg-base relative after:absolute after:w-0 after:h-0.5 after:bg-[#967b4f] after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <header className="relative h-16 mx-auto">
        <nav className="content-container txt-xsmall-plus text-ui-fg-base flex items-center justify-between w-full h-full text-small-regular">
          {/* Left section with navigation links */}
          <div className="flex-1 basis-0 h-full flex items-center gap-x-6">
            <div className="h-full md:hidden">
              <SideMenu regions={regions} />
            </div>
            <div className="hidden md:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className={linkClasses}
                href="/"
                data-testid="nav-home-link"
              >
                Home
              </LocalizedClientLink>
              <LocalizedClientLink
                className={linkClasses}
                href="/store"
                data-testid="nav-shop-link"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                className={linkClasses}
                href="/affiliate"
                data-testid="nav-affiliate-link"
              >
                Affiliate
              </LocalizedClientLink>
              <LocalizedClientLink
                className={linkClasses}
                href="/about-us"
                data-testid="nav-about-link"
              >
                About Us
              </LocalizedClientLink>
              <a
                className={linkClasses}
                href="https://analyze.nuuhabeauty.com/face-analyzer"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="nav-analyzer-link"
              >
                Face Analyzer
              </a>
              <a
                className={linkClasses}
                href="https://analyze.nuuhabeauty.com/product-ingredients"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="nav-ingredients-link"
              >
                Ingredients Checker
              </a>
            </div>
          </div>

          {/* Center logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="hover:text-ui-fg-base"
              data-testid="nav-logo-link"
            >
              <div className="relative flex items-center">
                <Image 
                  src="/images/final-image.jpg"
                  alt="Nuuha Beauty"
                  width={120}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
            </LocalizedClientLink>
          </div>

          {/* Right section with search, cart, menu */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/search"
                scroll={false}
                data-testid="nav-search-link"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </LocalizedClientLink>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2 relative"
                    href="/cart"
                    data-testid="nav-cart-link"
                    aria-label="Cart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                      <circle cx="8" cy="21" r="1"/>
                      <circle cx="19" cy="21" r="1"/>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
              <button 
                className="hover:text-ui-fg-base"
                aria-label="Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}