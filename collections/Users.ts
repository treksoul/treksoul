// collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },

  // makes the collection the auth provider
  auth: true,

  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor', // every new account is an editor
      options: ['admin', 'editor'],

      // only admins are allowed to promote/demote
      access: {
        read: () => true,
        update: ({ req }) => req.user?.role === 'admin',
      },
    },

    /* any extra profile fields go here */
  ],
}
