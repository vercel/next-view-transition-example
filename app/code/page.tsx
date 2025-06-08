"use client";

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
        <div className="flex flex-col lg:flex-row">
          <div className="relative order-2 min-h-screen flex-1 lg:order-1">
            <ViewTransition name="code-photo">
              <div
                className={`absolute inset-0 bg-[#64A2BA] bg-[url(/code.png)] bg-contain bg-position-[center_top_1rem] bg-no-repeat lg:bg-contain`}
              />
            </ViewTransition>
          </div>

          <div
            className={`flex-2 ${styles.viewTransitionWrapper} order-2 lg:order-1`}
          >
            <div
              className={`flex h-full flex-col justify-center p-12 backdrop-blur-sm ${styles["open-right"]}`}
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
