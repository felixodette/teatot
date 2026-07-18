"use client";

import { useBooking } from "@/providers/booking-context";

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
        onClick?.();
        openBooking(roomType);
      }}
    >
      {children}
    </button>
  );
}
