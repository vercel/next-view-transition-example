import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="grid h-screen grid-cols-3">
        {/* Code Section */}
        <ViewTransition name="code-page">
          <Link href="/code" className="relative block h-full">
            <ViewTransition name="code-photo">
              <div className="relative flex h-full items-center justify-center bg-[#64A2BA] px-8 pt-8 pb-0">
                <div className="relative h-full w-full">
                  <Image
                    src="/code.png"
                    alt="Code"
                    fill
                    className="object-contain"
                    sizes="33vw"
                    priority
                  />
                </div>
              </div>
            </ViewTransition>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="p-8 text-center">
                <ViewTransition name="code-title">
                  <h2 className="mb-4 text-3xl font-bold text-white">Code</h2>
                </ViewTransition>
              </div>
            </div>
          </Link>
        </ViewTransition>

        {/* Karaoke Section */}
        <ViewTransition name="karaoke-page">
          <Link href="/karaoke" className="relative block h-full">
            <ViewTransition name="karaoke-photo">
              <div className="relative flex h-full items-center justify-center bg-[#E09E8E] px-8 pt-8 pb-0">
                <div className="relative h-full w-full">
                  <Image
                    src="/karaoke.png"
                    alt="Karaoke"
                    fill
                    className="object-contain"
                    sizes="33vw"
                    priority
                  />
                </div>
              </div>
            </ViewTransition>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="p-8 text-center">
                <ViewTransition name="karaoke-title">
                  <h2 className="z-10 mb-4 text-3xl font-bold text-white">
                    Karaoke
                  </h2>
                </ViewTransition>
              </div>
            </div>
          </Link>
        </ViewTransition>

        {/* Cocktails Section */}
        <ViewTransition name="cocktails-page">
          <Link href="/cocktails" className="relative block h-full">
            <ViewTransition name="cocktails-photo">
              <div className="relative flex h-full items-center justify-center bg-[#556D43] px-8 pt-8 pb-0">
                <div className="relative h-full w-full">
                  <Image
                    src="/cocktails.png"
                    alt="Cocktails"
                    fill
                    className="object-contain"
                    sizes="33vw"
                    priority
                  />
                </div>
              </div>
            </ViewTransition>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="p-8 text-center">
                <ViewTransition name="cocktails-title">
                  <h2 className="mb-4 text-3xl font-bold text-white">
                    Cocktails
                  </h2>
                </ViewTransition>
              </div>
            </div>
          </Link>
        </ViewTransition>
      </div>
    </div>
  );
}
