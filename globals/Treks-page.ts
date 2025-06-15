// src/globals/TrekConfig.ts
import type { GlobalConfig } from 'payload'

const TrekConfig: GlobalConfig = {
  slug: 'treks_page',
  label: 'Treks Page Settings',

  admin: {
    group: 'Treks Content',
    description: 'Configure headings and button copy for the Treks page.',
  },

  fields: [
    /* --------------------------------------------------------------
     * PAGE HEADING
     * ------------------------------------------------------------ */
    {
      name: 'treks_page_heading',
      label: 'Treks Page Heading',
      type: 'text',
      admin: {
        description: 'Main heading displayed at the top of the Treks page.',
      },
    },

    /* --------------------------------------------------------------
     * CARD BUTTON TEXT
     * ------------------------------------------------------------ */

    {
      name: 'treks_card_learn_more_button_text',
      label: 'Learn More Button Text',
      type: 'text',
      admin: {
        description: 'Text displayed on the right button inside each trek card.',
      },
    },

    /* --------------------------------------------------------------
     * CARD BUTTON COLORS
     * ------------------------------------------------------------ */

    {
      name: 'treks_card_learn_more_button_color',
      label: 'Learn More Button Color',
      type: 'text',
      admin: {
        description:
          'Background color for the learn more button (HEX code, RGB value, or valid CSS color name).',
      },
    },
    {
      name: 'treks_card_book_now_button_color',
      label: 'Book now Button Color',
      type: 'text',
      required: true,
      admin: {
        description:
          'Background color for the learn more button (HEX code, RGB value, or valid CSS color name).',
      },
    },
  ],
}

export default TrekConfig
