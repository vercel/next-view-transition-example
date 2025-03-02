'use client'

import { use } from 'react'
import { TABS } from '@/app/utils/constants'
import { TabViewTransition } from './view-transition'

function Content({ activeTab }: { activeTab: string }) {
  return (
    <div className="p-4">
      <div className="flex justify-center items-center py-8">
        <span className="text-8xl">{TABS.find((tab) => tab.id === activeTab)?.emoji}</span>
      </div>
    </div>
  )
}

export default function Page(props: { params: Promise<{ name: string }> }) {
  const { name } = use(props.params)

  return (
    <TabViewTransition>
      <Content activeTab={name} />
    </TabViewTransition>
  )
}
