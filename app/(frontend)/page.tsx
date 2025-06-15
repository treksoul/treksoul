import './styles.css'

import HeaderServer from '@/components/header-server'
import HomeServer from '@/components/landing-page-server'
import TrekServer from '@/components/trek-server'
import AboutServer from '@/components/about-us-server'
import ContactServer from '@/components/contact-server'

export default async function HomePage() {
  return (
    <main>
      <HeaderServer />
      <HomeServer />
      <TrekServer />
      <AboutServer />

      <ContactServer />
    </main>
  )
}
