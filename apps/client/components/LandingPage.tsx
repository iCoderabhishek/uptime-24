"use client";
import React from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Footer from "./Footer";
import GitHubStarBanner from "./GithubStarBanner";
import { WorldMap } from "./ui/world-map";
import SolutionSection from "./SolutionSection";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { motion } from "framer-motion";
import FAQ from "./FAQ";

const testimonials = [
  {
    quote:
      "Uptime24 gave me instant insights into my website’s uptime — no more blind spots or guessing games. It's become an essential part of my dev workflow.",
    name: "Ravi Patel",
    title: "Full-Stack Developer @ Codeverse",
  },
  {
    quote:
      "What makes Uptime24 different is the validator network. Knowing my site is being checked from real locations gives me confidence traditional monitors couldn’t offer.",
    name: "Sana Khan",
    title: "Indie Hacker & SaaS Founder",
  },
  {
    quote:
      "We integrated Uptime24 as a lightweight uptime monitor for our internal tools. Setup was minimal and it just works — highly recommended for startups.",
    name: "Abdul Rehman",
    title: "DevOps Engineer @ Startly",
  },
  {
    quote:
      "Finally, an uptime tool that feels modern. The dashboard is clean, the API is simple, and the validator concept is genius.",
    name: "Isha Agarwal",
    title: "Product Engineer @ PixelLab",
  },
  {
    quote:
      "As someone hosting apps on Render and Railway, Uptime24’s pinging system helps avoid cold starts. My apps load faster — users are happier.",
    name: "Nikhil Verma",
    title: "Freelance Developer",
  },
];

export function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white w-full selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <GitHubStarBanner />
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center max-w-4xl mx-auto  ">
          <h1 className=" text-7xl md:text-6xl font-bold mb-6 leading-tight shadow-md shadow-black/50">
            Community-Verified
            <br />
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500
"
            >
              Uptime Monitoring
            </span>
          </h1>

          <p className="text-xl text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto selection:bg-orange-500 selection:text-white">
            Stop relying on single-point monitoring. Uptime24 uses real people
            around the world to verify if your websites are actually accessible
            to your users.
          </p>

          {/* World Map */}
          <div className="mb-12">
            <WorldMap
              dots={[
                {
                  start: {
                    lat: 64.2008,
                    lng: -149.4937,
                  }, // Alaska (Fairbanks)
                  end: {
                    lat: 34.0522,
                    lng: -118.2437,
                  }, // Los Angeles
                },
                {
                  start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                  end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                },
                {
                  start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                  end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 }, // London
                  end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                },
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                },
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                },
              ]}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignInButton mode="modal">
              <button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200">
                Start Monitoring Free
              </button>
            </SignInButton>
            <button
              className="cursor-pointer border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200"
              onClick={() =>
                window.open(
                  "https://github.com/iCoderabhishek/uptime-24.git",
                  "_blank"
                )
              }
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      {/* Problem Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Traditional monitoring isn't enough
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2 text-red-400">
                    Single Point of Failure
                  </h3>
                  <p className="text-gray-300">
                    Most monitoring services check from one location. Your site
                    might be down for users in Asia while showing "up" from a US
                    server.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2 text-red-400">
                    False Positives
                  </h3>
                  <p className="text-gray-300">
                    Automated pings can miss real user issues like broken
                    JavaScript, slow loading times, or regional connectivity
                    problems.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2 text-red-400">
                    No Real Context
                  </h3>
                  <p className="text-gray-300">
                    A 200 status code doesn't mean your users can actually use
                    your site. Real problems go undetected.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-900/20 border border-red-800 rounded-lg">
                  <span className="text-red-400">Traditional Monitor</span>
                  <span className="text-green-400 font-mono">200 OK</span>
                </div>
                <div className="text-center text-gray-400 text-sm">vs</div>
                <div className="space-y-2">
                  {[
                    { location: "User in Tokyo", status: "Timeout" },
                    { location: "User in London", status: "DNS Error" },
                    { location: "User in Sydney", status: "Slow Load" },
                  ].map(({ location, status }) => (
                    <div
                      key={location}
                      className="flex items-center justify-between p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-400 transition duration-300 hover:border-red-500 hover:shadow-md hover:scale-[1.02]"
                    >
                      <span>{location}</span>
                      <span className="font-mono">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Solution Section */}
      <SolutionSection />
      {/* Benefits Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Live Validation Network
              </h3>
              <div className="space-y-4">
                {[
                  {
                    city: "New York, USA",
                    time: "2 seconds ago",
                    status: "✓ Online",
                    bg: "bg-green-900/20",
                    border: "border-green-800",
                    hoverBorder: "hover:border-green-500",
                    text: "text-green-400",
                  },
                  {
                    city: "London, UK",
                    time: "5 seconds ago",
                    status: "✓ Online",
                    bg: "bg-green-900/20",
                    border: "border-green-800",
                    hoverBorder: "hover:border-green-500",
                    text: "text-green-400",
                  },
                  {
                    city: "Tokyo, Japan",
                    time: "8 seconds ago",
                    status: "✓ Online",
                    bg: "bg-green-900/20",
                    border: "border-green-800",
                    hoverBorder: "hover:border-green-500",
                    text: "text-green-400",
                  },
                  {
                    city: "Sydney, Australia",
                    time: "12 seconds ago",
                    status: "⚠ Slow",
                    bg: "bg-orange-900/20",
                    border: "border-orange-800",
                    hoverBorder: "hover:border-orange-500",
                    text: "text-orange-400",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.city}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: i * 0.15,
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={`flex items-center justify-between p-4 ${item.bg} border ${item.border} ${item.hoverBorder} rounded-lg transition duration-300 ease-in-out hover:shadow-md`}
                  >
                    <div>
                      <div className="font-semibold">{item.city}</div>
                      <div className="text-sm text-gray-400">{item.time}</div>
                    </div>
                    <span className={`${item.text} font-mono`}>
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">
                Trust through transparency
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Global Coverage
                  </h3>
                  <p className="text-gray-300">
                    Validators from every continent provide comprehensive
                    coverage of your site's accessibility worldwide.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Real User Experience
                  </h3>
                  <p className="text-gray-300">
                    Get insights into actual loading times, functionality, and
                    user-facing ises that automated tools miss.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Community Driven
                  </h3>
                  <p className="text-gray-300">
                    Built by developers, for developers. Our community ensures
                    accurate, unbiased monitoring results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of developers who trust their monitoring to the
            community.
          </p>
        </div>

        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </section>
      {/* Pricing Section */}
      <section className="border-t border-gray-800 bg-[#0a0a0a] py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-neutral-300">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            No credit card. No trials. Uptime24 is free — forever.
          </p>

          <div className="grid md:grid-cols-1 gap-8 justify-center">
            {/* Free Plan Card */}
            <div className="relative rounded-2xl border border-gray-700  p-8 shadow-xl hover:shadow-2xl transition">
              <span className="absolute top-4 right-4 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Forever Free
              </span>
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Perfect for developers, small teams, and hobby projects.
              </p>
              <div className="text-4xl font-bold mb-6">
                $0{" "}
                <span className="text-lg text-gray-400 font-medium">
                  /month
                </span>
              </div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Monitor your
                  websites
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Community-verified
                  uptime
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Fully decentralized
                </li>

                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 24/7 monitoring
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> No credit card
                  required
                </li>
              </ul>
              <SignInButton mode="modal">
                <button className=" cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-black py-3 rounded-lg font-semibold transition">
                  Start Free Monitoring
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
      {/* CTA Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-12 gap-y-8 text-center">
          <div className="col-span-12">
            <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-900">
              Decentralized. Deterministic. Distributed.
            </h2>
          </div>

          <div className="col-span-12 md:col-start-3 md:col-span-8">
            <p className="text-xl text-neutral-500">
              Uptime monitoring powered by a global validator network.
            </p>
          </div>

          <div className="col-span-12 ">
            <SignInButton mode="modal">
              <button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-black px-10 py-4 rounded-lg font-semibold text-lg sm:text-xl transition-colors duration-200">
                Start monitoring or contribute as a validator.
              </button>
            </SignInButton>
            <p className="text-gray-400 mt-4 text-sm">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
