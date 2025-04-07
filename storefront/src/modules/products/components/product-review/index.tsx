"use client"

import React, { useState } from "react"
import { Star } from "@medusajs/icons"
import { Button, clx } from "@medusajs/ui"
import ReviewDialog from "./review-dialog"

type Review = {
    id: string
    rating: number
    title: string
    content: string
    customer: {
        name: string
        verified: boolean
    }
    date: string
    media?: string[]
}

// Added more mock reviews for testing pagination
const MOCK_REVIEWS: Review[] = [
    {
        id: "1",
        rating: 4,
        title: "kulit moist",
        content: "kulit yang kering makin moist...tiny bump makin kurang",
        customer: {
            name: "SUZANA ISMAIL",
            verified: true
        },
        date: "12/03/2025"
    },
    {
        id: "2",
        rating: 5,
        title: "Perfect for my skin",
        content: "I've been using this product for a month now and I can see the difference. My skin feels so smooth and hydrated.",
        customer: {
            name: "MARIA AHMAD",
            verified: true
        },
        date: "10/02/2025"
    },
    {
        id: "3",
        rating: 3,
        title: "Good but not great",
        content: "It works well but I expected better results for the price. Still using it though.",
        customer: {
            name: "JOHN LEE",
            verified: false
        },
        date: "05/02/2025"
    },
    {
        id: "4",
        rating: 5,
        title: "Absolutely worth it!",
        content: "This is the best skincare product I've ever used. Can't recommend it enough!",
        customer: {
            name: "LISA WONG",
            verified: true
        },
        date: "28/01/2025"
    },
    {
        id: "5",
        rating: 4,
        title: "Great for sensitive skin",
        content: "I have very sensitive skin and this product works perfectly without any irritation.",
        customer: {
            name: "DAVID TAN",
            verified: true
        },
        date: "15/01/2025"
    }
]

const ProductReview = () => {
    const [activeTab, setActiveTab] = useState("reviews")
    const [sortOption, setSortOption] = useState<string>("recent")
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS)
    const [currentPage, setCurrentPage] = useState(1)
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
    const reviewsPerPage = 2
    
    // Calculate average rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

    // Calculate rating distribution
    const ratingCounts = reviews.reduce((acc, review) => {
        acc[review.rating - 1]++;
        return acc;
    }, [0, 0, 0, 0, 0]);

    const renderStars = (rating: number, size = "md") => {
        return (
            <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                    <Star 
                        key={i} 
                        className={`${i < rating ? "text-[#967b4f] fill-current" : "text-gray-200"} 
                        ${size === "lg" ? "w-7 h-7" : size === "md" ? "w-5 h-5" : "w-4 h-4"}`}
                    />
                ))}
            </div>
        )
    }

    const renderRatingBars = () => {
        const ratings = [
            { stars: 5, count: ratingCounts[4] },
            { stars: 4, count: ratingCounts[3] },
            { stars: 3, count: ratingCounts[2] },
            { stars: 2, count: ratingCounts[1] },
            { stars: 1, count: ratingCounts[0] }
        ]

        return (
            <div className="space-y-3 mb-8">
                {ratings.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                        <div className="flex items-center w-20">
                            <span className="text-sm font-medium mr-2">{rating.stars}</span>
                            {renderStars(rating.stars, "sm")}
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div 
                                className="bg-[#967b4f] h-3 rounded-full transition-all duration-300" 
                                style={{ width: `${rating.count > 0 ? (rating.count / reviews.length) * 100 : 0}%` }}
                            ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-8 text-right">{rating.count}</span>
                    </div>
                ))}
            </div>
        )
    }

    // Pagination logic
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const handleReviewSubmit = (reviewData: {
        rating: number;
        title: string;
        content: string;
        name: string;
        email: string;
        media?: File[];
    }) => {
        // In a real application, you would send this data to your API
        // For demo purposes, we'll just add it to our local state
        
        const newReview: Review = {
            id: (reviews.length + 1).toString(),
            rating: reviewData.rating,
            title: reviewData.title,
            content: reviewData.content,
            customer: {
                name: reviewData.name,
                verified: false // New users would need verification in a real system
            },
            date: new Date().toLocaleDateString(),
            media: reviewData.media ? reviewData.media.map(file => URL.createObjectURL(file)) : undefined
        };
        
        setReviews([newReview, ...reviews]);
        setCurrentPage(1); // Go back to first page to see new review
    };
    
    return (
        <div className="content-container py-6" id="reviews">
            {/* Tab Navigation with filter in same row */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={clx(
                                "pb-4 font-bold text-lg border-b-2 -mb-px",
                                activeTab === "reviews"
                                    ? "border-amber-500 text-black"
                                    : "border-transparent text-gray-400 hover:text-gray-500"
                            )}
                        >
                            CUSTOMER REVIEWS
                        </button>
                    </div>
                    
                    {/* Filter moved to the same row as tab */}
                    <div className="relative">
                        <select 
                            value={sortOption} 
                            onChange={(e) => setSortOption(e.target.value)}
                            className="appearance-none bg-white py-2 px-5 pr-10 rounded-lg text-sm font-medium focus:outline-none hover:bg-gray-50 transition-all"
                        >
                            <option value="recent">Most Recent</option>
                            <option value="highest">Highest Rated</option>
                            <option value="lowest">Lowest Rated</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Rating summary card */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                        {/* Rating header */}
                        <div className="bg-[#967b4f]/5 p-5 border-b border-gray-100">
                            <h3 className="font-semibold text-lg text-gray-900">Rating Summary</h3>
                        </div>
                        
                        {/* Rating content */}
                        <div className="p-6">
                            <div className="flex flex-col items-center mb-6 bg-[#967b4f]/5 p-5 rounded-lg">
                                <div className="text-5xl font-bold text-[#967b4f]">{averageRating.toFixed(1)}</div>
                                <div className="mt-3 mb-2">{renderStars(averageRating, "lg")}</div>
                                <div className="text-sm text-gray-600 font-medium">Based on {reviews.length} reviews</div>
                            </div>
                            
                            <div className="mb-6">
                                {renderRatingBars()}
                            </div>
                            
                            <Button 
                                className="w-full bg-[#967b4f] text-white hover:bg-[#7d6842] py-3.5 rounded-full font-medium text-sm shadow-sm transition-all duration-200 hover:shadow-md"
                                variant="primary"
                                onClick={() => setReviewDialogOpen(true)}
                            >
                                Write a Review
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Reviews list with pagination */}
                <div className="lg:w-2/3">
                    {currentReviews.length > 0 ? (
                        <>
                            {currentReviews.map(review => (
                                <div key={review.id} className="bg-white rounded-lg p-6 mb-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900">{review.title}</h3>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                {renderStars(review.rating)}
                                                <span className="text-sm text-gray-500 ml-1">• {review.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="my-4 text-gray-700 leading-relaxed">{review.content}</p>
                                    
                                    <div className="flex items-center mt-5 pt-5 border-t border-gray-100">
                                        <div className="w-12 h-12 bg-[#967b4f]/10 rounded-full flex items-center justify-center mr-3 text-[#967b4f] font-medium">
                                            {review.customer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{review.customer.name}</div>
                                            {review.customer.verified && (
                                                <div className="inline-flex items-center gap-1 bg-[#967b4f]/10 text-[#967b4f] text-xs font-medium px-2.5 py-1 rounded-full mt-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                                                    </svg>
                                                    Verified Buyer
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-8 space-x-2">
                                    <button 
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1.5 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#967b4f] hover:bg-[#967b4f]/10'}`}
                                        aria-label="Previous page"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium ${
                                                currentPage === page 
                                                    ? 'bg-[#967b4f] text-white' 
                                                    : 'text-gray-700 hover:bg-[#967b4f]/10'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    
                                    <button 
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1.5 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#967b4f] hover:bg-[#967b4f]/10'}`}
                                        aria-label="Next page"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center p-10 bg-gray-50 rounded-lg">
                            <div className="text-gray-500">No reviews yet</div>
                        </div>
                    )}
                </div>
            </div>
            
            <ReviewDialog 
                isOpen={reviewDialogOpen}
                onClose={() => setReviewDialogOpen(false)}
                onSubmit={handleReviewSubmit}
                productName="this product" // You can replace this with actual product name
            />
        </div>
    )
}

export default ProductReview