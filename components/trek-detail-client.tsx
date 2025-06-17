'use client'

import Image from 'next/image'
import { format } from 'd3-format'
import { useMemo, CSSProperties } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

import type { BookingSheet, Media, Trek, TrekDetailSetting } from '@/payload-types'
import BookNowSheet from './book-sheet'

/* ------------------------------------------------------------ */
/* global-settings                                              */
/* ------------------------------------------------------------ */

/* ------------------------------------------------------------ */
/* helpers                                                      */
/* ------------------------------------------------------------ */
type RawImg = string | Media | null | undefined
type ImgObj = { id?: string; url: string; alt?: string }

const toObj = (m: RawImg): ImgObj | null => {
  if (!m) return null
  if (typeof m === 'string') return { url: m }
  return m.url ? { id: m.id, url: m.url as string, alt: m.alt ?? '' } : null
}

/* ------------------------------------------------------------ */
/* main component                                               */
/* ------------------------------------------------------------ */
export default function TrekDetailClient({
  trek,
  settings,
  bookData,
}: {
  trek: Trek
  settings: TrekDetailSetting
  bookData: BookingSheet
}) {
  /* hero + gallery combined, then de-duped */
  const images = useMemo<ImgObj[]>(() => {
    const raw: RawImg[] = [trek.heroImage, ...(trek.gallery ?? [])]
    const seen = new Set<string>()
    return raw.map(toObj).filter((img): img is ImgObj => {
      if (!img || seen.has(img.url)) return false
      seen.add(img.url)
      return true
    })
  }, [trek])

  const [heroRef] = useEmblaCarousel({ loop: true, dragFree: true, duration: 24 }, [
    Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ])
  const [thumbRef, thumbApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  })
  const scrollPrev = () => thumbApi?.scrollPrev()
  const scrollNext = () => thumbApi?.scrollNext()

  const price = `${trek.price.currency}\u00A0${format(',')(trek.price.amount)}`
  const facts = useMemo(
    () =>
      [
        trek.distanceKm && { label: 'Distance', value: `${trek.distanceKm} km` },
        trek.maxAltitude && { label: 'Max altitude', value: `${trek.maxAltitude} m` },
        trek.difficulty && { label: 'Difficulty', value: trek.difficulty },
        trek.bestSeason?.length && {
          label: 'Best season',
          value: trek.bestSeason.join(' / '),
        },
      ].filter(Boolean) as { label: string; value: string }[],
    [trek],
  )

  const vars: any = {
    '--btn-hero-bg': settings?.hero_button_color || '#ffffff',
    '--btn-sticky-bg': settings?.sticky_button_color || '#2563eb',
    '--badge-duration-bg': settings?.duration_badge_color || '#ffffff',
    '--badge-highlight-bg': settings?.highlight_badge_color || '#e2e8f0',
  }

  const stickyPrefix = settings?.sticky_button_text || 'Book this trek – '

  return (
    <main className="overflow-x-hidden" style={vars}>
      <section ref={heroRef} className="relative h-[72vh] lg:h-[80vh] overflow-hidden">
        {/* slides */}
        <div className="flex h-full">
          {images.map(({ url, alt, id }, i) => (
            <div key={`${id ?? url}-${i}`} className="relative flex-[0_0_100%]">
              <Image
                src={url}
                alt={alt ?? ''}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold drop-shadow-md">
            {trek.name}
          </h1>

          <p className="mt-3 max-w-3xl text-base sm:text-lg lg:text-2xl opacity-90">
            {trek.summary.trim()}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm sm:text-base">
              {price}
            </Badge>
            <Badge
              variant="outline"
              className="text-sm sm:text-base bg-[var(--badge-duration-bg)] !border-transparent text-neutral-900"
            >
              {trek.durationDays} days
            </Badge>
          </div>
        </div>

        <svg
          className="absolute -bottom-[1px] left-0 w-full translate-y-1"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <polygon points="0,10 100,0 100,10" className="fill-white" />
        </svg>
      </section>

      {/* THUMBNAIL CAROUSEL ------------------------------------- */}
      {images.length > 1 && (
        <section className="py-10 pl-8">
          <div className="relative mx-auto max-w-6xl">
            <div ref={thumbRef} className="overflow-hidden px-6">
              <div className="flex gap-4">
                {images.map(({ url, id, alt }, i) => (
                  <div
                    key={`${id ?? url}-thumb-${i}`}
                    className="relative h-40 w-64 flex-[0_0_auto] overflow-hidden rounded-2xl"
                  >
                    <Image src={url} alt={alt ?? ''} fill sizes="256px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <Button
              size="icon"
              variant="secondary"
              onClick={scrollPrev}
              className="absolute -left-7 top-1/2 -translate-y-1/2 "
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={scrollNext}
              className="absolute -right-2 top-1/2 -translate-y-1/2 "
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      )}

      {/* FACTS GRID --------------------------------------------- */}
      {facts.length > 0 && (
        <section className="container pb-10 pl-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-2xl bg-gray-50 p-6">
            {facts.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-lg font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HIGHLIGHTS --------------------------------------------- */}
      <section className="container py-10 pl-3">
        <h2 className="mb-5 text-2xl font-semibold lg:text-3xl">Trip highlights</h2>
        <div className="flex flex-wrap gap-2">
          {trek.highlights?.map(({ value, id }) => (
            <Badge
              key={id}
              variant="secondary"
              className="text-sm lg:text-base bg-[var(--badge-highlight-bg)]"
            >
              {value}
            </Badge>
          ))}
        </div>
      </section>

      {/* ITINERARY ---------------------------------------------- */}
      {trek.itinerary?.length ? (
        <section className="container pb-16 pl-3">
          <h2 className="mb-5 text-2xl font-semibold lg:text-3xl">Itinerary</h2>
          <Accordion type="single" collapsible>
            {trek.itinerary.map(({ day, title, description, image, id }) => (
              <AccordionItem key={id} value={`day-${day}`}>
                <AccordionTrigger>
                  Day&nbsp;{day}:&nbsp;{title}
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {(image as any)?.url && (
                    <Image
                      src={(image as any).url}
                      alt={(image as any).alt ?? ''}
                      width={300}
                      height={300}
                      className="rounded-xl object-cover"
                    />
                  )}
                  <p className="leading-relaxed whitespace-pre-wrap">{description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : null}

      {/* INCLUDED & EXCLUDED ------------------------------------ */}
      <section className="container pb-16 pl-3">
        <h2 className="mb-5 text-2xl font-semibold lg:text-3xl">What’s included</h2>
        <ul className="grid list-disc gap-2 pl-6 font-semibold text-base lg:text-lg">
          {trek.included.map(({ item, id }) => (
            <li key={id}>{item}</li>
          ))}
        </ul>
      </section>

      {trek.excluded?.length ? (
        <section className="container pb-16 pl-3">
          <h2 className="mb-5 text-2xl font-semibold lg:text-3xl">Not included</h2>
          <ul className="grid list-disc gap-2 pl-6 font-semibold text-base lg:text-lg">
            {trek.excluded.map(({ item, id }) => (
              <li key={id}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* STICKY CTA --------------------------------------------- */}
      <div className="fixed bottom-0 left-6 z-40 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BookNowSheet
            bookData={bookData}
            bookNowButtonColor={settings?.hero_button_color}
            bookNowButtonText={stickyPrefix + price}
          />
        </motion.div>
      </div>
    </main>
  )
}
