import React from 'react';
import { Text } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#967b4f] text-white">
      <div className="content-container flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row items-start justify-between py-12 sm:py-16">
          {/* Logo and contact info */}
          <div className="flex flex-col gap-y-8">
            <LocalizedClientLink
              href="/"
              className="text-3xl font-light hover:text-white"
            >
              nuuha.
            </LocalizedClientLink>
            
            <div className="flex flex-col gap-y-3 text-sm">
              <div className="flex items-center gap-x-2">
                <span>📞 :</span>
                <a href="tel:+60108617934" className="hover:underline">
                  +60108617934
                </a>
              </div>
              <div className="flex items-center gap-x-2">
                <span>✉️ :</span>
                <a href="mailto:help@nuuhabeauty.com" className="hover:underline">
                  help@nuuhabeauty.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Deliberately empty to match the layout in the image */}
        </div>
        
        {/* Copyright section with border */}
        <div className="flex w-full justify-between items-center border-t border-white/20 py-6">
          <Text className="text-sm">
            ©{new Date().getFullYear()} Nuuha Beauty
          </Text>
          
          {/* Reward button */}
          <button className="flex items-center bg-white bg-opacity-10 text-white px-4 py-2 rounded-full hover:bg-opacity-20 transition-all">
            <span className="mr-2">🎁</span>
            <span>Reward</span>
          </button>
        </div>
      </div>
    </footer>
  );
}