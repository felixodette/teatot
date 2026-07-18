"use client";

import { createContext, useContext } from "react";

export type BookingContextValue = {
  isOpen: boolean;
  /** Pass room display name to pre-select Room type in the modal. */
  openBooking: (roomType?: string) => void;
  closeBooking: () => void;
  roomOptions: string[];
  preferredRoom: string;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
