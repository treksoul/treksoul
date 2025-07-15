// import type { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   access: {
//     read: () => true,
//   },
//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       required: true,
//     },
//   ],
//   upload: true,
// }

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },

  // Let the Cloudinary storage adapter handle files
  upload: {
    disableLocalStorage: true,
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
