import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function BluePage() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3 h-screen">
        <div className="col-span-1"></div>
        <ViewTransition name="blue-section">
          <div className="col-span-3 bg-sky-400 h-full">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Blue Section Extended
                </h1>
                <p className="text-white/90 text-xl mb-8">
                  This is the extended view of the blue section
                </p>
                <Link
                  href="/"
                  className="text-white hover:text-white/80 underline"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </ViewTransition>
      </div>
    </div>
  );
}
