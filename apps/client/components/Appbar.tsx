"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Activity, Globe, BarChart3 } from "lucide-react";
import Image from "next/image";

export default function Appbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-transparent border-b border-gray-800 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="relative p-2 rounded-lg shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Uptime24 Logo"
                  width={50} // increased from 30
                  height={50} // increased from 30
                  className="object-contain"
                  priority // ensures it loads quickly
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Uptime24
              </h1>
              <p className="text-sm text-gray-400 -mt-1">
                Your Distributed Uptime Network
              </p>
            </div>
          </div>

          {/* Navigation Links */}

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <div className="flex items-center space-x-3">
                {/* Sign In always visible */}
                <div className="group">
                  <SignInButton>
                    <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 hover:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-700">
                      Sign In
                    </button>
                  </SignInButton>
                </div>

                {/* Sign Up hidden on small screens */}
                <div className="group hidden sm:block  ">
                  <SignUpButton>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-200 hover:shadow-orange-500/40 hover:scale-105">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-4">
                {/* Status Indicator */}
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gray-900/50 rounded-full border border-gray-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">
                    Online
                  </span>
                </div>

                {/* User Button with Custom Styling */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-1  hover:border-orange-500/50 transition-colors duration-200">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox:
                            "w-8 h-8 rounded-full border-2 border-transparent hover:border-orange-500/50 transition-colors duration-200",
                          userButtonPopoverCard:
                            "bg-gray-900 border-gray-800 shadow-xl shadow-black/50",
                          userButtonPopoverActionButton:
                            "text-gray-300 hover:text-white hover:bg-gray-800",
                          userButtonPopoverActionButtonText: "text-gray-300",
                          userButtonPopoverFooter: "hidden",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
