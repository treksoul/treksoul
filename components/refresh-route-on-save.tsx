// app/refresh-route-on-save.tsx
'use client'

import { RefreshRouteOnSave as PayloadRefresh } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export default function RefreshRouteOnSave() {
  const router = useRouter()

  return (
    <PayloadRefresh
      serverURL={process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'} // http://localhost:3000
      refresh={() => router.refresh()} // tells Next to re‑run RSC
    />
  )
}
