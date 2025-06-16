// 'use client'

// import { useState, useEffect, useRef, FormEvent, InputHTMLAttributes, CSSProperties } from 'react'
// import axios from 'axios'
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
// import { Button } from '@/components/ui/button'
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from '@/components/ui/select'
// import { toast } from 'sonner'
// import { Phone, MessageCircle, X } from 'lucide-react'
// import clsx from 'clsx'
// import type { BookingSheet } from '@/payload-types'

// type ContactMethod = 'call' | 'whatsapp' | 'email'

// export default function BookNowSheet({
//   bookData,
//   bookNowButtonColor,
//   bookNowButtonText,
// }: {
//   bookData: BookingSheet
//   bookNowButtonColor: string
//   bookNowButtonText?: string
// }) {
//   /* ------- grab trek names once ------- */
//   const [treks, setTreks] = useState<string[]>([])
//   useEffect(() => {
//     ;(async () => {
//       const { data } = await axios.get('/api/treks')
//       setTreks(data.docs.map((t: any) => t.name))
//     })()
//   }, [])

//   /* ------- payload values ------- */
//   const phone = bookData.contact?.phone_number ?? ''
//   const waNum = bookData.contact?.whatsapp_number || phone

//   /* ------- local state ------- */
//   const [open, setOpen] = useState(false)
//   const [isTouch, setIsTouch] = useState(true)
//   const [method, setMethod] = useState<ContactMethod>('call')
//   const [trekName, setTrekName] = useState<string | undefined>()
//   const firstFocus = useRef<HTMLButtonElement | null>(null)

//   useEffect(() => {
//     if (typeof window !== 'undefined') setIsTouch(matchMedia('(pointer:coarse)').matches)
//   }, [])
//   useEffect(() => {
//     if (open && firstFocus.current) firstFocus.current.focus()
//   }, [open])

//   /* ------- helper strings ------- */
//   const bodyText = trekName ? `I want to book the ${trekName} trek` : 'I want to book a trek'
//   const waURL =
//     waNum && `https://wa.me/${waNum.replace(/[^\d]/g, '')}?text=${encodeURIComponent(bodyText)}`

//   /* ------- submit handler ------- */
//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     const form = e.currentTarget

//     const toastId = toast.success('Enquiry sent! We’ll reply shortly.')

//     const ok = await fetch('/api/enquiry', {
//       method: 'POST',
//       body: new FormData(form),
//     }).then((r) => r.ok)

//     if (ok) {
//       form.reset()
//       setTrekName(undefined)
//       setOpen(false)
//     } else {
//       toast.error('Server error – please try again.', { id: toastId })
//     }
//   }

//   /* ------- UI ------- */
//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button
//           size="lg"
//           /* stop ALL pointer/hover events from bubbling so
//              the parent HoverCard never opens & cards never navigate */
//           onClick={(e) => e.stopPropagation()}
//           onPointerEnter={(e) => e.stopPropagation()}
//           onPointerOver={(e) => e.stopPropagation()}
//           onPointerMove={(e) => e.stopPropagation()}
//           style={{ '--book-now-button-color': bookNowButtonColor } as CSSProperties}
//           className="z-[100] my-4 cursor-pointer bg-[color:var(--book-now-button-color)]
//                      p-6 text-lg font-bold hover:scale-105 transition-all
//                      hover:bg-[color:var(--book-now-button-color)]"
//         >
//           {bookNowButtonText || 'Book now'}
//         </Button>
//       </SheetTrigger>

//       <SheetContent
//         side={isTouch ? 'bottom' : 'right'}
//         className="flex flex-col overflow-y-auto rounded-t-2xl border"
//         hideXIcon
//         overlay
//       >
//         <SheetTitle />
//         {/* top bar */}
//         <header className="flex items-center justify-between px-6 pt-6">
//           <h2 className="text-lg font-bold">Book your trek</h2>
//           <Button
//             ref={firstFocus}
//             variant="ghost"
//             size="icon"
//             className="size-8"
//             onClick={() => setOpen(false)}
//           >
//             <X className="size-4" />
//           </Button>
//         </header>

//         {/* quick actions */}
//         <div className="mx-auto mt-6 flex w-max overflow-hidden rounded-full border">
//           <ActionChip
//             active={method === 'call'}
//             label="Call"
//             Icon={Phone}
//             onClick={() => {
//               setMethod('call')
//               if (phone) window.location.href = `tel:${phone}`
//             }}
//           />
//           <ActionChip
//             active={method === 'whatsapp'}
//             label="WhatsApp"
//             Icon={MessageCircle}
//             onClick={() => {
//               setMethod('whatsapp')
//               if (waURL) window.open(waURL, '_blank', 'noopener,noreferrer')
//             }}
//           />
//         </div>

//         <Divider />

//         {/* form */}
//         <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-8 pt-6 text-sm">
//           <Input label="Your name" name="name" required />
//           <Input label="Email address" name="email" type="email" required />

//           <Select name="trek" value={trekName} onValueChange={setTrekName} required>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select trek" />
//             </SelectTrigger>
//             <SelectContent>
//               {treks.map((name) => (
//                 <SelectItem key={name} value={name}>
//                   {name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Input label="Preferred date" name="date" type="date" />

//           <Button
//             type="submit"
//             className="w-full bg-emerald-600 font-semibold"
//             onClick={() => setOpen(false)}
//           >
//             Send enquiry
//           </Button>
//         </form>
//       </SheetContent>
//     </Sheet>
//   )
// }

// /* ----------------------- helpers ----------------------- */
// function ActionChip({
//   active,
//   label,
//   Icon,
//   onClick,
// }: {
//   active: boolean
//   label: string
//   Icon: typeof Phone
//   onClick: () => void
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={clsx(
//         'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
//         'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600',
//         active ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-50',
//       )}
//     >
//       <Icon className="size-4" /> {label}
//     </button>
//   )
// }

// function Divider() {
//   return (
//     <div className="relative mt-8 px-6">
//       <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-2 text-xs text-muted-foreground">
//         or send us details
//       </span>
//       <div className="h-px w-full bg-muted" />
//     </div>
//   )
// }

// function Input({
//   label,
//   className,
//   ...props
// }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
//   const id = props.id ?? label.toLowerCase().replace(/\s+/g, '-')
//   return (
//     <div className="relative">
//       <input
//         id={id}
//         {...props}
//         placeholder=" "
//         className={clsx(
//           'peer h-12 w-full rounded-md border border-gray-300 bg-transparent px-3 pt-6 text-sm',
//           'placeholder-transparent shadow-inner focus:border-emerald-500 focus:outline-none',
//           className,
//         )}
//       />
//       <label
//         htmlFor={id}
//         className="absolute left-3 top-3 origin-[0] -translate-y-2 scale-75 transform text-gray-500 transition-all
//                    peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100
//                    peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-500"
//       >
//         {label}
//       </label>
//     </div>
//   )
// }

'use client'

import {
  useState,
  useEffect,
  useRef,
  FormEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  CSSProperties,
} from 'react'
import axios from 'axios'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Phone, MessageCircle, X } from 'lucide-react'
import clsx from 'clsx'
import type { BookingSheet } from '@/payload-types'

type ContactMethod = 'call' | 'whatsapp' | 'email'

export default function BookNowSheet({
  bookData,
  bookNowButtonColor,
  bookNowButtonText,
}: {
  bookData: BookingSheet
  bookNowButtonColor: string
  bookNowButtonText?: string
}) {
  /* ------- grab trek names once ------- */
  const [treks, setTreks] = useState<string[]>([])
  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get('/api/treks')
      setTreks(data.docs.map((t: any) => t.name))
    })()
  }, [])

  /* ------- payload values ------- */
  const phone = bookData.contact?.phone_number ?? ''
  const waNum = bookData.contact?.whatsapp_number || phone

  /* ------- local state ------- */
  const [open, setOpen] = useState(false)
  const [isTouch, setIsTouch] = useState(true)
  const [method, setMethod] = useState<ContactMethod>('call')
  const [trekName, setTrekName] = useState<string | undefined>()
  const firstFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') setIsTouch(matchMedia('(pointer:coarse)').matches)
  }, [])
  useEffect(() => {
    if (open && firstFocus.current) firstFocus.current.focus()
  }, [open])

  /* ------- helper strings ------- */
  const bodyText = trekName ? `I want to book the ${trekName} trek` : 'I want to book a trek'
  const waURL =
    waNum && `https://wa.me/${waNum.replace(/[^\d]/g, '')}?text=${encodeURIComponent(bodyText)}`

  /* ------- submit handler ------- */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    const toastId = toast.success('Enquiry sent! We’ll reply shortly.')

    const ok = await fetch('/api/enquiry', {
      method: 'POST',
      body: new FormData(form),
    }).then((r) => r.ok)

    if (ok) {
      form.reset()
      setTrekName(undefined)
      setOpen(false)
    } else {
      toast.error('Server error – please try again.', { id: toastId })
    }
  }

  /* ------- UI ------- */
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          onPointerEnter={(e) => e.stopPropagation()}
          onPointerOver={(e) => e.stopPropagation()}
          onPointerMove={(e) => e.stopPropagation()}
          style={{ '--book-now-button-color': bookNowButtonColor } as CSSProperties}
          className="z-[100] my-4 cursor-pointer bg-[color:var(--book-now-button-color)]
                    text-lg font-bold py-5 sm:py-6 transition-all hover:scale-105
                     hover:bg-[color:var(--book-now-button-color)]"
        >
          {bookNowButtonText || 'Book now'}
        </Button>
      </SheetTrigger>

      <SheetContent
        side={isTouch ? 'bottom' : 'right'}
        className="flex flex-col overflow-y-auto rounded-t-2xl border"
        hideXIcon
        overlay
      >
        <SheetTitle />
        {/* top bar */}
        <header className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-lg font-bold">Book your trek</h2>
          <Button
            ref={firstFocus}
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setOpen(false)}
          >
            <X className="size-4" />
          </Button>
        </header>

        {/* quick actions */}
        <div className="mx-auto mt-6 flex w-max overflow-hidden rounded-full border">
          <ActionChip
            active={method === 'call'}
            label="Call"
            Icon={Phone}
            onClick={() => {
              setMethod('call')
              if (phone) window.location.href = `tel:${phone}`
            }}
          />
          <ActionChip
            active={method === 'whatsapp'}
            label="WhatsApp"
            Icon={MessageCircle}
            onClick={() => {
              setMethod('whatsapp')
              if (waURL) window.open(waURL, '_blank', 'noopener,noreferrer')
            }}
          />
        </div>

        <Divider />

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-8 pt-6 text-sm">
          <Input label="Your name" name="name" required />
          <Input label="Email address" name="email" type="email" required />

          <Select name="trek" value={trekName} onValueChange={setTrekName} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select trek" />
            </SelectTrigger>
            <SelectContent>
              {treks.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input label="Preferred date" name="date" type="date" />

          {/* NEW free-text field */}
          <Textarea label="Questions / special requests" name="message" rows={4} />

          <Button
            type="submit"
            className="w-full bg-emerald-600 font-semibold"
            onClick={() => setOpen(false)}
          >
            Send enquiry
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

/* ----------------------- helpers ----------------------- */
function ActionChip({
  active,
  label,
  Icon,
  onClick,
}: {
  active: boolean
  label: string
  Icon: typeof Phone
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600',
        active ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-50',
      )}
    >
      <Icon className="size-4" /> {label}
    </button>
  )
}

function Divider() {
  return (
    <div className="relative mt-8 px-6">
      <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-2 text-xs text-muted-foreground">
        or send us details
      </span>
      <div className="h-px w-full bg-muted" />
    </div>
  )
}

function Input({
  label,
  className,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = props.id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="relative">
      <input
        id={id}
        {...props}
        placeholder=" "
        className={clsx(
          'peer h-12 w-full rounded-md border border-gray-300 bg-transparent px-3 pt-6 text-sm',
          'placeholder-transparent shadow-inner focus:border-emerald-500 focus:outline-none',
          className,
        )}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-3 origin-[0] -translate-y-2 scale-75 transform text-gray-500 transition-all
                   peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100
                   peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-500"
      >
        {label}
      </label>
    </div>
  )
}

function Textarea({
  label,
  className,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = props.id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="relative">
      <textarea
        id={id}
        {...props}
        placeholder=" "
        className={clsx(
          'peer w-full rounded-md border border-gray-300 bg-transparent px-3 pt-6 text-sm',
          'placeholder-transparent shadow-inner focus:border-emerald-500 focus:outline-none',
          className,
        )}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-3 origin-[0] -translate-y-2 scale-75 transform text-gray-500 transition-all
                   peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100
                   peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-500"
      >
        {label}
      </label>
    </div>
  )
}
