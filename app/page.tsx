import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Page() {
  return (
    <div className="grid h-screen grid-rows-3 sm:grid-cols-3 sm:grid-rows-1">
      <Link href="/code" className="relative h-full">
        <ViewTransition name="code-photo">
          <div className="absolute inset-0 bg-[#64A2BA] bg-[url(/code.png)] bg-size-[40%] bg-position-[center_top_1rem] bg-no-repeat sm:bg-cover lg:bg-contain" />
        </ViewTransition>
        {/* Overlay */}
        <div className="absolute inset-0 transition-colors duration-300 hover:bg-black/30" />
        {/* Title */}
        <div className="absolute bottom-0 w-full bg-black/50 p-4 text-center text-3xl font-bold text-white sm:bottom-20 sm:p-8">
          <ViewTransition name="code-title">
            <h2>Code</h2>
          </ViewTransition>
        </div>
      </Link>

      <Link href="/karaoke" className="relative h-full">
        <ViewTransition name="karaoke-photo">
          <div className="absolute inset-0 bg-[#E09E8E] bg-[url(/karaoke.png)] bg-size-[40%] bg-position-[center_top_1rem] bg-no-repeat sm:bg-cover lg:bg-contain" />
        </ViewTransition>
        {/* Overlay */}
        <div className="absolute inset-0 transition-colors duration-300 hover:bg-black/30" />
        {/* Title */}
        <div className="absolute bottom-0 w-full bg-black/50 p-4 text-center text-3xl font-bold text-white sm:bottom-20 sm:p-8">
          <ViewTransition name="karaoke-title">
            <h2>Karaoke</h2>
          </ViewTransition>
        </div>
      </Link>

      <Link href="/cocktails" className="relative h-full">
        <ViewTransition name="cocktails-photo">
          <div className="absolute inset-0 bg-[#556D43] bg-[url(/cocktails.png)] bg-size-[40%] bg-position-[center_top_1rem] bg-no-repeat sm:bg-cover lg:bg-contain" />
        </ViewTransition>
        {/* Overlay */}
        <div className="absolute inset-0 transition-colors duration-300 hover:bg-black/30" />
        {/* Title */}
        <div className="absolute bottom-0 w-full bg-black/50 p-4 text-center text-3xl font-bold text-white sm:bottom-20 sm:p-8">
          <ViewTransition name="cocktails-title">
            <h2>Cocktails</h2>
          </ViewTransition>
        </div>
      </Link>
    </div>
  );
}
