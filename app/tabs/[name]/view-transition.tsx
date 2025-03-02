'use client'

import { unstable_ViewTransition as ViewTransition } from 'react'
import transitionStyles from './transition.module.css'
import { cx } from '@/app/utils/cx'

export function TabViewTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition className={cx(transitionStyles['enter-slide-left'], transitionStyles['exit-slide-right'])}>
      {children}
    </ViewTransition>
  )
}
