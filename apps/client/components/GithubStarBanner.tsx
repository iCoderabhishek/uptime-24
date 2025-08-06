import Link from "next/link";
import { SparklesCore } from "./ui/sparkles";

export default function GitHubStarBanner() {
  return (
    <div className=" p-6">
      <div className="relative w-fit mx-auto px-6 py-2 rounded-full overflow-hidden border border-white">
        <SparklesCore
          background="#000"
          particleColor="#fff"
          className="absolute inset-0 z-0"
          particleDensity={80}
          minSize={1}
          maxSize={2}
          speed={2}
        />
        <div className="relative z-10 text-white text-sm sm:text-base text-center shadow-2xl backdrop-blur-sm px-4 py-1">
          ⭐ Enjoying the project?{" "}
          <Link
            href="https://github.com/iCoderabhishek/uptime-24.git"
            target="_blank"
            className="underline hover:text-orange-400 transition"
          >
            Star us on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
