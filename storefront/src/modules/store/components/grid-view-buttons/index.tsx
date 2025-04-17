"use client"

import { useState } from "react"
import ProductPreview from "@modules/products/components/product-preview"

export function GridViewButtons({ products, region }: { products: any, region: any }) {
    const [gridView, setGridView] = useState(3) // Default grid is 3 columns

    // Function to handle grid view change
    const handleGridViewChange = (columns: number) => {
        setGridView(columns)
    }

    // Dynamic classNames based on the grid view
    const gridClassNames = {
        2: "grid-cols-2",
        3: "grid-cols-2 medium:grid-cols-3",
        4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    }

    return (
        <div className="w-full">
            {/* Grid View Controls */}
            {/* <div className="flex justify-end items-center mb-4 gap-2">
                <span className="text-sm text-gray-600">View:</span>
                <div className="flex border border-gray-200 rounded overflow-hidden">
                    <button
                        onClick={() => handleGridViewChange(2)}
                        className={`px-3 py-1 text-sm ${gridView === 2 ? 'bg-gray-100 font-medium' : 'bg-white hover:bg-gray-50'}`}
                        aria-label="2 columns grid view"
                    >
                        2
                    </button>
                    <button
                        onClick={() => handleGridViewChange(3)}
                        className={`px-3 py-1 text-sm border-l border-r border-gray-200 ${gridView === 3 ? 'bg-gray-100 font-medium' : 'bg-white hover:bg-gray-50'}`}
                        aria-label="3 columns grid view"
                    >
                        3
                    </button>
                    <button
                        onClick={() => handleGridViewChange(4)}
                        className={`px-3 py-1 text-sm ${gridView === 4 ? 'bg-gray-100 font-medium' : 'bg-white hover:bg-gray-50'}`}
                        aria-label="4 columns grid view"
                    >
                        4
                    </button>
                </div>
            </div> */}

            {/* Products Grid */}
            <ul
                className={`grid ${gridClassNames[gridView as keyof typeof gridClassNames]} w-full gap-x-6 gap-y-8`}
                data-testid="products-list"
            >
                {products.map((p: any) => {
                    return (
                        <li key={p.id}>
                            <ProductPreview product={p} region={region} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}