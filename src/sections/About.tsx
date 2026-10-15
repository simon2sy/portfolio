import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../data/profile';

/**
 * About — narrative on the left, a sticky facts ledger on the right.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          id="about-title"
          index="02"
          eyebrow="About"
          title="Practical by default, backend by nature."
          lede={profile.about.lead}
        />

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            {profile.about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="mb-6 text-base leading-relaxed text-paper-dim md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <p className="mt-8 flex items-center gap-3 font-mono text-xs text-paper-faint">
                <span aria-hidden="true" className="h-px w-10 bg-accent" />
                Everything above is backed by live, publicly reachable projects.
              </p>
            </Reveal>
          </div>

          <Reveal className="md:col-span-5" delay={0.1}>
            <dl className="md:sticky md:top-28">
              {profile.about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-b border-line py-5 last:border-b-0"
                >
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className="text-base text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
