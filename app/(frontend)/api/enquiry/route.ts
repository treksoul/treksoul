// app/api/enquiry/route.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/** 👇  Critical: this tells Next.js NOT to deploy the route on the Edge runtime */
export const runtime = 'nodejs' // ensures full Node & SMTP libraries

export async function POST(req: NextRequest) {
  /* ------------------------------------------------------------
   *  1. Grab form data
   * ---------------------------------------------------------- */
  const data = await req.formData()
  const name = (data.get('name') as string) ?? ''
  const email = (data.get('email') as string) ?? ''
  const trek = (data.get('trek') as string) ?? ''
  const date = (data.get('date') as string) ?? ''

  /* ------------------------------------------------------------
   *  2. Check env vars
   * ---------------------------------------------------------- */
  const { GMAIL_USER, GMAIL_APP_PASS, OWNER_EMAIL_TO } = process.env

  if (!GMAIL_USER || !GMAIL_APP_PASS || !OWNER_EMAIL_TO) {
    console.error('⛔ Missing one of GMAIL_USER / GMAIL_APP_PASS / OWNER_EMAIL_TO')
    return NextResponse.json({ ok: false, error: 'Server-mail-config' }, { status: 500 })
  }

  /* ------------------------------------------------------------
   *  3. Create transporter (Gmail + app-password)
   * ---------------------------------------------------------- */
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Booking form" <${GMAIL_USER}>`,
      to: OWNER_EMAIL_TO,
      replyTo: email,
      subject: `New enquiry – ${trek || 'unknown trek'}`,
      text: `
New trek enquiry
----------------
Trek:  ${trek || 'not specified'}
Date:  ${date || 'not specified'}

Name:  ${name}
Email: ${email}
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('⛔ Mail send failed:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
