import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { convertToPascalCase } from "@/lib/utils";
import { hobbies } from "./data";
import type { Hobby } from "./types";

export default function Page() {
  return (
    <div className="grid h-[100dvh] grid-rows-3 md:grid-cols-3 md:grid-rows-1">
      {(hobbies as Hobby[]).map((hobby) => (
        <Link href={`/${hobby.id}`} className="relative" key={hobby.id}>
          <ViewTransition name={`${hobby.id}-photo`}>
            <div
              className={`absolute inset-0 bg-[${hobby.color}] bg-position-[center_top_1rem] bg-size-[40%] bg-no-repeat md:bg-cover lg:bg-contain`}
              style={{ backgroundImage: `url(/${hobby.id}.png)` }}
            />
          </ViewTransition>
          <div className="absolute inset-0 transition-colors duration-300 hover:bg-black/30" />
          <div className="absolute bottom-0 w-full bg-black/50 p-2 text-center font-bold text-2xl text-white md:bottom-20 md:p-8 md:text-4xl">
            <ViewTransition name={`${hobby.id}-title`}>
              <h2>{convertToPascalCase(hobby.id)}</h2>
            </ViewTransition>
          </div>
        </Link>
      ))}
    </div>
  );
}
