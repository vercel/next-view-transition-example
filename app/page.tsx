import Link from "next/link";

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-3xl py-8">Next.js View Transition</h1>
      <div className="flex flex-col justify-center py-8 m-auto">
        <h2 className="text-xl underline">
          <Link href="/tabs/tomato">
            {`Simple Slides Animation`}
          </Link>
        </h2>

        <h2 className="text-xl underline">
          <Link href="/blog">
            {`Floating Elements Animation`}
          </Link>
        </h2>
      </div>
    </div>
  )
}