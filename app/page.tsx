import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'

export default function Page() {
  return (
    <div className="p-4 max-w-[960px] m-auto">
      <h1 className="text-4xl py-8 font-medium">{'View Transition Next.js Examples'}</h1>

      <p>
        <span className="mr-2">
          {`Use React `}
          <b className="text-blue-400">{`Experimental `}</b>

          <ViewTransition name="experimental-label">
            <span className='inline-block font-bold text-gray-700'>{`<ViewTransitions>`}</span>
          </ViewTransition>
          
          {` API in Next.js.`}
        </span>
      </p>

      {/* supports info */}
      <div data-support className="my-2 w-full text-sm">
        <p data-support-no className="bg-red-100 text-red-500 py-1 px-2 rounded-lg">
          {'🔴 <ViewTransition> might not work well on your browser'}
        </p>
        <p data-support-yes className="bg-green-100 text-green-600 py-1 px-2 rounded-lg">
          🟢 Your browser supports View Transitions.
        </p>
      </div>

      <ul className="flex flex-col justify-center py-8 m-auto">
        <li className="py-2">
          <h2 className="text-xl underline">
            <Link href="/blog">{`Floating Elements Transition`}</Link>
          </h2>
        </li>

        <li className="py-2">
          <h2 className="text-xl underline">
            <Link href="/card">{`Transform Card Transition`}</Link>
          </h2>
        </li>
      </ul>

      <a href="https://github.com/vercel/next-view-transition-example" className="text-gray-500 hover:underline">
        Source code ↗
      </a>
    </div>
  )
}
