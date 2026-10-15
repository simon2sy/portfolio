import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { GithubMark } from '../components/GithubMark';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { useSpotlight } from '../hooks/useSpotlight';
import { projects, type ProjectSpan } from '../data/projects';

const SPAN_CLASS: Record<ProjectSpan, string> = {
  wide: 'md:col-span-7',
  narrow: 'md:col-span-5',
  full: 'md:col-span-12',
};

const ASPECT_CLASS: Record<ProjectSpan, string> = {
  wide: 'aspect-[16/10]',
  narrow: 'aspect-[16/10]',
  full: 'aspect-[16/10] md:aspect-[21/9]',
};

/**
 * Selected work — unified project cards on a 12-column grid. Cards carry a
 * mouse-tracking spotlight border; each footer exposes live + source links.
 */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          id="work-title"
          index="01"
          eyebrow="Selected work"
          title="Projects built for real use."
          lede="Five live products — e-commerce, business sites and product frontends — shipped and used by actual customers."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 md:gap-y-12">
          {projects.map((project) => (
            <Reveal key={project.id} className={SPAN_CLASS[project.span]}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className="group card spotlight flex h-full flex-col overflow-hidden"
    >
      {/* Image opener — the whole screenshot is the primary tap target. */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Visit ${project.name} (opens in a new tab)`}
        className="relative block overflow-hidden bg-ink-overlay"
      >
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={1400}
          height={875}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover object-top transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.035] ${ASPECT_CLASS[project.span]}`}
        />
        {/* Bottom scrim so the chip and pill stay legible over any screenshot. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-accent backdrop-blur-sm">
          {project.index}
        </span>                  <span className="absolute right-4 top-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-white opacity-0 shadow-[var(--glow-accent)] transition-all duration-300 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100">
          Visit site
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </span>
      </a>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-heading font-semibold leading-snug tracking-tight text-paper">
            {project.name}
          </h3>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-paper-faint">
            {project.kind}
          </p>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-paper-dim md:text-[0.9375rem]">
          {project.description}
        </p>

        <ul className="mt-4 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-sm text-paper-dim">
              <span
                aria-hidden="true"
                className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-accent/70"
              />
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tool) => (
            <li key={tool} className="chip">
              {tool}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-x-6 gap-y-2 pt-6 [margin-block-start:1.5rem]">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors duration-300 hover:text-accent-2"
          >
            Live site
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out-quint group-hover/link:translate-x-1"
            />
          </a>

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-paper-faint transition-colors duration-300 hover:text-paper"
            >
              <GithubMark className="size-3.5" />
              Source
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
