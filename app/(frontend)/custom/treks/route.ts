// app/api/treks/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Fetch all treks with full response object
    const result = await payload.find({
      collection: 'treks',
      depth: 0, // No need for deep population since we only want names
      limit: 1000, // Set high limit to get all treks
    })

    // Extract only the names from the docs array

    // Return just the array of names
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching treks:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch treks',
      },
      { status: 500 },
    )
  }
}
