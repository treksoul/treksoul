'use client'
import { Button } from '@/components/ui/button'
import { BookingSheet, Header, Media } from '@/payload-types'
import Link from 'next/link'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { MenuIcon, XIcon } from 'lucide-react'
import { useSectionObserver } from '@/hooks/useSection'
import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import BookNowSheet from './book-sheet'
import Image from 'next/image'

export function MobileMenu({
  headerData,
  bookData,
}: {
  headerData: Header
  bookData: BookingSheet
}) {
  const active = useSectionObserver(
    headerData.navigation_links?.map((link) => link.section_id) || [],
  )

  return (
    <header className="fixed top-0 z-50 w-full inset-x-0 bg-white shadow-md">
      <Sheet>
        <div className="flex justify-between  px-4 py-1">
          <Link
            href="#home"
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
          <div className="flex gap-x-3 items-center">
            <BookNowSheet
              bookData={bookData}
              bookNowButtonColor={headerData.Book_now_button_color}
            />
            <SheetTrigger asChild>
              <MenuIcon className="w-6 h-6 cursor-pointer " strokeWidth={3} />
            </SheetTrigger>
          </div>
        </div>

        <SheetContent side="top" overlay={false} hideXIcon className=" h-[60vh]">
          <SheetTitle />
          <SheetHeader>
            <div className="flex justify-between ">
              <Link
                href="#home"
                aria-label="Home"
                className="block text-center text-2xl font-black tracking-tight text-emerald-700"
              >
                <Image
                  src={(headerData.logo as any).url}
                  alt="Treksoul Nepal"
                  width={60}
                  height={60}
                  className="size-[80px] md:size-[100px] "
                  priority={true}
                />
              </Link>
              <div className="flex gap-x-3 items-center">
                <BookNowSheet
                  bookData={bookData}
                  bookNowButtonColor={headerData.Book_now_button_color}
                />
                <SheetClose asChild>
                  <XIcon className=" cursor-pointer " strokeWidth={3} width={25} height={25} />
                </SheetClose>
              </div>
            </div>
          </SheetHeader>
          <nav>
            <ul>
              {headerData.navigation_links &&
                headerData.navigation_links.map((item) => {
                  return (
                    <li
                      key={item.label}
                      style={
                        {
                          '--nav-hover-active-color': headerData.Navigation_links_hover_color,
                        } as CSSProperties
                      }
                      className={cn('p-2 hover:text-[color:var(--nav-hover-active-color)]', {
                        'text-[color:var(--nav-hover-active-color)]': item.section_id === active,
                      })}
                    >
                      <SheetClose asChild>
                        <a
                          href={`#${item.section_id}`}
                          className="text-2xl font-black"
                          onClick={() => {}}
                        >
                          {item.label}
                        </a>
                      </SheetClose>
                    </li>
                  )
                })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

// export default function SiteHeader() {
//   return (
//     <header
//       className="
//         fixed inset-x-0 top-0 z-50          /* stay on top of everything */
//         h-16 md:h-20                        /* ← pick the height you want */
//         flex items-center
//         bg-white/90 dark:bg-zinc-900/80     /* translucent backdrop */
//         backdrop-blur-md backdrop-saturate-150
//         shadow-sm                           /* subtle shadow so it never “blends in” */
//         px-4 md:px-8
//       "
//     >
//       {/* ⬇ your row */}
//       <div className="flex w-full items-center justify-between gap-4">
//         <span className="text-2xl font-extrabold text-primary">TrekSoulNepal</span>

//         <button className="hidden lg:block btn-primary">Book now</button>

//         {/* hamburger for small screens */}
//         <button className="lg:hidden">
//           <span className="sr-only">Open menu</span>
//           <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>
//     </header>
//   )
// }
