import type { GlobalConfig } from 'payload'

/**
 * Trek-detail page theming
 * --------------------------------------------------------------
 * • Public read so the Next.js front-end can fetch without auth.
 * • Defaults match the original hard-coded look.
 */
const TrekDetailSettings: GlobalConfig = {
  slug: 'trek_detail_settings',
  label: 'Trek-detail Page Settings',

  admin: {
    group: 'Treks Content',
    description:
      'Text and colours for the big “Book” buttons, the duration badge, and the trip-highlight badges.',
  },

  access: { read: () => true },

  fields: [
    /* HERO BUTTON ------------------------------------------------ */
    {
      name: 'hero_button_text',
      label: 'Hero button text',
      type: 'text',
      defaultValue: 'Book now',
    },
    {
      name: 'hero_button_color',
      label: 'Hero button background',
      type: 'text',
      required: true,
      defaultValue: '#ffffff',
    },

    /* STICKY BUTTON --------------------------------------------- */
    {
      name: 'sticky_button_text',
      label: 'Sticky button text (prefix)',
      type: 'text',
      defaultValue: 'Book this trek – ',
    },
    {
      name: 'sticky_button_color',
      label: 'Sticky button background',
      required: true,
      type: 'text',
      defaultValue: '#2563eb', // Tailwind blue-600
    },

    /* BADGES ----------------------------------------------------- */
    {
      name: 'duration_badge_color',
      label: 'Duration badge background',
      type: 'text',
      defaultValue: '#ffffff', // keeps original outline look
    },
    {
      name: 'highlight_badge_color',
      label: 'Trip-highlight badge background',
      type: 'text',
      defaultValue: '#e2e8f0', // Tailwind gray-200
    },
  ],
}

export default TrekDetailSettings
