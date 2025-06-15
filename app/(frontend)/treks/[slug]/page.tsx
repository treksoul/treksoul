import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

import TrekDetailClient from '@/components/trek-detail-client'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  /* fetch trek + global UI settings in parallel */
  const [{ docs }, settings] = await Promise.all([
    payload.find({
      collection: 'treks',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    }),
    payload.findGlobal({
      slug: 'trek_detail_settings',
    }),
  ])
  const bookData = await payload.findGlobal({
    slug: 'booking_sheet',
    depth: 1,
  })

  const trek = docs[0]
  if (!trek) notFound()

  return <TrekDetailClient trek={trek} settings={settings} bookData={bookData} />
}
