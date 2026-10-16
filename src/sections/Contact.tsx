import { GithubMark } from '../components/GithubMark';
import { Reveal } from '../components/Reveal';
import { profile } from '../data/profile';

const SOCIALS = [
  { href: profile.github, label: 'GitHub', icon: 'github' as const },
  { href: profile.facebook, label: 'Facebook', icon: 'facebook' as const },
  { href: profile.instagram, label: 'Instagram', icon: 'instagram' as const },
];

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

/**
 * Closing contact block + footer. Email and LinkedIn render automatically
 * once filled into src/data/profile.ts — GitHub is the primary channel.
 * The social row lives here instead of a floating bar, so it never
 * overlaps page content.
 */
export function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-line pt-24 pb-12 md:pt-32"
    >
      <div className="shell">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper-faint">
            <span className="text-accent" aria-hidden="true">
              05
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
            <span>Contact</span>
          </p>

          <h2
            id="contact-title"
            className="mt-5 max-w-4xl text-display font-semibold leading-[1.08] tracking-tight text-paper text-balance-tight"
          >
            Let&rsquo;s build something{' '}
            <span className="gradient-text">useful.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lead text-paper-dim">
            {profile.availability} — currently based in {profile.location}.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent-dim px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent hover:shadow-[var(--glow-accent)]"
            >
              <GithubMark className="size-4" />
              {profile.githubHandle}
            </a>

            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {profile.email}
              </a>
            ) : null}

            {profile.linkedin ? (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
            ) : null}
          </div>

          {!profile.email ? (
            <p className="mt-4 max-w-md text-sm text-paper-faint">
              No public inbox listed — GitHub issues or a profile message is the
              fastest way to reach me.
            </p>
          ) : null}
        </Reveal>

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                title={social.label}
                className="flex size-10 items-center justify-center rounded-full border border-line text-paper-dim transition-all duration-300 hover:border-accent hover:text-accent"
              >
                {social.icon === 'github' ? <GithubMark className="size-4" /> : null}
                {social.icon === 'facebook' ? <FacebookMark className="size-4" /> : null}
                {social.icon === 'instagram' ? <InstagramMark className="size-4" /> : null}
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-paper-faint">
            © {year} {profile.fullName} — {profile.domain}
          </p>

          <div className="flex items-center gap-6 md:justify-end">
            <p className="font-mono text-xs text-paper-faint">
              React · Vite · Tailwind CSS
            </p>
            <a
              href="#top"
              className="eyebrow underline-slide text-paper-dim transition-colors duration-300 hover:text-paper"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
