"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactForm, type ContactState } from "@/app/actions/contact";
import { track } from "@/lib/analytics";

const initial: ContactState = { status: "idle", message: "" };

const fieldClass =
  "w-full rounded-md border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-text-primary)]";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-subtle)]";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initial);
  const trackedSuccess = useRef(false);

  useEffect(() => {
    if (state.status === "success" && !trackedSuccess.current) {
      trackedSuccess.current = true;
      track("contact_submit", { source: "contact_form" });
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-[var(--color-bg-subtle)] p-12 text-center">
        <p className="text-lg font-medium">Thank you!</p>
        <p className="mt-2 text-sm text-[var(--color-text-subtle)]">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.status === "error" && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          autoComplete="name"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your message"
          required
          minLength={10}
          rows={5}
          className={`${fieldClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer rounded-none bg-[var(--color-text-primary)] px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
