// import { createTransport } from "nodemailer";

// const sendMail = async (email, subject, otp) => {
//   const transport = createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     auth: {
//       user: process.env.Gmail,
//       pass: process.env.Password,
//     },
//   });

//   const html = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>OTP Verification</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//         }
//         .container {
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             text-align: center;
//         }
//         h1 {
//             color: red;
//         }
//         p {
//             margin-bottom: 20px;
//             color: #666;
//         }
//         .otp {
//             font-size: 36px;
//             color: #7b68ee; /* Purple text */
//             margin-bottom: 30px;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>OTP Verification</h1>
//         <p>Hello ${email} your (One-Time Password) for your account verification is.</p>
//         <p class="otp">${otp}</p> 
//     </div>
// </body>
// </html>
// `;

//   await transport.sendMail({
//     from: process.env.Gmail,
//     to: email,
//     subject,
//     html,
//   });
// };

// export default sendMail;

import { Resend } from 'resend';

// This will automatically find the RESEND_API_KEY in your Render environment
const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email, subject, otp) => {
  try {
    // You must verify a domain in Resend to send from it.
    // For testing, you can send from their default test email.
    const { data, error } = await resend.emails.send({
      from: 'FantasyHub <onboarding@resend.dev>', // Resend's default test email
      to: [email],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 40px; background-color: #f4f4f4; }
            .container { max-w: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background-color: #4A90E2; padding: 30px; border-top-left-radius: 8px; border-top-right-radius: 8px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
            .content { padding: 40px; }
            .content p { color: #333333; line-height: 1.6; }
            .otp { font-size: 36px; font-weight: bold; color: #4A90E2; text-align: center; letter-spacing: 4px; margin: 30px 0; }
            .footer { padding: 30px; text-align: center; color: #888888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>FantasyHub Verification</h1>
            </div>
            <div class="content">
              <p>Hello ${email},</p>
              <p>Your One-Time Password (OTP) for your account verification is:</p>
              <div class="otp">${otp}</div>
              <p>This code will expire in 5 minutes. If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2025 FantasyHub. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
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