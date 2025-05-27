import { json, type ActionFunctionArgs } from "@remix-run/server-runtime";
import { sendEmail } from "../utility/send-email.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

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
    await sendEmail({ name, email, message });
    return json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return json({
      success: false,
      errors: { message: "Failed to send email. Please try again later." },
    });
  }
}
