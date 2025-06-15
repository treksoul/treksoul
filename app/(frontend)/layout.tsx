import React from 'react'
import './styles.css'
import RefreshRouteOnSave from '@/components/refresh-route-on-save'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const MontserratFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={MontserratFont.variable}>
      <body className="">
        <RefreshRouteOnSave />
        {children}
        <Toaster richColors /> {/* put this once, at the end of <body> */}
      </body>
    </html>
  )
}
