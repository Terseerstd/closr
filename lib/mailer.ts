import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  console.warn("EMAIL_USER or EMAIL_PASS environment variables are missing. Nodemailer setup may fail.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  const mailOptions = {
    from: `"Closr. AI" <${emailUser}>`,
    to: email,
    subject: "Verify Your Closr. Account - Activation Code",
    html: `
      <div style="background-color: #1d0225; padding: 40px 20px; font-family: 'Geist', sans-serif; text-align: center; color: #fcd6ff; max-width: 500px; margin: 0 auto; border-radius: 16px; border: 1px solid #48294e;">
        <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0 0 5px 0; letter-spacing: -0.02em;">Closr<span style="color: #ff066d;">.</span></h1>
        <p style="color: #e6bcc2; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 30px 0; font-weight: 600;">AI Sales Intelligence Platform</p>
        
        <div style="background-color: #2c0f33; padding: 30px; border-radius: 12px; border: 1px solid rgba(255, 6, 109, 0.15); margin-bottom: 25px;">
          <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">Account Verification</h2>
          <p style="color: #e6bcc2; font-size: 14px; margin: 0 0 25px 0; line-height: 1.5;">Please enter the 6-digit verification code below to activate your account. This code will expire in 15 minutes.</p>
          
          <div style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #ff066d; padding: 12px 20px; border-radius: 8px; display: inline-block; background-color: #1d0225; border: 1px solid rgba(255, 6, 109, 0.3); font-family: monospace; text-indent: 8px;">
            ${code}
          </div>
        </div>
        
        <p style="color: #e6bcc2; font-size: 11px; line-height: 1.5; max-width: 320px; margin: 0 auto 20px auto;">If you did not sign up for a Closr. account, you can safely ignore this email.</p>
        
        <div style="height: 1px; background-color: #3c1e43; margin-bottom: 20px;"></div>
        
        <p style="color: #e6bcc2; opacity: 0.4; font-size: 10px; margin: 0;">&copy; ${new Date().getFullYear()} Closr. Inc. All rights reserved.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendWaitlistConfirmationEmail(email: string, name: string) {
  const firstName = name.trim().split(/\s+/)[0] || "there";
  const mailOptions = {
    from: `"Closr. AI" <${emailUser}>`,
    to: email,
    subject: "You're on the Closr. waitlist",
    html: `
      <div style="background-color: #1d0225; padding: 40px 20px; font-family: Arial, sans-serif; color: #fcd6ff; max-width: 560px; margin: 0 auto; border-radius: 16px; border: 1px solid #48294e;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0 0 5px 0; letter-spacing: -0.02em;">Closr<span style="color: #ff066d;">.</span></h1>
          <p style="color: #e6bcc2; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0; font-weight: 600;">AI Revenue Intelligence Platform</p>
        </div>

        <div style="background-color: #2c0f33; padding: 30px; border-radius: 12px; border: 1px solid rgba(255, 6, 109, 0.15); margin-bottom: 25px;">
          <p style="color: #ff066d; font-size: 12px; font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1.5px;">Waitlist confirmed</p>
          <h2 style="color: #ffffff; font-size: 22px; margin: 0 0 14px 0; font-weight: 700;">You're on the list, ${firstName}.</h2>
          <p style="color: #e6bcc2; font-size: 14px; margin: 0 0 18px 0; line-height: 1.6;">Thanks for joining the Closr. waitlist. We'll reach out when the next beta invites open and share early access details with this email address.</p>
          <p style="color: #e6bcc2; font-size: 14px; margin: 0; line-height: 1.6;">We're building Closr. to help teams package offers, move follow-ups forward, and close cleaner deals with less manual drag.</p>
        </div>

        <p style="color: #e6bcc2; font-size: 11px; line-height: 1.5; max-width: 380px; margin: 0 auto 20px auto; text-align: center;">If you did not join the Closr. waitlist, you can safely ignore this email.</p>

        <div style="height: 1px; background-color: #3c1e43; margin-bottom: 20px;"></div>

        <p style="color: #e6bcc2; opacity: 0.4; font-size: 10px; margin: 0; text-align: center;">&copy; ${new Date().getFullYear()} Closr. Inc. All rights reserved.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
