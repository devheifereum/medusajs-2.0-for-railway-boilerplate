"use client"

import { useState } from "react"
import { clx } from "@medusajs/ui"

const ProductPolicy = () => {
    const [activeTab, setActiveTab] = useState("delivery")

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
                <div className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab("delivery")}
                        className={clx(
                            "pb-4 font-bold text-lg border-b-2 -mb-px",
                            activeTab === "delivery"
                                ? "border-amber-500 text-black"
                                : "border-transparent text-gray-400 hover:text-gray-500"
                        )}
                    >
                        DELIVERY POLICY
                    </button>
                    <button
                        onClick={() => setActiveTab("returns")}
                        className={clx(
                            "pb-4 font-bold text-lg border-b-2 -mb-px",
                            activeTab === "returns"
                                ? "border-amber-500 text-black"
                                : "border-transparent text-gray-400 hover:text-gray-500"
                        )}
                    >
                        RETURNS & EXCHANGES POLICY
                    </button>
                </div>
            </div>

            {/* Delivery Policy Content */}
            {activeTab === "delivery" && (
                <div className="space-y-8">
                    <section>
                        <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                        <p className="text-gray-600 mb-2">
                            We will only ship to addresses provided in the billing address or shipment address provided during your purchase. Please ensure correct addresses and a reachable phone number are provided when completing your order. We do not ship to <strong>P.O Boxes (Post-Office Box)</strong>{" "}
                            and only to valid, legitimate shipping addresses.
                        </p>
                        <p className="text-gray-600">
                            We will not be liable in the event an incorrect shipping address is provided and goods are returned to us. All re-delivery of goods to you will be charged for an associated shipping fee, which will be disclosed upon request for a second delivery attempt.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-medium mb-4">Change In Shipping Address</h2>
                        <p className="text-gray-600 mb-2">
                            If you have any request for change of shipping address, please email us or reach us within <strong>12 hours</strong> upon your order submission.
                        </p>
                        <p className="text-gray-600">
                            If a request of change in shipping address is made after{" "}
                            <strong>24 hours</strong> upon order confirmation or after the products have shipped from our warehouse, customers will be responsible for any associated shipping charges.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-medium mb-4">Shipping Time</h2>
                        <p className="text-gray-600">
                            It typically takes between{" "}
                            <strong>2-5 working days (Monday to Friday)</strong> for goods to arrive at your destination. The shipment will be delivered during office hours between{" "}
                            <strong>9:00 am to 5:00 pm weekdays only</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-medium mb-4">Tracking Number</h2>
                        <p className="text-gray-600">
                            Once goods are picked up by our shipping partner, the tracking ID for the package will be available. Any communication is to be via{" "}
                            <strong>email, mobile app, or SMS</strong>.
                        </p>
                    </section>

                    <section>
                        <p className="text-gray-600">
                            For <strong>non-tangible products or services</strong>, confirmation of order and receipt will be communicated via email, mobile app, or SMS. Proof of purchase, invoice, or delivery order will be available.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-medium mb-4">Policy Changes</h2>
                        <p className="text-gray-600">
                            We reserve the right to amend this policy from time to time if deemed necessary, in which no prior notification or approval from the customer is required.
                        </p>
                    </section>
                </div>
            )}

            {/* Returns & Exchanges Policy Content */}
            {activeTab === "returns" && (
                <div className="space-y-6">
                    <section>
                        <h2 className="text-lg font-medium mb-4">Return Policy</h2>
                        <p className="text-gray-600 mb-4">
                            The following are the policies to be eligible for return requests after shipment/receipt of goods:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>All goods sold are non-refundable.</li>
                            <li>
                                Any www.nuuhabeauty.com Online Store product purchased through other retailers is not eligible for this policy and must be in accordance with the respective retailers' returns policy.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-medium mb-4">
                            Goods are eligible for a return if the following apply:
                        </h2>
                        <p className="text-gray-600 mb-2">
                            Incorrect: The item is not the item you ordered. The product item is different from what is indicated on the order summary, or there are missing items inside the packaging.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-medium mb-4">
                            Returned items must meet the following requirements:
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>
                                The item must be shipped back to us within 7 working days upon receipt (as proved by the postal or courier receipt).
                            </li>
                            <li>
                                You must provide proof of purchase (order invoice number and receipt).
                            </li>
                            <li>
                                The item must be in new condition and returned in its original packaging, including any free gifts received with it. All packaging must be unused, unmarked, undamaged, and not defaced in any manner.
                            </li>
                            <li>
                                The item must be returned in the original box (or at least with suitable packaging) to protect the product from damage during return delivery.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-medium mb-4">
                            Change of Order and Cancellation:
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>
                                Change of order and cancellation of an order will not be permitted once payment has been confirmed.
                            </li>
                            <li>
                                Any cancellations due to a change of mind will not be accepted.
                            </li>
                            <li>
                                We reserve the right to reject any cancellation or refund request that is deemed unfit or unreasonable.
                            </li>
                        </ul>
                    </section>
                </div>
            )}
        </div>
    )
}

export default ProductPolicy