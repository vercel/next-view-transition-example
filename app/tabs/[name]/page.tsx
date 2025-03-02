export { default } from './page-client'

export function generateStaticParams() {
  return [
    { params: { name: 'tomato' } },
    { params: { name: 'lettuce' } },
    { params: { name: 'cheese' } },
  ]
}