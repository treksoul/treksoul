export const revalidate = 60;
import React from 'react'
import './styles.css'
import RefreshRouteOnSave from '@/components/refresh-route-on-save'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'

const MontserratFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

// Helper function to check if media is populated
const isMediaPopulated = (
  media: any,
): media is { url: string; alt?: string; width?: number; height?: number } => {
  return media && typeof media === 'object' && 'url' in media
}

// Generate dynamic metadata from Payload global
export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })

    const siteMetadata = await payload.findGlobal({
      slug: 'siteMetadata',
    })

    // Build the metadata object
    const metadata: Metadata = {
      title: {
        default: siteMetadata.defaultTitle || 'TrekSoulNepal',
        template: siteMetadata.titleTemplate || '%s | TrekSoulNepal',
      },
      description:
        siteMetadata.description || 'Discover the soul of Nepal through trekking adventures.',
      keywords: siteMetadata.keywords || [],
      themeColor: siteMetadata.themeColor || '#008763',

      // Open Graph
      openGraph: {
        title: siteMetadata.defaultTitle,
        description: siteMetadata.description,
        type: 'website',
        ...(siteMetadata.ogImage &&
          isMediaPopulated(siteMetadata.ogImage) && {
            images: [
              {
                url: siteMetadata.ogImage.url,
                width: siteMetadata.ogImage.width,
                height: siteMetadata.ogImage.height,
                alt: siteMetadata.ogImage.alt || siteMetadata.defaultTitle,
              },
            ],
          }),
      },

      // Twitter
      twitter: {
        card: 'summary_large_image',
        ...(siteMetadata.twitterHandle && {
          site: siteMetadata.twitterHandle.startsWith('@')
            ? siteMetadata.twitterHandle
            : `@${siteMetadata.twitterHandle}`,
          creator: siteMetadata.twitterHandle.startsWith('@')
            ? siteMetadata.twitterHandle
            : `@${siteMetadata.twitterHandle}`,
        }),
        ...(siteMetadata.ogImage &&
          isMediaPopulated(siteMetadata.ogImage) && {
            images: [siteMetadata.ogImage.url],
          }),
      },

      // Icons
      icons: {
        ...(siteMetadata.icons?.favicon16 &&
          isMediaPopulated(siteMetadata.icons.favicon16) && {
            icon: [{ url: siteMetadata.icons.favicon16.url, sizes: '16x16', type: 'image/png' }],
          }),
        ...(siteMetadata.icons?.favicon32 &&
          isMediaPopulated(siteMetadata.icons.favicon32) && {
            icon: [{ url: siteMetadata.icons.favicon32.url, sizes: '32x32', type: 'image/png' }],
          }),
        ...(siteMetadata.icons?.faviconICO &&
          isMediaPopulated(siteMetadata.icons.faviconICO) && {
            shortcut: siteMetadata.icons.faviconICO.url,
          }),
        ...(siteMetadata.icons?.appleTouch &&
          isMediaPopulated(siteMetadata.icons.appleTouch) && {
            apple: [
              { url: siteMetadata.icons.appleTouch.url, sizes: '180x180', type: 'image/png' },
            ],
          }),
      },

      // Manifest
      ...(siteMetadata.icons?.webManifest &&
        isMediaPopulated(siteMetadata.icons.webManifest) && {
          manifest: siteMetadata.icons.webManifest.url,
        }),

      // Additional meta tags
      other: {
        ...(siteMetadata.icons?.android192 &&
          isMediaPopulated(siteMetadata.icons.android192) && {
            'android-chrome-192x192': siteMetadata.icons.android192.url,
          }),
        ...(siteMetadata.icons?.android512 &&
          isMediaPopulated(siteMetadata.icons.android512) && {
            'android-chrome-512x512': siteMetadata.icons.android512.url,
          }),
      },
    }

    return metadata
  } catch (error) {
    console.error('Error fetching site metadata:', error)

    // Fallback metadata if Payload fetch fails
    return {
      title: {
        default: 'TrekSoulNepal',
        template: '%s | TrekSoulNepal',
      },
      description: 'Discover the soul of Nepal through trekking adventures.',
      themeColor: '#008763',
    }
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={MontserratFont.variable}>
      <body className="">
        <RefreshRouteOnSave />
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
