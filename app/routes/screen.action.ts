import { type ActionFunctionArgs } from "@remix-run/server-runtime";
import sgMail from "@sendgrid/mail";

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  
  console.log(context, "CONTEXT");
  console.log(context.env, "ENV");
  //@ts-ignore
  const sendgridApiKey = context.env.SENDGRID_API_KEY;
  //@ts-ignore

  const sendgridToEmail = context.env.SENDGRID_TO_EMAIL;
  //@ts-ignore
  
  const sendgridFromEmail = context.env.SENDGRID_FROM_EMAIL;

  console.log(sendgridApiKey,sendgridFromEmail,sendgridToEmail, "VARIABLES")
  
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
    console.log("TO:", sendgridToEmail);
console.log("FROM:", sendgridFromEmail);
  try {
    await sgMail.send(data)
    return { success: true };
  } catch (error) {
    return {
      success: false,
      // errors: { message: "Failed to send email. Please try again later." },
      //@ts-ignore
      errors: { message: `${JSON.stringify(data)} ${error?.message} ${error}` },
    };
  }
}
