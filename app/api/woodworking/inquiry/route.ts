import { NextRequest, NextResponse } from 'next/server'
import { createInquiry } from '@/lib/queries/inquiries'
import { sendWoodworkingInquiryEmail, sendConfirmationEmail } from '@/lib/email'

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
    const inquiry = await createInquiry({
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone || null,
      product_id: data.productId || null,
      product_name: data.productName || null,
      is_custom_build: data.isCustomBuild || false,
      custom_build_description: data.customBuildDescription || null,
      delivery_type: data.deliveryType || null,
      delivery_address: data.deliveryAddress || null,
      message: data.message || null,
    })

    // Send email to admin
    await sendWoodworkingInquiryEmail({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      productName: data.productName,
      isCustomBuild: data.isCustomBuild,
      customBuildDescription: data.customBuildDescription,
      deliveryType: data.deliveryType,
      deliveryAddress: data.deliveryAddress,
      message: data.message,
    })

    // Send confirmation email to customer
    const inquiryType = data.isCustomBuild 
      ? 'custom build request' 
      : `inquiry about ${data.productName || 'our products'}`
    
    await sendConfirmationEmail(
      data.customerEmail,
      'inquiry',
      `We've received your ${inquiryType} and will get back to you soon.`
    )

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
