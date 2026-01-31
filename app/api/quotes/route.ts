import { NextRequest, NextResponse } from 'next/server'
import { createQuote } from '@/lib/queries/quotes'
import { sendQuoteRequestEmail, sendConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.customerName || !data.customerEmail) {
      return NextResponse.json(
        { error: 'Customer name and email are required' },
        { status: 400 }
      )
    }

    // Save to database
    const quote = await createQuote({
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone || null,
      project_type: data.projectType || null,
      budget_range: data.budgetRange || null,
      timeline: data.timeline || null,
      message: data.message || null,
    })

    // Send email to admin
    await sendQuoteRequestEmail({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      message: data.message,
    })

    // Send confirmation email to customer
    await sendConfirmationEmail(
      data.customerEmail,
      'quote',
      `We've received your quote request for ${data.projectType || 'your project'}.`
    )

    return NextResponse.json(
      { success: true, message: 'Quote request submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting quote:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}
