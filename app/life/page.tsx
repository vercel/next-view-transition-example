import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3 h-screen">
        {/* Green Section */}
        <ViewTransition name="green-section">
          <Link href="/green" className="block h-full">
            <div className="bg-emerald-400 h-full flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Section 1
                </h2>
                <p className="text-white/90">
                  Beautiful green section with content
                </p>
              </div>
            </div>
          </Link>
        </ViewTransition>

        {/* Blue Section */}
        <ViewTransition name="blue-section">
          <Link href="/blue" className="block h-full">
            <div className="bg-sky-400 h-full flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Section 2
                </h2>
                <p className="text-white/90">
                  Stunning blue section with content
                </p>
              </div>
            </div>
          </Link>
        </ViewTransition>

        {/* Pink Section */}
        <ViewTransition name="pink-section">
          <Link href="/pink" className="block h-full">
            <div className="bg-pink-400 h-full flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Section 3
                </h2>
                <p className="text-white/90">
                  Elegant pink section with content
                </p>
              </div>
            </div>
          </Link>
        </ViewTransition>
      </div>
    </div>
  );
}
