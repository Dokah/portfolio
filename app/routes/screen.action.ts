import { json, type ActionFunctionArgs } from "@remix-run/server-runtime";
import sgMail from "@sendgrid/mail";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email))
    errors.email = "Valid email is required";
  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return json({ success: false, errors });
  }

  if(name === undefined || email === undefined || message === undefined) {
    return json({ success: false, errors: { message: "All fields are required." } });
  }

  try {
    // await sendEmail({ name, email, message });
    await sgMail.send({
      to: "dominik.kukovec33@gmail.com",
      from:email,
      subject: "Message from Contact Form",
      text: message
    })
    return json({ success: true });
  } catch (error) {
    //@ts-ignore
    console.error("Email send error:", error?.message || error);
    //@ts-ignore
    console.log("Email send error:", error?.message || error);
    return json({
      success: false,
    //@ts-ignore
       errors: { message: error?.message || error },
      // errors: { message: "Failed to send email. Please try again later." },
    });
  }
}
