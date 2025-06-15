import { getPayload } from 'payload';
import config from '@/payload.config';


import AboutUsClient from './about-us';


export default async function AboutServer() {
  const payload = await getPayload({ config });

  // ↳ depth:1 is enough unless you embed relations inside the global
  const aboutData = await payload.findGlobal({
    slug: 'about_us',
    depth: 1,
  });

  return <AboutUsClient aboutData={aboutData} />;
}
