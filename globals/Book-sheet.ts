// // src/globals/BookingSheet.ts
// import type { GlobalConfig } from 'payload'

// /**
//  * Book-now CTA settings
//  * ------------------------------------------------------------
//  * • Editors set button text / colour and contact channels.
//  * • Trek dropdown is built by selecting records from the `treks`
//  *   collection (relationship → hasMany).
//  * • Public read access so your Next.js front-end can fetch it.
//  */
// const BookingSheetConfig: GlobalConfig = {
//   slug: 'booking_sheet',
//   label: 'Book-now CTA settings',

//   admin: {
//     group: 'Site content',
//     description:
//       'Button text / colour plus phone, WhatsApp, email and which treks appear in the booking form.',
//   },

//   access: { read: () => true }, // public for front-end

//   fields: [
//     /* -------------------------------------------------------- */
//     /* BUTTON                                                   */
//     /* -------------------------------------------------------- */
//     {
//       name: 'button_text',
//       label: 'Button text',
//       type: 'text',
//       required: true,
//       defaultValue: 'Book now',
//     },
//     {
//       name: 'button_color',
//       label: 'Button colour (HEX)',
//       type: 'text',
//       required: true,
//       defaultValue: '#047857', // emerald-700
//     },

//     /* -------------------------------------------------------- */
//     /* CONTACT INFORMATION                                      */
//     /* -------------------------------------------------------- */
//     {
//       name: 'contact',
//       label: 'Contact details',
//       type: 'group',
//       fields: [
//         {
//           name: 'phone_number',
//           label: 'Phone number (E.164)',
//           type: 'text',
//           required: true,
//           admin: { placeholder: '+9779812345678' },
//         },
//         {
//           name: 'whatsapp_number',
//           label: 'WhatsApp number (if different)',
//           type: 'text',
//         },
//         {
//           name: 'email_address',
//           label: 'Booking email',
//           type: 'text',
//           required: true,
//           admin: { placeholder: '[email protected]' },
//         },
//       ],
//     },

//     /* -------------------------------------------------------- */
//     /* TREK OPTIONS (dynamic relationship)                      */
//     /* -------------------------------------------------------- */
//     // {
//     //   name: 'treks',
//     //   label: 'Trek dropdown options',
//     //   type: 'relationship',

//     //   relationTo: 'treks', // ← connects to the Treks collection
//     //   hasMany: true,
//     //   required: true,
//     //   admin: {
//     //     description: 'Select which treks should appear in the booking-form dropdown.',
//     //   },
//     // },
//     {
//       name: 'treks',
//       label: 'Trek dropdown options',
//       type: 'relationship',
//       relationTo: 'treks',
//       hasMany: true,
//       required: true,

//       /* Auto-fill on first create */
//       defaultValue: async ({ req }) => {
//         const allTreks = await req.payload.find({
//           collection: 'treks',
//           limit: 0,
//           depth: 0,
//         })
//         return allTreks.docs.map((t) => t.id)
//       },

//       admin: {
//         description: 'This list auto-populates with *all* treks; no manual selection needed.',
//         disabled: true, // prevent editors from editing by hand (optional)
//       },
//     },
//   ],
// }

// export default BookingSheetConfig

import type { GlobalConfig } from 'payload'

/**
 * Book-now CTA settings
 * ------------------------------------------------------------
 * • Editors set button text / colour and contact channels.
 * • Gmail SMTP creds are kept in process.env, NOT in Payload.
 */
const BookingSheetConfig: GlobalConfig = {
  slug: 'booking_sheet',
  label: 'Book-now CTA settings',

  admin: {
    group: 'Site content',
    description: 'Button copy / colours, phone & WhatsApp numbers, public e-mail and trek list.',
  },

  access: { read: () => true },

  fields: [
    /* BUTTON ------------------------------------------------ */
    {
      name: 'button_text',
      label: 'Button text',
      type: 'text',
      required: true,
      defaultValue: 'Book now',
    },
    {
      name: 'button_color',
      label: 'Button colour (HEX)',
      type: 'text',
      required: true,
      defaultValue: '#047857', // emerald-700
    },

    /* CONTACT INFO ----------------------------------------- */
    {
      name: 'contact',
      label: 'Contact details',
      type: 'group',
      fields: [
        {
          name: 'phone_number',
          label: 'Phone number (E.164)',
          type: 'text',
          required: true,
        },
        { name: 'whatsapp_number', label: 'WhatsApp number', type: 'text' },
        {
          name: 'email_address',
          label: 'Public booking email (mailto)',
          type: 'text',
          required: true,
        },
      ],
    },

    /* TREK DROPDOWN (auto-populates) ----------------------- */
    {
      name: 'treks',
      label: 'Trek dropdown options',
      type: 'relationship',
      relationTo: 'treks',
      hasMany: true,
      required: true,
      defaultValue: async ({ req }) => {
        const all = await req.payload.find({ collection: 'treks', limit: 0 })

        return all.docs.map((d) => d.id)
      },
      admin: {
        description: 'Auto-lists all treks; disabled for manual editing.',
        disabled: true,
      },
    },
  ],
}

export default BookingSheetConfig
