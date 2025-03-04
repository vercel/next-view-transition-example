interface Author {
  name: string
  handle: string
  avatar: string
}

const AUTHORS: Record<string, Author> = {
  'sebmarkbage': { name: 'Sebastian Silbermann', handle: 'sebmarkbage', avatar: '/avatars/sebmarkbage.jpg' },
  'huozhi': { name: 'Jiachi Liu', handle: 'huozhi', avatar: '/avatars/huozhi.jpg' },
  'ztanner': { name: 'Zack Tanner', handle: 'ztanner', avatar: '/avatars/ztanner.jpg' },
  'leerob': { name: 'Lee Robinson', handle: 'leerob', avatar: '/avatars/leerob.jpg' },
  'feedthejim': { name: 'Jimmy Lai', handle: 'feedthejim', avatar: '/avatars/feedthejim.jpg' },
}

export const POSTS = [
  {
    date: 'February 26th, 2025',
    title: 'Next.js 15.2',
    slug: 'nextjs-15-2',
    description: 'Next.js 15.2 includes updates for debugging errors, metadata, Turbopack, and more:',
    features: [
      {
        title: 'Redesigned error UI and improved stack traces',
        description: 'A redesigned debugging experience',
      },
      {
        title: 'Streaming metadata',
        description: 'Async metadata will no longer block page rendering or client-side page transitions',
      },
      {
        title: 'Turbopack performance improvements',
        description: 'Faster compile times and reduced memory usage',
      },
      {
        title: 'React View Transitions (experimental)',
        description: "Experimental support for React's new View Transitions API",
      },
      {
        title: 'Node.js Middleware (experimental)',
        description: 'Experimental support for using the Node.js runtime in Middleware',
      },
    ],
    authors: ['sebmarkbage', 'huozhi', 'ztanner'].map((author) => AUTHORS[author]),
    content: `We've added a feature flag to enable the new experimental View Transitions API in React. This new API allows you to animate between different views and components in your application.

We've overhauled the UI and presentation of error messages in Next.js, making them easier to understand. The new design highlights the core details of the error—such as the message, the relevant code frame, and the call stack—while reducing noise from code in libraries or dependencies. This means you can quickly get to the root of what went wrong and start fixing it faster.

Leveraging the newly introduced owner stacks feature in React, we're now able to provide higher fidelity into where your errors are coming from. Next.js will now be able to surface the subcomponent responsible for throwing the error, skipping over intermediary elements that weren't responsible for creating the element that caused the error.

We're also making it easier to customize your indicator preferences without needing to add additional configuration.
`,
  image: null,
  },
  {
    date: 'January 3rd, 2025',
    title: 'Composable Caching with Next.js',
    slug: 'composable-caching-with-nextjs',
    description:
      "We're working on a simple and powerful caching model for Next.js. In a previous post, we talked about our journey with caching and how we've arrived at the 'use cache'",

    authors: ['leerob'].map((author) => AUTHORS[author]),
    content: `We’re working on a simple and powerful caching model for Next.js. In a previous post, we talked about our journey with caching and how we’ve arrived at the 'use cache' directive.

This post will discuss the API design and benefits of 'use cache'.

Behind the scenes, Next.js transforms this code into a server function due to the 'use cache' directive. During compilation, the “dependencies” of this cache entry are found and used as part of the cache key.

For example, id becomes part of the cache key. If we call getUser(1) multiple times, we return the memoized output from the cached server function. Changing this value will create a new entry in the cache.
`,
    image: '/post/composable-caching-with-nextjs.png',
  },
  {
    date: 'December 10th, 2024',
    title: 'Next.js 14.1',
    slug: 'next-14-1',
    description:
      'Next.js 14.1 includes developer experience improvements including:',
    authors: ['huozhi', 'feedthejim'].map((author) => AUTHORS[author]),
    features: [
      {
        title: 'Improved Self-Hosting',
        description: 'New documentation and custom cache handler',
      },
      {
        title: 'Turbopack Improvements',
        description: '5,600 tests passing for next dev --turbo',
      },
      {
        title: 'DX Improvements',
        description: 'Improved error messages, pushState and replaceState support',
      },
      {
        title: 'Parallel & Intercepted Routes',
        description: '20 bug fixes based on your feedback',
      },
      {
        title: 'next/image Improvements',
        description: '<picture>, art direction, and dark mode support',
      },
    ],
    content: `Improved Self-Hosting

We've heard your feedback for improved clarity on how to self-host Next.js with a Node.js server, Docker container, or static export. We've overhauled our self-hosting documentation on:

- Runtime environment variables
- Custom cache configuration for ISR
- Custom image optimization
- Middleware

    `,
    image: null,
  },
]

export const PLACES = [
  {
    id: 1,
    name: 'Florence',
    image: '/cards/florence.png',
    slug: 'florence',
    // generate human description of the place
    description: `A city in central Italy and the capital city of the Tuscany region. It is the most populous city in Tuscany, with 383,084 inhabitants in 2013, and over 1,520,000 in its metropolitan area.`,
  },
  {
    id: 2,
    name: `Xi'an`,
    image: '/cards/xian.png',
    slug: 'xian',
    description: 'An ancient city in China with 2000 years history, amazing food, located in the central part of the Shaanxi Province.',
  },
  {
    id: 3,
    name: 'Barcelona',
    image: '/cards/barcelona.png',
    slug: 'barcelona',
    description: 'A city on the coast of northeastern Spain. It is the capital and largest city of the autonomous community of Catalonia, as well as the second most populous municipality of Spain.',
  },
  {
    id: 4,
    name: 'Santa Monica',
    image: '/cards/santamonica.png',
    slug: 'santamonica',
    description: 'A beachfront city in western Los Angeles County, California, United States. Situated on Santa Monica Bay, it is bordered on five sides by different neighborhoods of the city of Los Angeles: Pacific Palisades to the north, Brentwood on the northeast, West Los Angeles on the east, Mar Vista on the southeast, and Venice on the south',
  },
]

export type Post = typeof POSTS[number]
export type Place = typeof PLACES[number]
