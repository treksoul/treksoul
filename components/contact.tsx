'use client'

import { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import type { Footer } from '@/payload-types'

interface Props {
  footerData: Footer
}

export default function FooterClient({ footerData }: Props) {
  const {
    /* unchanged props --------------------------------------------------- */
    quick_links = [],
    social = {},
    accent_color = '#047857',
    hover_bg_color = '#d1fae5',
    copyright_name = 'TrekSoulNepal',

    /* NEW (optional) ---------------------------------------------------- */
    cert_badges = [], // array of { logo: { url, alt }, text }
  } = footerData ?? {}

  const varStyle: CSSProperties = {
    '--accent-color': accent_color,
    '--hover-bg': hover_bg_color,
  } as CSSProperties

  return (
    <section id="contact" className="relative">
      {/* soft fade bridge */}
      <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-b from-transparent to-gray-50" />

      <footer className="border-t border-gray-200 bg-white" style={varStyle}>
        <div className="mx-auto max-w-sm px-4 py-10 space-y-8">
          {/* certification badges – centred & responsive icon sizes */}
          {cert_badges && cert_badges.length > 0 && (
            <div className="flex justify-center">
              <div
                className="
        grid gap-y-10
        sm:grid-cols-2 sm:gap-x-12
        lg:grid-cols-4 lg:gap-x-40
        place-items-center       /* ⬅ centres each cell */
      "
              >
                {cert_badges &&
                  cert_badges.map((data, i) => {
                    const { logo, text } = data as {
                      logo?: { url: string; alt?: string }
                      text: string
                    }
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center text-center gap-4 max-w-[18ch] "
                      >
                        {logo?.url && (
                          <Image
                            src={logo.url}
                            alt={logo.alt || 'badge'}
                            width={160}
                            height={160} /* high-res source */
                            className="
                h-8  w-8      /* phones           32 px */
                md:h-12 md:w-12 /* ≥ 768 px        48 px */
                lg:h-16 lg:w-16 /* ≥ 1024 px       64 px */
                xl:h-20 xl:w-20 /* ≥ 1280 px       80 px */
                object-contain flex-none
              "
                          />
                        )}
                        <p className="text-sm leading-5 text-gray-700">{text}</p>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

          <Link
            href="#home"
            aria-label="Home"
            className="flex text-center text-2xl font-black tracking-tight text-emerald-700 justify-center"
          >
            <Image
              src={(footerData.brand_logo as any).url}
              alt="Treksoul Nepal"
              width={60}
              height={60}
              className="size-[90px] md:size-[110px] "
            />
          </Link>
          {/* quick nav */}
          {quick_links && quick_links?.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              {quick_links.map(({ label, section_id }, i) => (
                <Link
                  key={i}
                  href={section_id || '#'}
                  style={{ '--nav-hover-active-color': 'var(--accent-color)' } as CSSProperties}
                  className="p-2 hover:text-[color:var(--nav-hover-active-color)] text-base font-medium"
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* social icons */}
          <div className="flex items-center justify-center gap-6">
            {social.facebook && (
              <Link
                href={social.facebook}
                aria-label="Facebook"
                className="rounded-full p-2 transition hover:bg-[color:var(--hover-bg)]"
              >
                <FaFacebookF className="h-5 w-5" style={{ color: 'var(--accent-color)' }} />
              </Link>
            )}
            {social.instagram && (
              <Link
                href={social.instagram}
                aria-label="Instagram"
                className="rounded-full p-2 transition hover:bg-[color:var(--hover-bg)]"
              >
                <FaInstagram className="h-5 w-5" style={{ color: 'var(--accent-color)' }} />
              </Link>
            )}
            {social.whatsapp && (
              <Link
                href={social.whatsapp}
                aria-label="WhatsApp"
                className="rounded-full p-2 transition hover:bg-[color:var(--hover-bg)]"
              >
                <FaWhatsapp className="h-5 w-5" style={{ color: 'var(--accent-color)' }} />
              </Link>
            )}
          </div>

          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} {copyright_name}. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  )
}
