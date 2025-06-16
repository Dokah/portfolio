import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { isMobile } from "~/utility/utils";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

type ActionData = {
  success?: boolean;
  error?: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export function Contact({
  setScrollEnabled,
}: {
  setScrollEnabled: (enabled: boolean) => void;
}) {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const [showToast, setShowToast] = useState(false);

  const handleFocus = () => setScrollEnabled(false);
  const handleBlur = () => {
    setTimeout(() => {
      const active = document.activeElement;
      if (
        active?.tagName !== "INPUT" &&
        active?.tagName !== "TEXTAREA" &&
        active?.tagName !== "SELECT"
      ) {
        setScrollEnabled(true);
      }
    }, 100);
  };

  useEffect(() => {
    const loadReCaptcha = () => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${
        import.meta.env.VITE_RECAPTCHA_SITE_KEY
      }`;
      script.async = true;
      document.body.appendChild(script);
    };

    loadReCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof window.grecaptcha === "undefined") {
      alert("reCAPTCHA failed to load.");
      return;
    }

    const token = await window.grecaptcha.execute(
      import.meta.env.VITE_RECAPTCHA_SITE_KEY,
      {
        action: "submit",
      }
    );

    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    formData.append("g-recaptcha-response", token);

    fetch("/screen/action", {
      method: "POST",
      body: formData,
    });
    formRef.current?.reset();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="contact-container">
      {!isMobile() && (
        <div className="contact-title">
          <h1>Let's get in touch</h1>
        </div>
      )}

      <div className="contact-form-container">
        <Form
          method="post"
          className="contact-form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {actionData?.errors?.name && (
            <p className="error">{actionData.errors.name}</p>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {actionData?.errors?.email && (
            <p className="error">{actionData.errors.email}</p>
          )}
          <label htmlFor="message">Message</label>
          <textarea
            style={{ resize: "none" }}
            id="message"
            name="message"
            rows={5}
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {actionData?.errors?.message && (
            <p className="error">{actionData.errors.message}</p>
          )}
          <button type="submit" disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Sending..." : "Send Message"}
          </button>
          <label className="recaptcha-label">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            {""}
            <a href="https://policies.google.com/terms">
              Terms of Service
            </a>{" "}
            apply.
          </label>
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
