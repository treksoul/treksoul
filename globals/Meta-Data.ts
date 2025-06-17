import type { GlobalConfig } from 'payload'

const SiteMetadata: GlobalConfig = {
  slug: 'siteMetadata',
  label: 'Site Metadata',

  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },

  fields: [
    /* ——— BASIC SEO ——— */
    { name: 'defaultTitle', type: 'text', required: true },
    { name: 'titleTemplate', type: 'text', defaultValue: '%s | TrekSoulNepal' },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 160,
    },
    { name: 'keywords', type: 'text', hasMany: true },
    { name: 'themeColor', type: 'text', defaultValue: '#008763' },

    /* ——— SOCIAL ——— */
    {
      name: 'ogImage',
      label: 'Default OG Image',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'twitterHandle', type: 'text' },

    /* ——— ICONS & MANIFEST ——— */
    {
      type: 'group',
      name: 'icons',
      label: 'Favicons / Manifest',
      fields: [
        {
          name: 'android192',
          label: 'android-chrome-192x192.png',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'android512',
          label: 'android-chrome-512x512.png',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'appleTouch',
          label: 'apple-touch-icon.png',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'favicon16',
          label: 'favicon-16x16.png',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'favicon32',
          label: 'favicon-32x32.png',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'faviconICO',
          label: 'favicon.ico',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'webManifest',
          label: 'site.webmanifest',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export default SiteMetadata
