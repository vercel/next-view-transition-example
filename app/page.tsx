import Link from "next/link";

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-6xl text-center py-8">Next.js View Transition</h1>
      <div className="flex justify-center items-center py-8">
        <h2 className="text-3xl underline">
          <Link href="/tabs/tomato">
            {`🍅 Slide Animation`}
          </Link>
        </h2>
      </div>
    </div>
  )
}