import type { GlobalConfig } from 'payload'

const FooterConfig: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Settings',

  admin: {
    group: 'Site Content',
    description: 'Logo text, quick links, social URLs, colours and footer badges.',
  },

  access: { read: () => true },

  fields: [
    /* LOGO -------------------------------------------------- */
    {
      name: 'brand_logo',

      label: 'Brand Logo ',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the logo',
      },
    },

    /* QUICK NAV -------------------------------------------- */
    {
      name: 'quick_links',
      label: 'Quick Links',
      type: 'array',
      minRows: 1,
      defaultValue: [
        { label: 'About', section_id: '#about' },
        { label: 'Treks', section_id: '#treks' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'section_id', label: 'Section ID or URL', type: 'text', required: true },
      ],
    },

    /* SOCIAL ----------------------------------------------- */
    {
      name: 'social',
      label: 'Social URLs',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
          defaultValue: 'https://facebook.com/',
        },
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
          defaultValue: 'https://instagram.com/',
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp URL',
          type: 'text',
          defaultValue: 'https://wa.me/0000000000',
        },
      ],
    },

    /* COLOURS ---------------------------------------------- */
    { name: 'accent_color', label: 'Accent Colour', type: 'text', defaultValue: '#047857' },
    {
      name: 'hover_bg_color',
      label: 'Icon Hover Background',
      type: 'text',
      defaultValue: '#d1fae5',
    },

    /* NEW – CERTIFICATION BADGES --------------------------- */
    {
      name: 'cert_badges',
      label: 'Certification Badges',
      type: 'array',
      minRows: 0,
      admin: { description: 'Logo + one line text for association badges.' },
      fields: [
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload', // uses existing Media collection
          relationTo: 'media',
        },
        {
          name: 'text',
          label: 'Description',
          type: 'textarea',
          required: true,
          admin: { rows: 3 },
        },
      ],
    },

    /* COPYRIGHT -------------------------------------------- */
    {
      name: 'copyright_name',
      label: 'Copyright Name',
      type: 'text',
      defaultValue: 'TrekSoulNepal',
    },
  ],
}

export default FooterConfig
