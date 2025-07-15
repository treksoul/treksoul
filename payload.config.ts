// // storage-adapter-import-placeholder
// import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import path from 'path'
// import { buildConfig } from 'payload'
// import { fileURLToPath } from 'url'
// import sharp from 'sharp'
// // import { s3Storage } from '@payloadcms/storage-s3' // ✅ named export

// import { Users } from './collections/Users'

// import TreksCollectionConfig from './collections/Treks'

// import HeaderGlobalConfig from './globals/Header'
// import LandingGlobalPageConfig from './globals/Landing-page'
// import TreksGlobalConfig from './globals/Treks-page'
// import AboutUsConfig from './globals/About-us'
// import ContactConfig from './globals/Contact'
// import BookingSheetConfig from './globals/Book-sheet'
// import { Media } from './collections/Media'
// import TrekDetailSettings from './globals/TrekDetailSettings'
// import MetaDataConfig from './globals/Meta-Data'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

// export default buildConfig({
//   serverURL: process.env.SERVER_URL,
//   admin: {
//     user: Users.slug,
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//     livePreview: {
//       url: process.env.SERVER_URL,
//     },
//   },
//   collections: [TreksCollectionConfig, Users, Media],
//   globals: [
//     HeaderGlobalConfig,
//     LandingGlobalPageConfig,
//     TreksGlobalConfig,
//     AboutUsConfig,
//     ContactConfig,
//     BookingSheetConfig,
//     TrekDetailSettings,
//     MetaDataConfig,
//   ],

//   editor: lexicalEditor(),
//   secret: process.env.PAYLOAD_SECRET || '',
//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },
//   db: mongooseAdapter({
//     url: process.env.DATABASE_URI || '',
//   }),
//   sharp,
//   plugins: [payloadCloudPlugin()],
// })

// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { cloudinaryStorage } from 'payloadcms-storage-cloudinary' // ⬅️ NEW

import { Users } from './collections/Users'
import TreksCollectionConfig from './collections/Treks'
import { Media } from './collections/Media'

import HeaderGlobalConfig from './globals/Header'
import LandingGlobalPageConfig from './globals/Landing-page'
import TreksGlobalConfig from './globals/Treks-page'
import AboutUsConfig from './globals/About-us'
import ContactConfig from './globals/Contact'
import BookingSheetConfig from './globals/Book-sheet'
import TrekDetailSettings from './globals/TrekDetailSettings'
import MetaDataConfig from './globals/Meta-Data'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.SERVER_URL,

  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    livePreview: { url: process.env.SERVER_URL },
  },

  collections: [TreksCollectionConfig, Users, Media],
  globals: [
    HeaderGlobalConfig,
    LandingGlobalPageConfig,
    TreksGlobalConfig,
    AboutUsConfig,
    ContactConfig,
    BookingSheetConfig,
    TrekDetailSettings,
    MetaDataConfig,
  ],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
  sharp,

  plugins: [
    cloudinaryStorage({
      cloudinaryConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      },
      collections: {
        media: {
          // folder: 'payload-media',          // optional
          // disablePayloadAccessControl: true // uncomment for direct public URLs
        },
      },
    }),
  ],
})
