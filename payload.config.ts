// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
// import { s3Storage } from '@payloadcms/storage-s3' // ✅ named export

import { Users } from './collections/Users'

import TreksCollectionConfig from './collections/Treks'

import HeaderGlobalConfig from './globals/Header'
import LandingGlobalPageConfig from './globals/Landing-page'
import TreksGlobalConfig from './globals/Treks-page'
import AboutUsConfig from './globals/About-us'
import ContactConfig from './globals/Contact'
import BookingSheetConfig from './globals/Book-sheet'
import { Media } from './collections/Media'
import TrekDetailSettings from './globals/TrekDetailSettings'
import MetaDataConfig from './globals/Meta-Data'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.SERVER_URL,
    },
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
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    // s3Storage({
    //   collections: { media: true },
    //   bucket: process.env.S3_BUCKET as string,
    //   config: {
    //     endpoint: process.env.S3_ENDPOINT,
    //     region: 'auto',
    //     // region: 'us-east-1',
    //     forcePathStyle: true, // mandatory for non‑AWS hosts
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    //       secretAccessKey: process.env.S3_SECRET as string,
    //     },
    //   },
    // }),
  ],
})
