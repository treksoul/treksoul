// src/globals/LandingConfig.ts
import type { GlobalConfig } from 'payload';

const LandingConfig: GlobalConfig = {
  slug: 'landing_page',
  label: 'Landing Page Settings',

  admin: {
    description: 'Configure everything that appears on the landing / hero section of your site.',
  },

  fields: [
    /* --------------------------------------------------------------
     * HERO BACKGROUND
     * ------------------------------------------------------------ */
    {
      name: 'landing_page_background_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Background image for the landing hero. Recommended ratio ≈ 16 : 9.',
      },
    },

    /* --------------------------------------------------------------
     * SEARCH BAR COPY
     * ------------------------------------------------------------ */
    {
      name: 'Search_bar_heading',
      label: 'Search Bar Heading',
      type: 'text',
      admin: {
        description: 'Headline shown directly above the search bar.',
      },
    },
    {
      name: 'Search_bar_placeholder',
      label: 'Search Bar Placeholder',
      type: 'text',
      admin: {
        description: 'Placeholder text that appears inside the search input.',
      },
    },
  ],
};

export default LandingConfig;
