import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import styles from "../animations.module.css";

export default function CocktailsPage() {
  return (
    <div className="min-h-screen bg-[#556D43]">
      <Link
        href="/life"
        className="absolute top-8 left-8 text-white hover:text-white/80 flex items-center gap-2 z-10"
      >
        ← Back
      </Link>
      <div className="grid grid-cols-3 h-screen">
        {/* Description Section */}
        <ViewTransition name="cocktails-description">
          <div className={`col-span-2 ${styles.viewTransitionWrapper}`}>
            <div
              className={`backdrop-blur-sm p-12 flex flex-col justify-center h-full ${styles["open-right"]}`}
            >
              <ViewTransition name="cocktails-title">
                <h1 className="text-4xl font-bold mb-6 text-white">
                  Cocktails
                </h1>
              </ViewTransition>
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  Crafting cocktails is where science meets artistry. Each drink
                  is an opportunity to experiment with flavors, textures, and
                  presentations, creating unique experiences for every glass.
                </p>
                <p>
                  I love diving deep into the history of classic cocktails while
                  also pushing the boundaries with modern techniques and
                  unexpected ingredient combinations. The precision required in
                  measuring, the timing of preparation, and the final garnish –
                  every detail matters.
                </p>
                <p>
                  Whether I'm perfecting a traditional Manhattan or inventing
                  something new, the joy of sharing these creations with friends
                  and seeing their reactions makes every experiment worthwhile.
                </p>
              </div>
            </div>
          </div>
        </ViewTransition>

        {/* Photo Section */}
        <ViewTransition name="cocktails-photo">
          <div className="relative h-full">
            <Image
              src="/life/cocktails.png"
              alt="Cocktails"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </ViewTransition>
      </div>
    </div>
  );
}
