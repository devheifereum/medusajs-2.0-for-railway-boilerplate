import { Text } from "@medusajs/ui"
import Image from "next/image"

const HeroAds = () => {
    return (
        <div className="flex flex-col gap-8 w-full">
            {/* The Gold Standard Section */}
            <div className="w-full ">


                <div className="mx-auto p-4 gap-4 flex flex-col items-center">

                    <img
                        src="/images/home/home-1-web.png"
                        alt="Korean Skincare"
                        className="w-1/2 h-auto aspect-video" />

                    <img
                        src="/images/home/home-2-web.png"
                        alt="Korean Skincare"
                        className="w-1/2 h-auto aspect-video" />

                </div>
            </div>


        </div>
    )
}

export default HeroAds