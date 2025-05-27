import nodemailer from "nodemailer";

export async function sendEmail({ name, email, message }: {
  name: string;
  email: string;
  message: string;
}) {
    console.log(process.env.EMAIL_USER, 'user');
      console.log(process.env.EMAIL_PASS, 'pass');
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: "New Contact Form Message",
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  return transporter.sendMail(mailOptions);
}
