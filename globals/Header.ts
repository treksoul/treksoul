// src/globals/HeaderConfig.ts
import type { GlobalConfig } from 'payload';

const HeaderConfig: GlobalConfig = {
  slug: 'header',
  label: 'Header Settings',

  admin: {
    description: 'Configure everything that appears in the site header.',
  },

  fields: [
    /* --------------------------------------------------------------
     * BRANDING
     * ------------------------------------------------------------ */
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the company logo. It will be displayed in the header.',
      },
    },

    /* --------------------------------------------------------------
     * BOOK‑NOW BUTTON
     * ------------------------------------------------------------ */
    {
      name: 'Book_now_button_text',
      label: 'Book Now Button Text',
      type: 'text',
      required: true,
      admin: {
        description: 'Text that appears on the “Book Now” button.',
      },
    },
    {
      name: 'Book_now_button_color',
      label: 'Book Now Button Color',
      type: 'text',
      required: true,
      admin: {
        description:
          'Color of the “Book Now” button (use a HEX code, RGB value, or valid CSS color name).',
      },
    },

    /* --------------------------------------------------------------
     * NAVIGATION LINKS
     * ------------------------------------------------------------ */
    {
      name: 'navigation_links',
      label: 'Navigation Links',
      type: 'array',
      admin: {
        description: 'Add, remove, or reorder the links that appear in the header navigation.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Text displayed for the navigation link.',
          },
        },
        {
          name: 'section_id',
          label: 'Section ID',
          type: 'select',
          required: true,
          options: [
            { label: 'Home', value: 'home' },
            { label: 'About Us', value: 'about' },
            { label: 'Contact Us', value: 'contact' },
            { label: 'Treks', value: 'treks' },
          ],
          admin: {
            description:
              'Section to scroll to when the link is clicked. Make sure each ID exists on the page.',
          },
        },
      ],
    },

    /* --------------------------------------------------------------
     * NAV LINK HOVER COLOR
     * ------------------------------------------------------------ */
    {
      name: 'Navigation_links_hover_color',
      label: 'Navigation Link Hover Color',
      type: 'text',
      admin: {
        description:
          'Color applied to navigation links on hover (HEX code, RGB value, or valid CSS color name).',
      },
    },
  ],
};

export default HeaderConfig;
