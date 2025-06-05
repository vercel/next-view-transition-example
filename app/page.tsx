import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import hobbies from "./hobbies.json";
import { Hobby } from "./types";
import { convertToPascalCase } from "./utils/convertToPascalCase";

export default function Page() {
  return (
    <div className="grid h-screen grid-rows-3 sm:grid-cols-3 sm:grid-rows-1">
      {(hobbies as Hobby[]).map((hobby) => (
        <Link href={`/${hobby.id}`} className="relative h-full">
          <ViewTransition name={`${hobby.id}-photo`}>
            <div
              className={`absolute inset-0 bg-[${hobby.color}] bg-[url(/${hobby.id}.png)] bg-size-[40%] bg-position-[center_top_1rem] bg-no-repeat sm:bg-cover lg:bg-contain`}
            />
          </ViewTransition>
          {/* Overlay */}
          <div className="absolute inset-0 transition-colors duration-300 hover:bg-black/30" />
          {/* Title */}
          <div className="absolute bottom-0 w-full bg-black/50 p-4 text-center text-3xl font-bold text-white sm:bottom-20 sm:p-8">
            <ViewTransition name={`${hobby.id}-title`}>
              <h2>{convertToPascalCase(hobby.id)}</h2>
            </ViewTransition>
          </div>
        </Link>
      ))}
    </div>
  );
}
