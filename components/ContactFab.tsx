"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { contact, smsUrl, telUrl, whatsappUrl } from "@/config/contact";

type FabOption = {
  label: string;
  onClick: () => void;
  icon: ReactNode;
};

function openHref(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8.1l3.13 3.259L19.752 8.1l-6.559 6.863z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SmsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const btnClass =
  "flex cursor-pointer items-center gap-2 rounded-full border-none bg-[var(--color-text-primary)]/90 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-opacity duration-200 hover:opacity-90";

const tween = { duration: 0.2, ease: "easeOut" as const };

/**
 * Contact FAB — WhatsApp, Messenger, Call, SMS.
 * z-40 sits under BookingModal (z-50).
 */
export default function ContactFab() {
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [isOpen]);

  const options: FabOption[] = [
    {
      label: "WhatsApp",
      icon: <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />,
      onClick: () => openHref(whatsappUrl("general")),
    },
    {
      label: "Messenger",
      icon: <MessengerIcon className="h-4 w-4 text-[#0084FF]" />,
      onClick: () => openHref(contact.messenger),
    },
    {
      label: "Call",
      icon: <PhoneIcon className="h-4 w-4" />,
      onClick: () => {
        window.location.href = telUrl();
      },
    },
    {
      label: "Text message",
      icon: <SmsIcon className="h-4 w-4" />,
      onClick: () => {
        window.location.href = smsUrl();
      },
    },
  ];

  return (
    <div
      ref={rootRef}
      data-contact-fab
      className="pointer-events-none fixed right-5 bottom-5 z-40 print:hidden tablet:right-8 tablet:bottom-8"
    >
      <div className="pointer-events-auto relative flex flex-col items-end">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              id={menuId}
              role="menu"
              aria-label="Contact options"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 8 }}
              transition={reduced ? { duration: 0 } : tween}
              className="absolute bottom-12 mb-1 flex flex-col items-end gap-2"
            >
              {options.map((option, index) => (
                <motion.div
                  key={option.label}
                  role="none"
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: 6 }}
                  transition={
                    reduced ? { duration: 0 } : { ...tween, delay: index * 0.04 }
                  }
                >
                  <button
                    type="button"
                    role="menuitem"
                    className={btnClass}
                    onClick={() => {
                      option.onClick();
                      setIsOpen(false);
                    }}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-haspopup="menu"
          aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[var(--color-text-primary)] text-white shadow-lg transition-opacity duration-200 hover:opacity-90"
        >
          <motion.span
            className="flex"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={reduced ? { duration: 0 } : tween}
          >
            <PlusIcon className="h-6 w-6" />
          </motion.span>
        </button>
      </div>
    </div>
  );
}
