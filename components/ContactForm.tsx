"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initial);

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
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-text-primary)]"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-text-primary)]"
      />
      <input
        name="subject"
        type="text"
        placeholder="Subject"
        required
        className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-text-primary)]"
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        minLength={10}
        rows={5}
        className="w-full resize-none rounded-md border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-text-primary)]"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[var(--color-text-primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
