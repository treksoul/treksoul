import type { CollectionConfig } from 'payload'

const dayLabel = ({ data }: { data?: any }): string => `Day ${data?.day ?? '?'}`

const Treks: CollectionConfig = {
  slug: 'treks',
  labels: { singular: 'Trek', plural: 'Treks' },
  access: { read: () => true },

  admin: {
    group: 'Treks Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'durationDays', 'price.amount', 'difficulty'],
  },

  fields: [
    /* BASIC ------------------------------------------------------ */
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) =>
            (value || data?.name || '')
              .toLowerCase()
              .trim()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, ''),
        ],
      },
    },

    /* IMAGES ----------------------------------------------------- */
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: false,
    },
    { name: 'video', type: 'text', required: false },

    /* PRICE ------------------------------------------------------ */
    {
      name: 'price',
      type: 'group',
      required: true,
      fields: [
        { name: 'amount', type: 'number', min: 0, required: true },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'NPR',
          options: ['NPR', 'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD'],
          required: true,
        },
      ],
    },

    /* QUICK FACTS ----------------------------------------------- */
    { name: 'durationDays', type: 'number', min: 1, required: true },
    { name: 'distanceKm', type: 'number', min: 0, required: false },
    { name: 'maxAltitude', type: 'number', min: 0, required: false },
    {
      name: 'difficulty',
      type: 'select',
      options: ['Easy', 'Moderate', 'Challenging', 'Strenuous'],
      required: false,
    },
    {
      name: 'bestSeason',
      type: 'select',
      hasMany: true,
      options: ['Spring', 'Summer', 'Autumn', 'Winter'],
      required: false,
    },

    /* SUMMARY & HIGHLIGHTS -------------------------------------- */
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'highlights',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      required: false,
      fields: [{ name: 'value', type: 'text', required: true }],
    },

    /* ITINERARY -------------------------------------------------- */
    {
      name: 'itinerary',
      type: 'array',
      required: false,
      admin: { components: { RowLabel: dayLabel as any } }, // ← key fix
      fields: [
        { name: 'day', type: 'number', min: 1, required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },

    /* INCLUDED / EXCLUDED --------------------------------------- */
    {
      name: 'included',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'excluded',
      type: 'array',
      required: false,
      fields: [{ name: 'item', type: 'text', required: true }],
    },
  ],
}

export default Treks
