import { ArrowRight } from 'lucide-react';
import { ArrowLink } from '../components/ArrowLink';
import { Reveal } from '../components/Reveal';
import { profile } from '../data/profile';

const FACTS = [
  { label: 'Based in', value: profile.location },
  { label: 'Focus', value: 'Backend & full-stack web' },
  { label: 'Core stack', value: 'Django · React · PostgreSQL' },
];

/**
 * Full-height hero on a dark canvas: ambient aurora glow + dot grid behind
 * an editorial headline whose accent phrase carries the site gradient.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Ambient backdrop — one controlled glow + faint dot grid, decorative. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0" />
        <div className="absolute -top-32 right-[12%] size-[30rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-[54%] right-0 size-72 rounded-full bg-accent-2/10 blur-[100px]" />
      </div>

      <div className="relative flex flex-1 flex-col justify-center pt-28 pb-14 md:pt-32">
        <div className="shell">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <Reveal delay={0.05}>
                <p className="eyebrow flex items-center gap-2.5 text-paper-dim">
                  <span aria-hidden="true" className="relative flex size-1.5">
                    <span className="absolute inset-0 rounded-full bg-accent animate-signal" />
                    <span className="relative size-1.5 rounded-full bg-accent" />
                  </span>
                  {profile.availability}
                </p>
              </Reveal>

              <h1 className="mt-6 text-display font-semibold leading-[1.08] tracking-tight text-paper text-balance-tight">
                {profile.hero.headlineLead}{' '}
                <span className="gradient-text">{profile.hero.headlineAccent}</span>
              </h1>

              <Reveal delay={0.15}>
                <p className="mt-7 max-w-2xl text-lead text-paper-dim">{profile.hero.intro}</p>

                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2 rounded-full bg-accent-dim px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent hover:shadow-[var(--glow-accent)]"
                  >
                    View selected work
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1"
                    />
                  </a>
                  <ArrowLink href={profile.github}>
                    github.com/{profile.githubHandle}
                  </ArrowLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="md:col-span-5">
              <figure className="relative mx-auto max-w-sm md:max-w-none">
                {/* Soft accent halo behind the portrait. */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-accent-2/25 blur-xl"
                />
                <div className="overflow-hidden rounded-md border border-line bg-ink-raised shadow-[0_24px_60px_-40px_rgb(22_24_29/0.4)]">
                  <img
                    src={profile.photo}
                    alt={`${profile.fullName} — seated outdoors with a mountain backdrop`}
                    width={900}
                    height={1600}
                    decoding="async"
                    fetchPriority="high"
                    className="aspect-[3/4] w-full object-cover object-center"
                  />
                </div>
                <figcaption className="absolute bottom-3 left-3 rounded-full border border-line bg-ink/85 px-3 py-1.5 font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-paper uppercase backdrop-blur-sm">
                  {profile.fullName} — {profile.role}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal delay={0.25} className="relative shell pb-10">
        <dl className="rule grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3">
          {FACTS.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5">
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="text-sm text-paper">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
