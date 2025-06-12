import { type ActionFunctionArgs } from "@remix-run/server-runtime";
import sgMail from "@sendgrid/mail";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const token = formData.get("g-recaptcha-response");
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const sendgridToEmail = process.env.SENDGRID_TO_EMAIL;
  const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("Missing reCAPTCHA secret key.");
    return { success: false, error: "Missing reCAPTCHA secret key." };  
  }

   if (!token) {
    return { success: false, error: "Missing reCAPTCHA token" };
  }

const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: secretKey!,
      response: token.toString(),
    }),
  });

  const result = await response.json();

  console.log("RESULT", result);

  if (!result.success || result.score < 0.5) {
    return { success: false, error: "reCAPTCHA verification failed" };
  }
  
  if (!sendgridApiKey?.startsWith("SG.")) {
    console.warn("Invalid SendGrid API key.");
    return { success: false, error: "Invalid SendGrid API key." };
  }

  if(!sendgridToEmail || !sendgridFromEmail) {
    console.warn("SendGrid TO or FROM email is not set.");
    return { success: false, error: "SendGrid TO or FROM email is not set." };
  }

  sgMail.setApiKey(sendgridApiKey);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email))
    errors.email = "Valid email is required";
  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  if(name === undefined || email === undefined || message === undefined) {
    return { success: false, errors: { message: "All fields are required." } };
  }
const data = {
      to: sendgridToEmail,
      from: sendgridFromEmail,
      subject: "New Inquiry from Portfolio",
      text: `Name: ${name}\nEmail: ${email}\nMessage: \n${message}`,
    }
  try {
    await sgMail.send(data)
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { message: "Failed to send email. Please try again later." },
    };
  }
}
