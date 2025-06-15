import { getPayload } from 'payload'
import config from '@/payload.config'

import Home from './home'
export default async function HomeServer() {
  const payload = await getPayload({ config })

  try {
    const landingPageData = await payload.findGlobal({
      slug: 'landing_page',
      depth: 1,
    })

    return <Home landingPageData={landingPageData} />
  } catch (error) {
    console.error('Error fetching header data:', error)
    return null
  }
}
