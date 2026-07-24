"use client";

import { useBooking } from "@/providers/booking-context";
import { track } from "@/lib/analytics";

type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  /** Room display name — pre-fills Room type in BookingModal */
  roomType?: string;
};

export default function BookNowButton({
  className,
  children = "Book Now",
  onClick,
  roomType,
}: Props) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      className={className ?? "cursor-pointer"}
      onClick={() => {
        track("book_start", { room_type: roomType ?? "unspecified" });
        onClick?.();
        openBooking(roomType);
      }}
    >
      {children}
    </button>
  );
}
