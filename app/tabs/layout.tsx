import Link from 'next/link'
import { TABS } from '../utils/constants'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // vertical in the middle
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden m-4">
        <div className="flex border-b border-gray-300">
          {TABS.map((tab) => (
            <Link
              key={tab.id}
              href={`/tabs/${tab.id}`}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative cursor-pointer hover:bg-gray-100`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {children}
      </div>
    </div>
  )
}
