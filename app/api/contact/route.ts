import { NextRequest, NextResponse } from 'next/server'
import { sendContactInquiryEmail, sendConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.name?.trim() || !data.email?.trim()) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const customerName = String(data.name).trim()
    const customerEmail = String(data.email).trim()
    const customerPhone = data.phone ? String(data.phone).trim() : undefined
    const inquiryType = data.inquiry ? String(data.inquiry).trim() : 'General'
    const message = data.message ? String(data.message).trim() : undefined

    const sent = await sendContactInquiryEmail({
      customerName,
      customerEmail,
      customerPhone,
      inquiryType,
      message,
    })

    if (!sent) {
      return NextResponse.json(
        { error: 'Failed to send inquiry. Please try again or contact us directly.' },
        { status: 500 }
      )
    }

    await sendConfirmationEmail(
      customerEmail,
      'inquiry',
      `We've received your contact form submission${inquiryType ? ` regarding ${inquiryType}` : ''}.`
    )

    return NextResponse.json(
      { success: true, message: 'Thank you! Your message has been sent. We will get back to you soon.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}
