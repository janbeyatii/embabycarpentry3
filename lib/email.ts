import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
    })
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export async function sendQuoteRequestEmail(quoteData: {
  customerName: string
  customerEmail: string
  customerPhone?: string
  projectType?: string
  budgetRange?: string
  timeline?: string
  message?: string
}): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.error('ADMIN_EMAIL not configured')
    return false
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f5bf23; color: #000; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #000; }
        .value { color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Quote Request - ${quoteData.projectType || 'General'}</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Customer Name:</span>
            <span class="value">${quoteData.customerName}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${quoteData.customerEmail}</span>
          </div>
          ${quoteData.customerPhone ? `
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value">${quoteData.customerPhone}</span>
          </div>
          ` : ''}
          ${quoteData.projectType ? `
          <div class="field">
            <span class="label">Project Type:</span>
            <span class="value">${quoteData.projectType}</span>
          </div>
          ` : ''}
          ${quoteData.budgetRange ? `
          <div class="field">
            <span class="label">Budget Range:</span>
            <span class="value">${quoteData.budgetRange}</span>
          </div>
          ` : ''}
          ${quoteData.timeline ? `
          <div class="field">
            <span class="label">Timeline:</span>
            <span class="value">${quoteData.timeline}</span>
          </div>
          ` : ''}
          ${quoteData.message ? `
          <div class="field">
            <span class="label">Message:</span>
            <div class="value">${quoteData.message}</div>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: adminEmail,
    subject: `New Quote Request - ${quoteData.projectType || 'General'}`,
    html,
  })
}

export async function sendWoodworkingInquiryEmail(inquiryData: {
  customerName: string
  customerEmail: string
  customerPhone?: string
  productName?: string
  isCustomBuild: boolean
  customBuildDescription?: string
  deliveryType?: string
  deliveryAddress?: string
  message?: string
}): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.error('ADMIN_EMAIL not configured')
    return false
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f5bf23; color: #000; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #000; }
        .value { color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Woodworking Inquiry - ${inquiryData.isCustomBuild ? 'Custom Build' : inquiryData.productName || 'General'}</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Customer Name:</span>
            <span class="value">${inquiryData.customerName}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${inquiryData.customerEmail}</span>
          </div>
          ${inquiryData.customerPhone ? `
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value">${inquiryData.customerPhone}</span>
          </div>
          ` : ''}
          ${inquiryData.productName && !inquiryData.isCustomBuild ? `
          <div class="field">
            <span class="label">Product:</span>
            <span class="value">${inquiryData.productName}</span>
          </div>
          ` : ''}
          ${inquiryData.isCustomBuild ? `
          <div class="field">
            <span class="label">Type:</span>
            <span class="value">Custom Build Request</span>
          </div>
          ${inquiryData.customBuildDescription ? `
          <div class="field">
            <span class="label">Custom Build Description:</span>
            <div class="value">${inquiryData.customBuildDescription}</div>
          </div>
          ` : ''}
          ` : ''}
          ${inquiryData.deliveryType ? `
          <div class="field">
            <span class="label">Delivery Type:</span>
            <span class="value">${inquiryData.deliveryType}</span>
          </div>
          ` : ''}
          ${inquiryData.deliveryAddress ? `
          <div class="field">
            <span class="label">Delivery Address:</span>
            <span class="value">${inquiryData.deliveryAddress}</span>
          </div>
          ` : ''}
          ${inquiryData.message ? `
          <div class="field">
            <span class="label">Message:</span>
            <div class="value">${inquiryData.message}</div>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: adminEmail,
    subject: `New Woodworking Inquiry - ${inquiryData.isCustomBuild ? 'Custom Build' : inquiryData.productName || 'General'}`,
    html,
  })
}

export async function sendConfirmationEmail(
  to: string,
  type: 'quote' | 'inquiry',
  details: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f5bf23; color: #000; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your ${type === 'quote' ? 'Quote Request' : 'Inquiry'}!</h1>
        </div>
        <div class="content">
          <p>We have received your ${type === 'quote' ? 'quote request' : 'inquiry'} and will get back to you within 24-48 hours.</p>
          <p>${details}</p>
          <p>If you have any urgent questions, please feel free to contact us directly.</p>
          <p>Best regards,<br>Embaby Carpentry Team</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to,
    subject: `Thank you for your ${type === 'quote' ? 'quote request' : 'inquiry'}`,
    html,
  })
}
