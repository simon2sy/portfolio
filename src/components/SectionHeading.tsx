import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
}

/**
 * Shared section header — mono index line up top, then an editorial split:
 * large title left, supporting lede right (stacked on mobile).
 */
export function SectionHeading({ id, index, eyebrow, title, lede }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper-faint">
        <span className="text-accent" aria-hidden="true">
          {index}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
        <span>{eyebrow}</span>
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-12 md:items-end md:gap-8">
        <h2
          id={id}
          className="md:col-span-7 text-title font-semibold leading-[1.12] tracking-tight text-paper text-balance-tight"
        >
          {title}
        </h2>
        {lede ? (
          <p className="md:col-span-5 text-base leading-relaxed text-paper-dim md:text-lg md:border-l md:border-line md:pl-8">
            {lede}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
