"use client"

import React, { useState, useRef, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Star, Check } from "@medusajs/icons"
import { Button, Input, Textarea, Label, clx } from "@medusajs/ui"

interface ReviewDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (review: {
    rating: number
    title: string
    content: string
    name: string
    email: string
    media?: File[]
  }) => void
  productName?: string
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  productName = "this product"
}) => {
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [media, setMedia] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [formErrors, setFormErrors] = useState<{
    rating?: string
    title?: string
    content?: string
    name?: string
    email?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setMedia([...media, ...newFiles])
      
      // Create preview URLs for the new files
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file))
      setPreviewUrls([...previewUrls, ...newPreviewUrls])
    }
  }

  const removeMedia = (index: number) => {
    const updatedMedia = [...media]
    updatedMedia.splice(index, 1)
    setMedia(updatedMedia)

    // Also remove preview URL and revoke it to free memory
    const urlToRevoke = previewUrls[index]
    const updatedPreviewUrls = [...previewUrls]
    updatedPreviewUrls.splice(index, 1)
    setPreviewUrls(updatedPreviewUrls)
    URL.revokeObjectURL(urlToRevoke)
  }

  const validateStepOne = () => {
    const errors: {
      rating?: string
      title?: string
      content?: string
    } = {}
    
    if (rating === 0) errors.rating = "Please select a rating"
    if (!title.trim()) errors.title = "Title is required"
    if (!content.trim()) errors.content = "Review content is required"
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStepThree = () => {
    const errors: {
      name?: string
      email?: string
    } = {}
    
    if (!name.trim()) errors.name = "Name is required"
    if (!email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email address"
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (validateStepThree()) {
      setIsSubmitting(true)
      
      // Simulate network request
      setTimeout(() => {
        onSubmit({
          rating,
          title,
          content,
          name,
          email,
          media
        })
        
        // Reset form
        setRating(0)
        setTitle("")
        setContent("")
        setName("")
        setEmail("")
        setMedia([])
        setPreviewUrls([])
        setStep(1)
        setIsSubmitting(false)
        onClose()
      }, 800)
    }
  }

  const nextStep = () => {
    if (step === 1) {
      if (validateStepOne()) {
        setStep(step + 1)
      }
    } else {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1: return "Poor"
      case 2: return "Fair"
      case 3: return "Good"
      case 4: return "Very Good"
      case 5: return "Excellent"
      default: return ""
    }
  }

  const renderStars = () => {
    return (
      <div className="flex items-center">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => {
                setRating(value)
                setFormErrors({...formErrors, rating: undefined})
              }}
              className="focus:outline-none transition-transform hover:scale-110"
              aria-label={`Rate ${value} stars out of 5`}
            >
              <Star
                className={`w-8 h-8 ${
                  (hoverRating || rating) >= value
                    ? "text-[#967b4f] fill-current"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        {(hoverRating || rating) > 0 && (
          <span className="text-sm font-medium text-[#967b4f] ml-4">
            {getRatingLabel(hoverRating || rating)}
          </span>
        )}
      </div>
    )
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-white p-0 shadow-xl transition-all">
                {/* Dialog header */}
                <div className="bg-[#967b4f]/5 px-6 py-5 flex items-center justify-between rounded-t-2xl border-b border-gray-200">
                  <Dialog.Title className="text-xl font-bold text-gray-900">
                    {step === 1 && "Write Your Review"}
                    {step === 2 && "Add Media (Optional)"}
                    {step === 3 && "Your Information"}
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm text-gray-500 hover:bg-[#967b4f]/10 hover:text-[#967b4f] hover:border-[#967b4f]/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#967b4f]/20"
                    aria-label="Close dialog"
                  >
                    <span className="text-xl leading-none">&times;</span>
                  </button>
                </div>

                {/* Progress indicator */}
                <div className="w-full px-6 pt-5">
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#967b4f] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                    <span className={clx(step >= 1 ? "text-[#967b4f]" : "")}>Review</span>
                    <span className={clx(step >= 2 ? "text-[#967b4f]" : "")}>Media</span>
                    <span className={clx(step >= 3 ? "text-[#967b4f]" : "")}>Information</span>
                  </div>
                </div>

                {/* Dialog content */}
                <div className="px-6 py-5">
                  {step === 1 && (
                    <>
                      <div className="mb-6">
                        <p className="font-medium text-gray-700 mb-2">How would you rate {productName}?</p>
                        {renderStars()}
                        {formErrors.rating && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.rating}</p>
                        )}
                      </div>

                      <div className="mb-5">
                        <Label htmlFor="review-title" className="mb-1.5 font-medium text-gray-700">
                          Review Title
                        </Label>
                        <Input
                          id="review-title"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value)
                            setFormErrors({...formErrors, title: undefined})
                          }}
                          placeholder="Give your review a title"
                          className={`rounded-lg border focus:border-[#967b4f] focus:ring-[#967b4f]/20 ${
                            formErrors.title ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {formErrors.title && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                        )}
                      </div>

                      <div className="mb-2">
                        <Label htmlFor="review-content" className="mb-1.5 font-medium text-gray-700">
                          Review
                        </Label>
                        <Textarea
                          id="review-content"
                          value={content}
                          onChange={(e) => {
                            setContent(e.target.value)
                            setFormErrors({...formErrors, content: undefined})
                          }}
                          placeholder="Write your comments here"
                          rows={5}
                          className={`resize-none rounded-lg border focus:border-[#967b4f] focus:ring-[#967b4f]/20 ${
                            formErrors.content ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {formErrors.content && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.content}</p>
                        )}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <div className="py-2">
                      <p className="font-medium text-gray-700 mb-3">
                        Add Photos or Videos <span className="text-gray-500 font-normal">(Optional)</span>
                      </p>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleMediaChange}
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                      />
                      
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#967b4f] transition-colors mb-4"
                      >
                        <div className="w-16 h-16 bg-[#967b4f]/10 rounded-full flex items-center justify-center mb-3">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-8 h-8 text-[#967b4f]" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                            />
                          </svg>
                        </div>
                        <p className="text-center text-gray-600 mb-1">
                          <span className="font-medium text-[#967b4f]">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG, GIF or MP4 (max. 10MB)
                        </p>
                      </div>

                      {previewUrls.length > 0 && (
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Selected files:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                            {previewUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                                  {media[index].type.startsWith("image/") ? (
                                    <img 
                                      src={url} 
                                      alt={`Preview ${index}`} 
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeMedia(index)
                                  }}
                                  className="absolute top-1 right-1 flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                                  aria-label="Remove media"
                                >
                                  <span className="text-red-500 text-base leading-none">&times;</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <>
                      <div className="mb-5">
                        <Label htmlFor="reviewer-name" className="mb-1.5 font-medium text-gray-700">
                          Name <span className="text-gray-500 text-sm">(displayed publicly)</span>
                        </Label>
                        <Input
                          id="reviewer-name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value)
                            setFormErrors({...formErrors, name: undefined})
                          }}
                          placeholder="Enter your name (public)"
                          className={`rounded-lg border focus:border-[#967b4f] focus:ring-[#967b4f]/20 ${
                            formErrors.name ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                        )}
                      </div>

                      <div className="mb-5">
                        <Label htmlFor="reviewer-email" className="mb-1.5 font-medium text-gray-700">
                          Email <span className="text-gray-500 text-sm">(private)</span>
                        </Label>
                        <Input
                          id="reviewer-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            setFormErrors({...formErrors, email: undefined})
                          }}
                          placeholder="Enter your email (private)"
                          className={`rounded-lg border focus:border-[#967b4f] focus:ring-[#967b4f]/20 ${
                            formErrors.email ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>

                      <div className="mt-6 bg-[#967b4f]/5 p-4 rounded-lg text-sm text-gray-600">
                        <p className="mb-4">
                          <span className="font-medium text-gray-700">How we use your data:</span> We&apos;ll only contact you about the review you left, and only if necessary.
                        </p>
                        <p>
                          By submitting your review, you agree to our terms, privacy and content policies.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Dialog footer */}
                <div className="flex justify-between items-center px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
                  {step > 1 ? (
                    <Button
                      variant="secondary"
                      onClick={prevStep}
                      className="rounded-lg px-5 py-2.5 hover:bg-[#967b4f]/10 hover:text-[#967b4f] border-gray-200"
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={onClose}
                      className="rounded-lg px-5 py-2.5 hover:bg-[#967b4f]/10 hover:text-[#967b4f] border-gray-200"
                    >
                      Cancel
                    </Button>
                  )}

                  {step < 3 ? (
                    <Button
                      variant="primary"
                      onClick={nextStep}
                      className="rounded-lg px-6 py-2.5 bg-[#967b4f] hover:bg-[#7d6842]"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="rounded-lg px-6 py-2.5 bg-[#967b4f] hover:bg-[#7d6842] min-w-[100px]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-1.5" />
                          Submit Review
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ReviewDialog
