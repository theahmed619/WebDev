import { Resend } from 'resend';

// This will automatically find the RESEND_API_KEY in your Render environment
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * A generic email sending function using Resend.
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 * @param {string} html - The HTML content of the email.
 */
const sendMail = async (email, subject, html) => {
  try {
    // You must verify a domain in Resend to send from it.
    // For testing, you can send from their default test email.
    const { data, error } = await resend.emails.send({
      from: 'Projora <onboarding@resend.dev>', // Resend's default test email
      to: [email],
      subject: subject,
      html: html, // Pass the custom HTML content
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(error.message);
    }

    console.log('Email sent via Resend:', data);

  } catch (error) {
    console.error('Failed to send email:', error);
    throw error; // Throw the error so the controller can catch it
  }
};

export default sendMail;