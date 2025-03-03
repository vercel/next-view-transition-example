import Link from "next/link";

export default function Page() {
  return (
    <div className="p-4 max-w-[1200px] m-auto">
      <h1 className="text-3xl py-8">
        Next.js View Transition
      </h1>
      <p>
        {/* source code link */}
        <a
          href="https://github.com/vercel/next-view-transition-example"
          className="text-gray-500 hover:underline"
        >
          Source code ↗
        </a>

      </p>
      <div className="flex flex-col justify-center py-8 m-auto">
        <h2 className="text-xl underline">
          <Link href="/blog">
            {`Floating Elements Transition`}
          </Link>
        </h2>

        <h2 className="text-xl underline">
          <Link href="/card">
            {`Transform Card Transition`}
          </Link>
        </h2>
      </div>
    </div>
  )
}