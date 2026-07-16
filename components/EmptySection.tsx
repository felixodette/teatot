import Link from "next/link";

interface Props {
  title: string;
  message: string;
  action?: { label: string; href: string; external?: boolean };
}

export default function EmptySection({ title, message, action }: Props) {
  return (
    <div className="rounded-lg bg-[var(--color-bg-subtle)] px-8 py-16 text-center">
      <p className="text-lg font-medium">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[var(--color-text-secondary)]">
        {message}
      </p>
      {action && (
        <div className="mt-8">
          {action.external ? (
            <a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {action.label}
            </a>
          ) : (
            <Link href={action.href} className="btn-secondary">
              {action.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
