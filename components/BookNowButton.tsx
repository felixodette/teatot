"use client";

import { useBooking } from "@/providers/BookingProvider";

type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function BookNowButton({
  className,
  children = "Book Now",
  onClick,
}: Props) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openBooking();
      }}
    >
      {children}
    </button>
  );
}
