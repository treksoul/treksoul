import { getPayload } from 'payload'
import config from '@/payload.config'
import BookNowSheet from './book-sheet'

export default async function BookNowServer() {
  /* 1. payload global */
  const payload = await getPayload({ config })
  const bookData = await payload.findGlobal({
    slug: 'booking_sheet',
    depth: 1,
  })

  /* 3. render */
  return <BookNowSheet bookData={bookData} bookNowButtonColor={bookData.button_color} />
}
