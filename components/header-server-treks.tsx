import { getPayload } from 'payload'
import config from '@/payload.config'

import TreksHeader from './header-client-treks'

export default async function HeaderServer() {
  const payload = await getPayload({ config })

  try {
    const headerData = await payload.findGlobal({
      slug: 'header',
    })
    const bookData = await payload.findGlobal({
      slug: 'booking_sheet',
      depth: 1, // depth 1 is plenty; no deep relations here
    })

    return <TreksHeader headerData={headerData} bookData={bookData} />
  } catch (error) {
    console.error('Error fetching header data:', error)
    return null
  }
}
