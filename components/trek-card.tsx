'use client'

import Image from 'next/image'
import { CSSProperties, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

import { Media, Trek, TreksPage, BookingSheet } from '@/payload-types'
import { PriceBadge } from '@/lib/utils'
import BookNowSheet from './book-sheet'

/* -------------------------------------------------------------------------- */
/*  helpers                                                                   */
/* -------------------------------------------------------------------------- */
const pickRandomImage = (t: Trek): Media => {
  const imgs = [t.heroImage as Media, ...((t.gallery as Media[] | undefined) ?? [])].filter(Boolean)
  return imgs[Math.floor(Math.random() * imgs.length)] as Media
}

/* -------------------------------------------------------------------------- */
/*  preview card                                                              */
/* -------------------------------------------------------------------------- */
function TrekPreview({ trek }: { trek: Trek }) {
  const hero = useMemo(() => pickRandomImage(trek), [trek.id])
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative h-40 w-full overflow-hidden">
        {!loaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
        <Image
          src={hero.url ?? ''}
          alt={hero.alt ?? trek.name}
          fill
          sizes="320px"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {trek.summary && (
        <p className="w-full px-4 text-sm leading-snug text-muted-foreground line-clamp-4">
          {trek.summary}
        </p>
      )}

      {trek.included?.length && (
        <div className="w-full px-4 pb-4">
          <h4 className="text-xs font-semibold mb-1 text-emerald-900/90">Included</h4>
          <ul className="list-disc list-inside space-y-0.5 text-xs text-muted-foreground">
            {trek.included.slice(0, 3).map((inc) => (
              <li key={inc.id}>{inc.item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  main trek card                                                            */
/* -------------------------------------------------------------------------- */
export default function TrekCard({
  trek,
  treksSetting,
  bookData,
}: {
  trek: Trek
  treksSetting: TreksPage
  bookData: BookingSheet
}) {
  const router = useRouter()
  const hero = trek.heroImage as Media
  const [heroLoaded, setHeroLoaded] = useState(false)

  return (
    <HoverCard openDelay={100} closeDelay={60}>
      {/* phone → side-padding 1rem; ≥sm → flush */}
      <div
        className="relative mx-4 sm:mx-0 h-full rounded-xl border border-gray-300 bg-white shadow-lg
                   flex flex-col cursor-pointer transition hover:shadow-xl
                   focus-within:ring-2 ring-offset-2 ring-emerald-600 "
      >
        {/* trigger = image + heading + chips */}
        <HoverCardTrigger asChild>
          <div tabIndex={0} onClick={() => router.push(`/treks/${trek.slug}`)}>
            <div className="relative h-60 md:h-72 lg:h-72 w-full">
              {!heroLoaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
              <Image
                src={hero.url ?? ''}
                alt={hero.alt ?? trek.name}
                fill
                sizes="(max-width:768px) 88vw, 28vw"
                onLoad={() => setHeroLoaded(true)}
                className={`object-cover transition-opacity duration-300 rounded-lg ${
                  heroLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className="absolute bottom-2 right-3 text-white font-black text-lg">
                {PriceBadge({ currency: trek.price.currency, amount: trek.price.amount })}
              </div>
            </div>

            <h2 className="px-4 pt-4 font-bold text-lg sm:text-xl">{trek.name}</h2>

            <div className="flex flex-wrap gap-2 px-4 py-2">
              {trek.highlights?.slice(0, 3).map((hl) => (
                <span
                  key={hl.id}
                  className="rounded-full bg-emerald-100 text-emerald-900
                             px-4 py-1 text-xs font-semibold whitespace-nowrap"
                >
                  {hl.value}
                </span>
              ))}
            </div>
          </div>
        </HoverCardTrigger>

        <div className="flex-grow" />

        {/* button row (not part of trigger) */}
        <div
          className="flex gap-2 px-4 pb-4 items-center justify-around "
          style={
            { '--learn-color': treksSetting.treks_card_learn_more_button_color } as CSSProperties
          }
        >
          <Button
            size="lg"
            className="flex-1 max-w-[200px] font-bold bg-[color:var(--learn-color)]
                       hover:bg-[color:var(--learn-color)] hover:brightness-110 cursor-pointer hover:scale-105 transition-all"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/treks/${trek.slug}`)
            }}
          >
            {treksSetting.treks_card_learn_more_button_text}
          </Button>

          <div onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
            <BookNowSheet
              bookData={bookData}
              bookNowButtonColor={treksSetting.treks_card_book_now_button_color}
            />
          </div>
        </div>
      </div>

      {/* preview lifted fully clear of the tile + phone side-padding */}
      <HoverCardContent
        side="top"
        sideOffset={30} /* approx card height so preview clears it */
        align="center"
        className="z-50 mx-4 sm:mx-0 w-80 rounded-xl overflow-hidden shadow-xl border p-0"
      >
        <TrekPreview trek={trek} />
      </HoverCardContent>
    </HoverCard>
  )
}
