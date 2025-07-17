// app/api/enquiry/route.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/* 👇 Important: we need full Node APIs (SMTP) */
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  /* ------------------------------------------------------------
   * 1. Grab form data
   * ---------------------------------------------------------- */
  const data = await req.formData()
  const name = (data.get('name') as string) ?? ''
  const email = (data.get('email') as string) ?? ''
  const trek = (data.get('trek') as string) ?? ''
  const date = (data.get('date') as string) ?? ''
  const message = (data.get('message') as string) ?? ''

  /* ------------------------------------------------------------
   * 2. Check env vars
   * ---------------------------------------------------------- */
  const { GMAIL_USER, GMAIL_APP_PASS, OWNER_EMAIL_TO } = process.env
  if (!GMAIL_USER || !GMAIL_APP_PASS || !OWNER_EMAIL_TO) {
    console.error('⛔ Missing one of GMAIL_USER / GMAIL_APP_PASS / OWNER_EMAIL_TO')
    return NextResponse.json({ ok: false, error: 'Server-mail-config' }, { status: 500 })
  }

  /* ------------------------------------------------------------
   * 3. Create transporter (Gmail + app-password)
   * ---------------------------------------------------------- */
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASS },
  })

  /* ------------------------------------------------------------
   * 4. Compose e-mail
   * ---------------------------------------------------------- */
  const subject = `New trek enquiry – ${trek || 'unknown trek'}`

  const textBody = `
New trek enquiry
----------------
Trek:     ${trek || 'not specified'}
Date:     ${date || 'not specified'}

Name:     ${name}
Email:    ${email}

Message:
${message || '(none)'}
`.trim()

  /* Simple, mobile-friendly table with inline styles */
  const htmlBody = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; line-height:1.5; color:#111;">
    <h2 style="margin:0 0 1rem;">New trek enquiry</h2>

    <table style="width:100%; border-collapse:collapse;">
      <tbody>
        ${row('Trek', trek || 'Not specified')}
        ${row('Preferred date', date || 'Not specified')}
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Message', message || '<em style="color:#888;">(none)</em>')}
      </tbody>
    </table>
  </div>
  `.trim()

  try {
    await transporter.sendMail({
      from: `"Booking form" <${GMAIL_USER}>`,
      to: OWNER_EMAIL_TO,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('⛔ Mail send failed:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

/* ---------- helper ---------- */
function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:6px 8px; font-weight:500; white-space:nowrap;">${label}</td>
      <td style="padding:6px 8px; background:#f7f7f7; border-radius:4px;">${value}</td>
    </tr>
  `
}
