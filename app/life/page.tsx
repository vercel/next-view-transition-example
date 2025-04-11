import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3 h-screen">
        {/* Code Section */}
        <ViewTransition name="code-page">
          <Link href="/code" className="block h-full relative">
            <ViewTransition name="code-photo">
              <div className="relative h-full bg-[#64A2BA] flex items-center justify-center pb-0 pt-8 px-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/life/code.png"
                    alt="Code"
                    fill
                    className="object-contain"
                    sizes="33vw"
                    priority
                  />
                </div>
              </div>
            </ViewTransition>
            <ViewTransition name="code-description">
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <ViewTransition name="code-title">
                    <h2 className="text-3xl font-bold text-white mb-4">Code</h2>
                  </ViewTransition>
                </div>
              </div>
            </ViewTransition>
          </Link>
        </ViewTransition>

        {/* Karaoke Section */}
        <ViewTransition name="karaoke-page">
          <Link href="/karaoke" className="block h-full relative">
            <ViewTransition name="karaoke-photo">
              <div className="relative h-full bg-[#E09E8E] flex items-center justify-center pb-0 pt-8 px-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/life/karaoke.png"
                    alt="Karaoke"
                    fill
                    className="object-contain"
                    sizes="33vw"
                    priority
                  />
                </div>
              </div>
            </ViewTransition>
            <ViewTransition name="karaoke-description">
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <ViewTransition name="karaoke-title">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Karaoke
                    </h2>
                  </ViewTransition>
                </div>
              </div>
            </ViewTransition>
          </Link>
        </ViewTransition>

        {/* Cocktails Section */}
        <ViewTransition name="cocktails-page">
          <Link href="/cocktails" className="block h-full relative">
            <ViewTransition name="cocktails-photo">
              <div className="relative h-full bg-[#556D43] flex items-center justify-center pb-0 pt-8 px-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/life/cocktails.png"
                    alt="Cocktails"
                    fill
                    className="object-contain"
                    sizes="33vw"
                    priority
                  />
                </div>
              </div>
            </ViewTransition>
            <ViewTransition name="cocktails-description">
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <ViewTransition name="cocktails-title">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Cocktails
                    </h2>
                  </ViewTransition>
                </div>
              </div>
            </ViewTransition>
          </Link>
        </ViewTransition>
      </div>
    </div>
  );
}
