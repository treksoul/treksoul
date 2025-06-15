// src/globals/AboutConfig.ts
import type { GlobalConfig } from 'payload';

const AboutConfig: GlobalConfig = {
  slug: 'about_us',                 // ← slug you’ll query from Next.js
  label: 'About Us page settings',

  admin: {
    group: 'Site content',
    description: 'Edit the “About Us” section and FAQ that appear on the landing page.',
  },

  access: { read: () => true },     // make it public‑read for the front‑end

  fields: [
    /* TAGLINE ------------------------------------------------------- */
    {
      name: 'heading',
      label: 'Main heading',
      type: 'text',
      required: true,
      defaultValue: 'About TrekSoulNepal',
    },
    {
      name: 'subheading',
      label: 'Short tagline / paragraph',
      type: 'textarea',
      required: true,
      defaultValue:
        'Locally owned & operated since 2012, we connect curious travellers with the Himalaya’s most authentic trails—while supporting mountain communities through fair wages and eco‑friendly practices.',
    },

    /* DIFFERENTIATOR BULLETS --------------------------------------- */
    {
      name: 'bullets',
      label: 'Differentiator bullet points',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Bullet', plural: 'Bullets' },
      admin: { description: 'Add or remove selling‑point bullets.' },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Bullet text',
        },
      ],
    },

    /* FAQ / ACCORDION --------------------------------------------- */
    {
      name: 'faqs',
      label: 'FAQ items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'FAQ item', plural: 'FAQ items' },
      admin: { description: 'Questions show as accordion headings.' },
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea', // use "richText" if you prefer WYSIWYG
          required: true,
        },
      ],
    },
  ],
};

export default AboutConfig;
