import React from 'react';

export default function AboutUs() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="w-full py-20 px-6 md:px-12 lg:px-24 flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-center mb-6">
                    Nuuha Beauty
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl text-center font-light">
                    Where innovative skincare meets timeless beauty. Rooted in Malaysia, crafted in Korea.
                </p>
            </section>

            {/* Mission Statement */}
            <section className="w-full py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-light mb-8">Our Story</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Founded by a doctor and skin scientist from Korea, Nuuha Beauty is built on the philosophy that "beauty is power"—a reflection of confidence, self-expression, and empowerment.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Our mission is to deliver safe, clinically effective, and science-driven solutions for all skin types while staying true to our commitment to innovation and transparency.
                    </p>
                </div>
            </section>

            {/* Philosophy Cards */}
            <section className="w-full py-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-light mb-12 text-center">Our Philosophy</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-xl font-medium mb-4">Safe Formulations</h3>
                            <p className="text-gray-600">
                                Your skin's safety is our priority. Every product is thoughtfully formulated with ingredients approved by the NPRA, carefully balanced within safe concentrations to suit all skin types.
                            </p>
                        </div>

                        <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-xl font-medium mb-4">Clinically Effective Results</h3>
                            <p className="text-gray-600">
                                Efficacy is at the heart of what we do. Powered by advanced research and clinical trials, our chemists incorporate proven active ingredients in every formulation to deliver real, noticeable results.
                            </p>
                        </div>

                        <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-xl font-medium mb-4">Nature Meets Science</h3>
                            <p className="text-gray-600">
                                We believe in the perfect fusion of nature and innovation. By combining natural ingredients with cutting-edge scientific advancements, we create skincare that enhances effectiveness while maintaining a gentle touch.
                            </p>
                        </div>

                        <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-xl font-medium mb-4">Transparent Practices</h3>
                            <p className="text-gray-600">
                                We value your trust. That's why we clearly list every ingredient and its benefits on our packaging and website—because skincare should be as transparent as it is transformative.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Statement */}
            <section className="w-full py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-light mb-8">What We Stand For</h2>
                    <p className="text-gray-700 mb-8 leading-relaxed">
                        At Nuuha Beauty, we embrace the vision of "Beauty with Brains." Behind every product lies a sophisticated laboratory, an expert team of researchers, and the unwavering dedication to creating skincare solutions that empower individuals to feel confident in their own skin.
                    </p>
                    <p className="text-lg text-gray-800 font-medium">
                        Experience the transformative power of science and beauty with Nuuha Beauty—your partner in radiant, empowered skin.
                    </p>
                </div>
            </section>

            {/* Halal Certification Badge */}
            <section className="w-full py-12 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 flex items-center justify-center border border-gray-200 rounded-full">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            Halal
                        </div>
                    </div>
                    <p className="text-gray-600 text-center">
                        Proudly halal-certified, ensuring our products meet the highest standards of purity and quality.
                    </p>
                </div>
            </section>
        </div>
    );
}