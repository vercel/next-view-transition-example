import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Page() {
  return (
    <div className="grid h-screen grid-cols-3">
      <Link href="/code" className="relative h-full">
        <ViewTransition name="code-photo">
          <div className="absolute inset-0 bg-[#64A2BA]">
            <Image
              src="/code.png"
              alt="Code"
              fill
              className="object-cover pt-8 lg:object-contain"
              priority
            />
          </div>
        </ViewTransition>
        {/* Overlay */}
        <div className="absolute inset-0 transition-colors duration-300 hover:bg-black/30" />
        {/* Title */}
        <div className="absolute bottom-20 w-full bg-black/50 p-8 text-center text-3xl font-bold text-white">
          <ViewTransition name="code-title">
            <h2>Code</h2>
          </ViewTransition>
        </div>
      </Link>

      <Link href="/karaoke" className="relative h-full">
        <ViewTransition name="karaoke-photo">
          <div className="absolute inset-0 bg-[#E09E8E]">
            <Image
              src="/karaoke.png"
              alt="Karaoke"
              fill
              className="object-cover pt-8 lg:object-contain"
              priority
            />
          </div>
        </ViewTransition>
        {/* Overlay */}
        <div className="absolute inset-0 transition-colors duration-300 hover:bg-black/30" />
        {/* Title */}
        <div className="absolute bottom-20 w-full bg-black/50 p-8 text-center text-3xl font-bold text-white">
          <ViewTransition name="karaoke-title">
            <h2>Karaoke</h2>
          </ViewTransition>
        </div>
      </Link>

      <Link href="/cocktails" className="relative h-full">
        <ViewTransition name="cocktails-photo">
          <div className="absolute inset-0 bg-[#556D43]">
            <Image
              src="/cocktails.png"
              alt="Cocktails"
              fill
              className="object-cover pt-8 lg:object-contain"
              priority
            />
          </div>
        </ViewTransition>
        {/* Overlay */}
        <div className="absolute inset-0 transition-colors duration-300 hover:bg-black/30" />
        {/* Title */}
        <div className="absolute bottom-20 w-full bg-black/50 p-8 text-center text-3xl font-bold text-white">
          <ViewTransition name="cocktails-title">
            <h2>Cocktails</h2>
          </ViewTransition>
        </div>
      </Link>
    </div>
  );
}
