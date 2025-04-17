import React from 'react';
import Link from 'next/link';

const AffiliateTemplate = () => {
    // Benefits data
    const benefits = [
        { id: 1, title: 'Earn Commission', icon: '💰' },
        { id: 2, title: 'No Registration Fee', icon: '✓' },
        { id: 3, title: 'Zero Modal', icon: '0️⃣' },
        { id: 4, title: 'No Stock Required', icon: '📦' },
        { id: 5, title: 'No Product Posting', icon: '📝' },
        { id: 6, title: 'Top Affiliate Rewards', icon: '🏆' },
        { id: 7, title: 'HQ Marketing Materials', icon: '🎯' },
        { id: 8, title: 'Flexible Hours', icon: '⏰' },
        { id: 9, title: 'Dedicated Support', icon: '🛟' },
        { id: 10, title: 'Monthly Payslip', icon: '💸' },
        { id: 11, title: 'No Recruitment', icon: '👥' },
        { id: 12, title: '', icon: '' }, // Empty for grid alignment
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-20">
            {/* Main heading */}
            <h1 className="text-center text-3xl font-medium text-[#967b4f] mb-16">Why You Should Join Us</h1>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {benefits.map((benefit) => (
                    benefit.title ? (
                        <div
                            key={benefit.id}
                            className="bg-white p-7 rounded-lg flex flex-col items-center justify-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#967b4f] hover:border-opacity-30 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            <p className="text-center text-gray-800 font-medium">
                                {benefit.title}
                            </p>
                        </div>
                    ) : <div key={benefit.id} className="opacity-0"></div>
                ))}
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="https://af.uppromote.com/nuuha-beauty/register" target="_blank" rel="noopener noreferrer">
                    <button className="px-12 py-3.5 bg-[#2b2b2b] text-white text-lg font-medium rounded-md hover:bg-[#404040] hover:shadow-md transition-all duration-300">
                        Register
                    </button>
                </a>
                <a href="https://af.uppromote.com/nuuha-beauty/login" target="_blank" rel="noopener noreferrer">
                    <button className="px-12 py-3.5 bg-white text-[#2b2b2b] text-lg font-medium border-2 border-[#2b2b2b] rounded-md hover:bg-gray-50 hover:shadow-md transition-all duration-300">
                        Login
                    </button>
                </a>
            </div>
        </div>
    );
};

export default AffiliateTemplate;