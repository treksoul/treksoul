// src/app/(site)/FooterServer.tsx
import { getPayload } from 'payload';
import config from '@/payload.config';


import FooterClient from './contact';

export default async function FooterServer() {
  const payload = await getPayload({ config });

  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  });

  return <FooterClient footerData={footerData} />;
}
