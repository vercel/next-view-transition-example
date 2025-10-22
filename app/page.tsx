import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 sm:py-24 md:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
            View Transition Examples
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed">
              <span className="inline-flex items-center flex-wrap gap-1.5">
                <span>Use React</span>
                <code className="px-1.5 py-0.5 bg-gray-100 text-gray-900 rounded font-mono text-xs sm:text-sm">
                  {`<ViewTransition>`}
                </code>
                <span>API in Next.js</span>
              </span>
            </p>

            {/* Support Indicator */}
            <div data-support className="flex-shrink-0">
              <div data-support-no className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="hidden sm:inline">ViewTransition might not work on your browser</span>
                <span className="sm:hidden">Not supported</span>
              </div>
              <div data-support-yes className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden sm:inline">Your browser supports View Transitions</span>
                <span className="sm:hidden">Supported</span>
              </div>
            </div>
          </div>
        </div>

        {/* Example Links */}
        <div className="space-y-1 mb-16 sm:mb-24">
          <Link 
            href="/blog" 
            className="group block rounded-lg p-4 sm:p-6 transition-colors"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 text-black group-hover:text-gray-400 transition-colors">
                  Floating Elements
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-400 transition-colors">
                  Watch elements smoothly float and transition between different positions on the page
                </p>
              </div>
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-black group-hover:text-gray-400 group-hover:translate-x-1 transition-all" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link 
            href="/card" 
            className="group block rounded-lg p-4 sm:p-6 transition-colors"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 text-black group-hover:text-gray-400 transition-colors">
                  Transform Cards
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-400 transition-colors">
                  Experience smooth card transformations with seamless scale and position transitions
                </p>
              </div>
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-black group-hover:text-gray-400 group-hover:translate-x-1 transition-all" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200">
          <a 
            href="https://github.com/vercel/next-view-transition-example" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-black hover:text-gray-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span>View source on GitHub</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
