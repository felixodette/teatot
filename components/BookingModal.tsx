"use client";

import { useEffect, useId, useRef, useState, useActionState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { submitBookingForm, type BookingState } from "@/app/actions/booking";
import { useBooking } from "@/providers/BookingProvider";

const initial: BookingState = { status: "idle", message: "" };

const fieldClass =
  "w-full rounded-md border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-text-primary)]";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-subtle)]";

function GuestCounter({
  id,
  label,
  value,
  min,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-md border border-[var(--color-border)] px-2 py-1.5">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-lg leading-none transition-opacity hover:opacity-60 disabled:opacity-30"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          id={id}
          name={id}
          type="number"
          readOnly
          value={value}
          className="w-full appearance-none bg-transparent text-center text-sm outline-none"
          tabIndex={-1}
        />
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-lg leading-none transition-opacity hover:opacity-60"
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function BookingModal() {
  const { isOpen, closeBooking, roomOptions, preferredRoom } = useBooking();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState(submitBookingForm, initial);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [clientError, setClientError] = useState("");

  const roomDefault =
    preferredRoom && roomOptions.includes(preferredRoom) ? preferredRoom : "";

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () => {
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    };

    const focusFirst = () => {
      const list = focusables();
      const preferred =
        list.find((el) => el.tagName === "INPUT" || el.tagName === "SELECT") ?? list[0];
      preferred?.focus();
    };
    // Wait one frame so AnimatePresence mounts the panel before focusing.
    const raf = requestAnimationFrame(focusFirst);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBooking();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, closeBooking]);

  useEffect(() => {
    if (state.status === "success") {
      const t = setTimeout(() => closeBooking(), 2200);
      return () => clearTimeout(t);
    }
  }, [state.status, closeBooking]);

  function validateBeforeSubmit(e: React.FormEvent<HTMLFormElement>) {
    setClientError("");
    if (checkIn && checkOut && checkOut <= checkIn) {
      e.preventDefault();
      setClientError("Check-out must be after check-in.");
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[50] flex items-end justify-center p-0 tablet:items-center tablet:p-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 bg-[var(--color-black-80)] backdrop-blur-[10px]"
            aria-label="Close booking form"
            onClick={closeBooking}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden bg-white shadow-xl tablet:max-h-[90dvh]"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0 }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5 py-4 tablet:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                  Reservations
                </p>
                <h2
                  id={titleId}
                  className="mt-1 text-xl font-semibold tracking-tight"
                  style={{ fontFamily: "var(--font-inter-display)" }}
                >
                  Book Now
                </h2>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                className="flex h-10 w-10 items-center justify-center text-[var(--color-text-primary)] transition-opacity hover:opacity-60"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 tablet:px-6 tablet:py-6">
              {state.status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-lg font-medium">Request sent</p>
                  <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">
                    {state.message}
                  </p>
                </div>
              ) : (
                <form action={formAction} onSubmit={validateBeforeSubmit} className="space-y-4">
                  {(state.status === "error" || clientError) && (
                    <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                      {clientError || state.message}
                    </p>
                  )}

                  <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                    <div>
                      <label htmlFor="checkIn" className={labelClass}>
                        Check-in
                      </label>
                      <input
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        required
                        min={today}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="checkOut" className={labelClass}>
                        Check-out
                      </label>
                      <input
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        required
                        min={checkIn || today}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                    <GuestCounter
                      id="adults"
                      label="Adults"
                      value={adults}
                      min={1}
                      onChange={setAdults}
                    />
                    <GuestCounter
                      id="children"
                      label="Children"
                      value={children}
                      min={0}
                      onChange={setChildren}
                    />
                  </div>

                  <div>
                    <label htmlFor="roomType" className={labelClass}>
                      Room type <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <select
                      id="roomType"
                      name="roomType"
                      className={fieldClass}
                      defaultValue={roomDefault}
                    >
                      <option value="">Any / not specified</option>
                      {roomOptions.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      className={fieldClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+254…"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="mt-2 w-full cursor-pointer rounded-none bg-[var(--color-text-primary)] px-6 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                  >
                    {pending ? "Sending…" : "Request booking"}
                  </button>

                  <p className="text-center text-xs text-[var(--color-text-subtle)]">
                    We&apos;ll confirm availability by email at info@teatot.co.ke
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
