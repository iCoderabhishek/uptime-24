"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

export default function Appbar() {
  return (
    <div>
      {/* make a nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Uptime24</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <SignedOut>
              <SignInButton />

              <SignUpButton />
            </SignedOut>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </a>
        </div>
      </div>
    </div>
  );
}
