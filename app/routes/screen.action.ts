import { type ActionFunctionArgs } from "@remix-run/server-runtime";
import sgMail from "@sendgrid/mail";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const sendgridToEmail = process.env.SENDGRID_TO_EMAIL;
  const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL;
  
  if (!sendgridApiKey?.startsWith("SG.")) {
    console.warn("Invalid SendGrid API key.");
    return
  }

  if(!sendgridToEmail || !sendgridFromEmail) {
    console.warn("SendGrid TO or FROM email is not set.");
    return
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
