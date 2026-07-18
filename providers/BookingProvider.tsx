"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import BookingModal from "@/components/BookingModal";

type BookingContextValue = {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
  roomOptions: string[];
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export function BookingProvider({
  children,
  roomOptions,
}: {
  children: ReactNode;
  roomOptions: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(0);
  const openBooking = useCallback(() => setIsOpen(true), []);
  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setSession((s) => s + 1);
  }, []);

  const value = useMemo(
    () => ({ isOpen, openBooking, closeBooking, roomOptions }),
    [isOpen, openBooking, closeBooking, roomOptions],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal key={session} />
    </BookingContext.Provider>
  );
}
