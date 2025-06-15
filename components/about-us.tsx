'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import type { AboutUs as AboutUsType } from '@/payload-types'

interface Props {
  aboutData: AboutUsType
}

export default function AboutUsClient({ aboutData }: Props) {
  const {
    heading = 'About TrekSoulNepal',
    subheading = '',
    bullets = [],
    faqs = [],
  } = aboutData ?? {}

  return (
    <section id="about" className=" pt-12 pb-1 space-y-10 px-2">
      {/* Tagline */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">{heading}</h2>
        {subheading && <p className="text-sm text-gray-600 leading-relaxed">{subheading}</p>}
      </div>

      {/* Differentiator bullets */}
      {bullets && bullets.length > 0 && (
        <ul className="space-y-4">
          {bullets.map(({ text }, idx) =>
            text ? (
              <li key={idx} className="flex items-start gap-2 text-base leading-snug">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" />
                {text}
              </li>
            ) : null,
          )}
        </ul>
      )}

      {/* FAQ accordion */}
      {faqs && faqs.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(({ question, answer }, idx) =>
            question && answer ? (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b">
                <AccordionTrigger className=" py-4 text-left font-medium text-base">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-base leading-relaxed">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ) : null,
          )}
        </Accordion>
      )}
    </section>
  )
}
