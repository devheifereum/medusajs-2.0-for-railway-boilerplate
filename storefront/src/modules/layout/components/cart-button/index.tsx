import { notFound } from "next/navigation"
import CartDropdown from "../cart-dropdown"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems
  }

  return cart
}

export default async function CartButton() {
  const cart = await fetchCart()
  
  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <div className="relative h-full flex items-center">
      <div className="relative flex items-center h-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
        {itemCount > 0 && (
          <div className="absolute top-3 -right-2 bg-[#967b4f] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-medium">
            {itemCount}
          </div>
        )}
      </div>
      <CartDropdown cart={cart} />
    </div>
  )
}
