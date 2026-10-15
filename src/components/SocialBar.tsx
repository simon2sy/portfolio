/**
 * Fixed social bar — GitHub, Facebook and Instagram links pinned to the
 * bottom of the viewport (they never scroll away). Brand marks are inline
 * SVGs because lucide-react dropped brand icons.
 */
import { GithubMark } from './GithubMark';
import { profile } from '../data/profile';

const LINKS = [
  { href: profile.github, label: 'GitHub', icon: 'github' },
  { href: profile.facebook, label: 'Facebook', icon: 'facebook' },
  { href: profile.instagram, label: 'Instagram', icon: 'instagram' },
] as const;

function FacebookMark({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function InstagramMark({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SocialBar() {
  return (
    <nav
      aria-label="Social profiles"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-line bg-ink-raised/90 px-2 py-1.5 shadow-[0_8px_30px_rgb(22_24_29/0.16)] backdrop-blur-md">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={link.label}
            title={link.label}
            className="flex size-10 items-center justify-center rounded-full text-paper-dim transition-all duration-200 hover:bg-ink hover:text-accent"
          >
            {link.icon === 'github' ? <GithubMark className="size-4.5" /> : null}
            {link.icon === 'facebook' ? <FacebookMark className="size-4.5" /> : null}
            {link.icon === 'instagram' ? <InstagramMark className="size-4.5" /> : null}
          </a>
        ))}
      </div>
    </nav>
  );
}
