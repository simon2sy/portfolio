import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: 'quiet' | 'accent';
  className?: string;
}

/**
 * Inline link with a directional arrow that shifts on hover.
 */
export function ArrowLink({
  href,
  children,
  external = true,
  variant = 'quiet',
  className = '',
}: ArrowLinkProps) {
  const tone =
    variant === 'accent'
      ? 'text-accent hover:text-paper'
      : 'text-paper-dim hover:text-paper';

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={`group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${tone} ${className}`}
    >
      <span className="underline-slide">{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
