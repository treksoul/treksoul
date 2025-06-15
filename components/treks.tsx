'use client'
import { BookingSheet, Trek, TreksPage } from '@/payload-types'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {}

const Treks = ({
  treksSetting,
  treks,
  bookData,
}: {
  treksSetting: TreksPage
  treks: Trek[]
  bookData: BookingSheet
}) => {
  return (
    <section id="treks" className="mt-26 md:mt-30">
      <h2 className="text-3xl font-bold text-center mb-8 mt-4 md:text-4xl">
        {treksSetting.treks_page_heading}
      </h2>
      <EmblaCarousel
        options={OPTIONS}
        treks={treks}
        treksSetting={treksSetting}
        bookData={bookData}
      />
    </section>
  )
}

export default Treks
