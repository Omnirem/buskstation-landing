
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const waitlistFormSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = waitlistFormSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ message: 'Invalid input.', errors: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { firstName, lastName, email } = parsedData.data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${firstName} ${lastName} (Waitlist)" <${process.env.GMAIL_USER}>`,
      to: 'buskstation@gmail.com',
      replyTo: email,
      subject: `New Waitlist Sign-up: ${firstName} ${lastName}`,
      text: `You have a new waitlist sign-up:\n\n
             Name: ${firstName} ${lastName}\n
             Email: ${email}`,
      html: `<p>You have a new waitlist sign-up:</p>
             <ul>
               <li><strong>Name:</strong> ${firstName} ${lastName}</li>
               <li><strong>Email:</strong> ${email}</li>
             </ul>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Waitlist email sent successfully to buskstation@gmail.com');
      return NextResponse.json({ message: "You're on the list! We'll notify you when Busk Station launches." }, { status: 200 });
    } catch (error) {
      console.error('Error sending waitlist email:', error);
      let errorMessage = 'Error sending email. Please try again later.';
      if (error instanceof Error) {
        if ((error as any).code === 'EAUTH') {
          errorMessage = 'Email server authentication failed. Please check server credentials.';
        } else if ((error as any).code === 'ECONNREFUSED') {
          errorMessage = 'Could not connect to email server. Please check network or server status.';
        } else {
            errorMessage = `Error sending email: ${(error as any).message || 'Unknown email error'}`;
        }
      }
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }

  } catch (error) {
    console.error('API Error (Waitlist):', error);
    return NextResponse.json({ message: 'An unexpected error occurred processing your request.' }, { status: 500 });
  }
}
