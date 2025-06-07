import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { isMobile } from "~/utility/utils";

type ActionData = {
  success?: boolean;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export function Contact() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const [showToast, setShowToast] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    if (navigation.state === "submitting") {
      setWasSubmitted(true);
    }
  }, [navigation.state]);

  useEffect(() => {
    if (wasSubmitted && actionData?.success) {
      formRef.current?.reset();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setWasSubmitted(false);
    }
  }, [actionData, wasSubmitted]);

  return (
    <div className="contact-container">
      {!isMobile() && (
        <div className="contact-title">
          <h1>Let's get in touch</h1>
        </div>
      )}

      <div className="contact-form-container">
        <Form method="post" className="contact-form" ref={formRef}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
          {actionData?.errors?.name && (
            <p className="error">{actionData.errors.name}</p>
          )}

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          {actionData?.errors?.email && (
            <p className="error">{actionData.errors.email}</p>
          )}

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required />
          {actionData?.errors?.message && (
            <p className="error">{actionData.errors.message}</p>
          )}

          <button type="submit" disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </Form>

        {showToast && (
          <div onClick={() => setShowToast(false)} className="toast">
            Message sent!
          </div>
        )}
      </div>
    </div>
  );
}
