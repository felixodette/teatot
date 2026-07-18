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
  /** Pass room display name to pre-select Room type in the modal. */
  openBooking: (roomType?: string) => void;
  closeBooking: () => void;
  roomOptions: string[];
  preferredRoom: string;
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
  const [preferredRoom, setPreferredRoom] = useState("");

  const openBooking = useCallback((roomType?: string) => {
    setPreferredRoom(roomType ?? "");
    setSession((s) => s + 1); // remount modal so defaultValue / form reset apply
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, openBooking, closeBooking, roomOptions, preferredRoom }),
    [isOpen, openBooking, closeBooking, roomOptions, preferredRoom],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal key={session} />
    </BookingContext.Provider>
  );
}
