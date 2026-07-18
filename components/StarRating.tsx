/** Out-of-5 star row — gold filled, deep grey empty. Works all breakpoints. */
export default function StarRating({
  rating,
  max = 5,
  size = 16,
}: {
  rating: number;
  max?: number;
  size?: number;
}) {
  const filled = Math.min(max, Math.max(0, Math.round(rating)));

  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${filled} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={i < filled ? "text-[#C9A227]" : "text-[#3D3D3D]"}
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
