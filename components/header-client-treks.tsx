import { BookingSheet, Header } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import BookNowSheet from './book-sheet'

const TreksHeader = ({ headerData, bookData }: { headerData: Header; bookData: BookingSheet }) => {
  return (
    <div className="fixed top-0 z-50 w-full inset-x-0 bg-white shadow-md p-2 flex justify-between">
      <Link
        href="/"
        aria-label="Home"
        className="block text-center text-2xl font-black tracking-tight text-emerald-700"
      >
        <Image
          src={(headerData.logo as any).url}
          alt="Treksoul Nepal"
          width={60}
          height={60}
          className="size-[60px] sm:size-[70px] "
          priority={true}
        />
      </Link>
      <BookNowSheet bookData={bookData} bookNowButtonColor={headerData.Book_now_button_color} />
    </div>
  )
}

export default TreksHeader
