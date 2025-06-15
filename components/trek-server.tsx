import { getPayload } from 'payload'
import config from '@/payload.config'

import Treks from './treks'

export default async function TrekServer() {
  const payload = await getPayload({ config })

  try {
    const treksSetting = await payload.findGlobal({
      slug: 'treks_page',
    })
    const { docs: treks } = await payload.find({
      collection: 'treks',
      pagination: false,
      depth: 1,
    })
    const bookData = await payload.findGlobal({
      slug: 'booking_sheet',
      depth: 1, // depth 1 is plenty; no deep relations here
    })
    return <Treks treksSetting={treksSetting} treks={treks} bookData={bookData} />
  } catch (error) {
    console.error('Error fetching header data:', error)
    return null
  }
}
