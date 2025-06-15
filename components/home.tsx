'use client'

import Image from 'next/image'
import { FormEvent } from 'react'
import { LandingPage } from '@/payload-types'
import TrekSearch from './trek-search'

export default function Hero({ landingPageData }: { landingPageData: LandingPage }) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  const backgroundImage = landingPageData.landing_page_background_image as any

  return (
    <>
      <section
        id="home"
        className="
          relative h-screen w-full overflow-hidden pr-4 
        [clip-path:url('#wave-clip')] flex flex-row justify-center items-start
        "
      >
        <Image
          src={backgroundImage.url}
          alt="Clouds over mountains"
          fill
          className="object-cover select-none "
          priority={true}
          style={{
            backgroundImage: 'url(/blur.jpg)',
            backgroundSize: 'cover',
          }}
        />

        <div
          className="
        relative z-[51] mt-36 mx-4 
        rounded-[32px] px-6 py-10
        bg-gradient-to-br from-emerald-700/90 to-teal-600/90
        backdrop-blur-sm 
       
        flex flex-col grow max-w-[700px]
      "
        >
          <h2 className="text-white text-2xl font-extrabold leading-tight">
            {landingPageData.Search_bar_heading}
          </h2>

          <form onSubmit={handleSubmit} className="mt-8">
            <TrekSearch
              placeholder={landingPageData.Search_bar_placeholder || 'Search for Nepal'}
            />
          </form>
        </div>
      </section>

      {/* ---------- CLIP‑PATH DEFINITIONS ---------- */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
            <path
              d="
              M0,0  L0,0.85
              C0.15,0.90 0.35,1 0.5,1
              C0.65,1 0.85,0.90 1,0.85  L1,0
              Z
            "
            />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}
