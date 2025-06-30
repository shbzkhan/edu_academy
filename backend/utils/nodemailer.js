import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
 // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

export const emailVerification = async (otp, name, email) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8" /></head>
      <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background-color: #28a745; padding: 20px; text-align: center; color: white;">
              <h2 style="margin: 0;">Verify Your Email</h2>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px; text-align: center; color: #333;">
              <p>Hello, ${name}</p>
              <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>

              <div style="margin: 20px auto; padding: 15px 30px; background-color: #e9f7ef; border: 2px dashed #28a745; border-radius: 6px; font-size: 24px; font-weight: bold; color: #28a745; width: 100%; text-align: center; box-sizing: border-box; letter-spacing: 10px;">
                ${otp}
              </div>

              <p>If you did not create an account, no further action is required.</p>
              <p>If you have any questions, feel free to contact our support team.</p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              &copy; 2025 Your Company. All rights reserved.
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
    try {
        const response = await transporter.sendMail({
          from: `"edu Academy" ${process.env.MAIL_ID}`,
          to: `${email}`,
          subject: "Account verification OTP",
          html: htmlTemplate,
        });
    } catch (error) {
        console.log("Otp send failed")
    }
}