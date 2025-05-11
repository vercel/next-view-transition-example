"use client";

import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import styles from "../animations.module.css";
import ScrollArrow from "../components/ScrollArrow";
import CodeView from "./CodeView";

export default function CodePage() {
  return (
    <>
      <div className="min-h-screen bg-[#64A2BA]">
        <Link
          href="/"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-white hover:text-white/80"
        >
          ← Back
        </Link>
        <div className="grid h-screen grid-cols-3">
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

          <div className={`col-span-2 ${styles.viewTransitionWrapper}`}>
            <div
              className={`flex h-full flex-col justify-center p-12 backdrop-blur-sm ${styles["open-left"]}`}
            >
              <ViewTransition name="code-title">
                <h1 className="mb-6 text-4xl font-bold text-white">Code</h1>
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
                  I'm particularly interested in modern web development,
                  focusing on creating responsive, accessible, and performant
                  applications that provide great user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ScrollArrow />
      </div>
      <CodeView />
    </>
  );
}
