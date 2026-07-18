"use client";

import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import BookingModal from "@/components/BookingModal";
import { BookingContext } from "@/providers/booking-context";

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
