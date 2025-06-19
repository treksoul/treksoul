

import HeaderTreksServer from '@/components/header-server-treks'

import React from 'react'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <section>
      <HeaderTreksServer />
      {children}
    </section>
  )
}
