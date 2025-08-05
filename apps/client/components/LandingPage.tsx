"use client";
import React from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Community-Verified
            <br />
            <span className="text-orange-500">Uptime Monitoring</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Stop relying on single-point monitoring. Uptime24 uses real people
            around the world to verify if your websites are actually accessible
            to your users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignInButton mode="modal">
              <button className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Start Monitoring Free
              </button>
            </SignInButton>
            <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
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
                  <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm">
                    <span className="text-red-400">User in Tokyo</span>
                    <span className="text-red-400 font-mono">Timeout</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm">
                    <span className="text-red-400">User in London</span>
                    <span className="text-red-400 font-mono">DNS Error</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm">
                    <span className="text-red-400">User in Sydney</span>
                    <span className="text-red-400 font-mono">Slow Load</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How Uptime24 Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real people, real locations, real results. Our community of
              validators provides the most accurate uptime data available.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Submit Your Site</h3>
              <p className="text-gray-300">
                Add your website to our monitoring network. Set up takes less
                than 2 minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Community Validates
              </h3>
              <p className="text-gray-300">
                Real users from around the world check your site and report
                their actual experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Real Data</h3>
              <p className="text-gray-300">
                Receive accurate uptime stats based on real user experiences,
                not just server pings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Live Validation Network
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-800 rounded-lg">
                  <div>
                    <div className="font-semibold">New York, USA</div>
                    <div className="text-sm text-gray-400">2 seconds ago</div>
                  </div>
                  <span className="text-green-400 font-mono">✓ Online</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-800 rounded-lg">
                  <div>
                    <div className="font-semibold">London, UK</div>
                    <div className="text-sm text-gray-400">5 seconds ago</div>
                  </div>
                  <span className="text-green-400 font-mono">✓ Online</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-800 rounded-lg">
                  <div>
                    <div className="font-semibold">Tokyo, Japan</div>
                    <div className="text-sm text-gray-400">8 seconds ago</div>
                  </div>
                  <span className="text-green-400 font-mono">✓ Online</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <div>
                    <div className="font-semibold">Sydney, Australia</div>
                    <div className="text-sm text-gray-400">12 seconds ago</div>
                  </div>
                  <span className="text-orange-400 font-mono">⚠ Slow</span>
                </div>
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
                    user-facing issues that automated tools miss.
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

      {/* CTA Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to get real uptime data?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of developers who trust their monitoring to the
            community.
          </p>
          <SignInButton mode="modal">
            <button className="bg-orange-500 hover:bg-orange-600 text-black px-12 py-4 rounded-lg font-semibold text-xl transition-colors duration-200">
              Start Free Monitoring
            </button>
          </SignInButton>
          <p className="text-gray-400 mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
