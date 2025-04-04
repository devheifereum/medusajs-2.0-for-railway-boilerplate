const DiscountInformation = () => {
    return (
        <div className="relative bg-[#967b4f] text-white p-4 rounded-md overflow-hidden">
            {/* Left notch */}
            <div className="absolute top-1/2 left-0 w-4 h-8 bg-white rounded-r-full -translate-x-1/2 -translate-y-1/2"></div>

            {/* Right notch */}
            <div className="absolute top-1/2 right-0 w-4 h-8 bg-white rounded-l-full translate-x-1/2 -translate-y-1/2"></div>

            {/* Content */}
            <div className="mb-2.5">
                <div className="font-bold text-base">RM10 OFF</div>
                <div className="text-sm">Enjoy RM10 off with a minimum purchase of RM60 at checkout!</div>
            </div>

            <div className="w-full border-t border-white/20 my-2.5"></div>

            <div className="mb-2.5">
                <div className="font-bold text-base">RM22 OFF</div>
                <div className="text-sm">Enjoy RM22 off with a minimum purchase of RM120 at checkout!</div>
            </div>

            <div className="w-full border-t border-white/20 my-2.5"></div>

            <div>
                <div className="font-bold text-base">RM60 OFF</div>
                <div className="text-sm">Enjoy RM60 off with a minimum purchase of RM300 at checkout!</div>
            </div>
        </div>
    )
}

export default DiscountInformation