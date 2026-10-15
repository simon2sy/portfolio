import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { stackGroups } from '../data/stack';

const MARQUEE_ITEMS = stackGroups.flatMap((group) => group.items);

/**
 * Toolbox — an infinite marquee of technologies, then three columns of
 * evidence-backed detail.
 */
export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          id="stack-title"
          index="03"
          eyebrow="Toolbox"
          title="The tools behind the work."
          lede="Every item below is evidenced by a live project or a public repository — nothing decorative."
        />

        {/* Infinite marquee — pauses on hover, hidden from screen readers. */}
        <Reveal>
          <div
            aria-hidden="true"
            className="relative overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
          >
            <div className="marquee-track items-center gap-10 pr-10">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center gap-10">
                  {MARQUEE_ITEMS.map((item) => (
                    <span key={`${copy}-${item}`} className="flex items-center gap-10">
                      <span className="font-mono text-sm text-paper-dim transition-colors duration-300 hover:text-accent">
                        {item}
                      </span>
                      <span className="size-1 rounded-full bg-accent/50" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {stackGroups.map((group, index) => (
            <Reveal key={group.name} delay={index * 0.08}>
              <div className="rule pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-heading font-semibold tracking-tight text-paper">{group.name}</h3>
                  <span className="eyebrow text-accent" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-1 text-sm text-paper-faint">{group.note}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
