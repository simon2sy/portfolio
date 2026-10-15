import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/profile';

const NAV_ITEMS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#github', label: 'GitHub' },
] as const;

/**
 * Fixed header with scroll-reactive chrome + full-screen mobile menu
 * (Esc closes, background scroll locks while open).
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const chromeActive = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          chromeActive ? 'border-line bg-ink/80 backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between">
          <a href="#top" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="flex size-8 items-center justify-center rounded-xs border border-accent/40 bg-ink-raised font-mono text-xs font-semibold text-accent transition-colors duration-300 group-hover:border-accent">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium text-paper sm:block">{profile.name}</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="eyebrow underline-slide text-paper-dim transition-colors duration-300 hover:text-paper"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-accent-dim px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-accent hover:shadow-[var(--glow-accent)]"
            >
              Contact
            </a>
          </div>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xs text-paper transition-colors hover:text-accent md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {menuOpen ? (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink md:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col gap-2 py-8">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-4 text-3xl font-semibold tracking-tight text-paper transition-colors duration-300 hover:text-accent"
              >
                <span className="eyebrow text-accent" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 rounded-full bg-accent-dim px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-accent hover:shadow-[var(--glow-accent)]"
            >
              Get in touch
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
