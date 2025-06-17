
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = contactFormSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ message: 'Invalid input.', errors: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { firstName, lastName, email, message } = parsedData.data;

    // Configure Nodemailer transporter
    // Ensure GMAIL_USER and GMAIL_APP_PASSWORD are set in your .env.local file
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Loaded from .env.local
        pass: process.env.GMAIL_APP_PASSWORD, // Loaded from .env.local
      },
    });

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${process.env.GMAIL_USER}>`, // Sender address (your Gmail, from which emails will be sent)
      to: 'buskstation@gmail.com', // Recipient address (where you want to receive contact form emails)
      replyTo: email, // User's email from the form, so you can reply to them directly
      subject: `New Contact Form Message from ${firstName} ${lastName}`,
      text: `You have received a new message from your website contact form:\n\n
             Name: ${firstName} ${lastName}\n
             Email: ${email}\n
             Message: ${message}`,
      html: `<p>You have a new contact form submission:</p>
             <ul>
               <li><strong>Name:</strong> ${firstName} ${lastName}</li>
               <li><strong>Email:</strong> ${email}</li>
             </ul>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to buskstation@gmail.com');
      return NextResponse.json({ message: 'Message submitted successfully! We will get back to you soon.' }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error);
      // Check for specific Nodemailer errors if needed
      let errorMessage = 'Error sending email. Please try again later.';
      if (error instanceof Error) {
        // Basic error handling, you might want to be more specific for production
        if ((error as any).code === 'EAUTH') {
          errorMessage = 'Email server authentication failed. Please check server credentials in .env.local.';
        } else if ((error as any).code === 'ECONNREFUSED') {
          errorMessage = 'Could not connect to email server. Please check network or server status.';
        } else {
            errorMessage = `Error sending email: ${(error as any).message || 'Unknown email error'}`;
        }
      }
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred processing your request.' }, { status: 500 });
  }
}
