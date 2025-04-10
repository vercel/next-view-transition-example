import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function GreenPage() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3 h-screen">
        <ViewTransition name="green-section">
          <div className="col-span-3 bg-emerald-400 h-full">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Green Section Extended
                </h1>
                <p className="text-white/90 text-xl mb-8">
                  This is the extended view of the green section
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
