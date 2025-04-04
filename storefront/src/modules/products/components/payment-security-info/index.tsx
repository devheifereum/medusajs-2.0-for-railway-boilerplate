import Image from "next/image"

const PaymentSecurityInfo = () => {
    return (
        <div>
            <p className="text-sm font-medium mb-2">GUARANTEED SAFE CHECKOUT:</p>
            <Image
                src="https://nuuhabeauty.com/cdn/shop/files/payment_detail_250x_1_250x.jpg?v=1734427969"
                alt="Payment Security Info"
                width={250}
                height={250} />
        </div>
    )
}

export default PaymentSecurityInfo