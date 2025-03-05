import { cx } from '@/app/utils/cx'

export function DynamicBackground({ className }: { className: string }) {
  return (
    <div
      className={cx(
        'absolute w-96 h-96 bg-blue-500 opacity-50 blur-3xl top-20 left-1/4 transform rotate-12 skew-y-6 rounded-full',
        className
      )}
    />
  )
}
