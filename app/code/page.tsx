import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import styles from "../animations.module.css";

export default function CodePage() {
  return (
    <div className="min-h-screen bg-[#64A2BA]">
      <Link
        href="/life"
        className="absolute top-8 left-8 text-white hover:text-white/80 flex items-center gap-2 z-10"
      >
        ← Back
      </Link>
      <div className="grid grid-cols-3 h-screen">
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

        <div className={`col-span-2 ${styles.viewTransitionWrapper}`}>
          <div
            className={`backdrop-blur-sm p-12 flex flex-col justify-center h-full ${styles["open-left"]}`}
          >
            <ViewTransition name="code-title">
              <h1 className="text-4xl font-bold mb-6 text-white">Code</h1>
            </ViewTransition>
            <div className="space-y-4 text-lg text-white/90">
              <p>
                Coding is more than just a skill for me - it's a passion that
                drives my creativity and problem-solving abilities. I love the
                process of turning ideas into reality through clean, efficient
                code.
              </p>
              <p>
                Whether I'm building web applications, exploring new
                technologies, or contributing to open-source projects, I'm
                constantly learning and growing as a developer. The ability to
                create something from nothing and see it come to life is
                incredibly rewarding.
              </p>
              <p>
                I'm particularly interested in modern web development, focusing
                on creating responsive, accessible, and performant applications
                that provide great user experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
