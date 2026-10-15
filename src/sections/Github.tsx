import { ArrowUpRight, GitBranch, Star } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { useSpotlight } from '../hooks/useSpotlight';
import { profile } from '../data/profile';
import { useGithubRepos } from '../hooks/useGithubRepos';
import type { GithubRepo } from '../lib/github';

/**
 * Human descriptions for repos the GitHub API reports without one.
 * Keys are repo names; keep entries consistent with the live repos.
 */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  CSS: '#563d7c',
  HTML: '#e34c26',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Vue: '#41b883',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Live repository board — GitHub API cards on a responsive grid with a
 * mouse-tracking spotlight border, plus loading, empty and error states.
 */
export function Github() {
  const { repos, status } = useGithubRepos(profile.githubHandle);

  return (
    <section id="github" aria-labelledby="github-title" className="py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          id="github-title"
          index="04"
          eyebrow="Live from GitHub"
          title="Recent repositories."
          lede="Pulled straight from the GitHub API — newest first, cached briefly so rate limits stay happy."
        />

        <Reveal>
          {status === 'loading' ? (
            <div aria-hidden="true" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <span role="status" className="sr-only">
                Loading repositories from GitHub…
              </span>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="card animate-pulse p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-4 w-2/3 rounded-xs bg-line" />
                    <div className="size-4 rounded-full bg-line" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3.5 w-full rounded-xs bg-line" />
                    <div className="h-3.5 w-3/4 rounded-xs bg-line" />
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-3 w-20 rounded-xs bg-line" />
                    <div className="h-3 w-10 rounded-xs bg-line" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="card flex flex-col items-start gap-4 p-7">
              <p className="max-w-2xl text-sm leading-relaxed text-paper-dim">
                Couldn&rsquo;t reach the GitHub API right now — it may be rate-limited.
                The full list always lives on my profile.
              </p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-accent-dim px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent hover:shadow-[var(--glow-accent)]"
              >
                Open github.com/{profile.githubHandle}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          ) : null}

          {status === 'ready' && repos.length === 0 ? (
            <p className="text-sm text-paper-dim">No public repositories yet.</p>
          ) : null}

          {status === 'ready' && repos.length > 0 ? (
            <div>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                <p className="eyebrow">{repos.length} most recently updated</p>
                <a
                  href={`${profile.github}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="eyebrow flex items-center gap-1.5 text-accent transition-colors duration-300 hover:text-accent-2"
                >
                  View all on GitHub
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
          ) : null}
        </Reveal>

        <div className="mt-10 text-center">
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[var(--glow-accent)]"
          >
            See all repositories on GitHub
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const { ref, onPointerMove } = useSpotlight<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      onPointerMove={onPointerMove}
      href={repo.htmlUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="card spotlight group flex flex-col p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2">
          <GitBranch
            aria-hidden="true"
            className="size-3.5 shrink-0 text-paper-faint transition-colors duration-300 group-hover:text-accent"
          />
          <span className="truncate font-mono text-sm font-semibold text-paper transition-colors duration-300 group-hover:text-accent">
            {repo.name}
          </span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-paper-faint opacity-0 transition-all duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
        />
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs text-paper-faint">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-2 rounded-full"
              style={{
                backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#737b8d',
                boxShadow: `0 0 8px ${LANGUAGE_COLORS[repo.language] ?? '#737b8d'}66`,
              }}
            />
            {repo.language}
          </span>
        ) : null}
        {repo.stars > 0 ? (
          <span className="flex items-center gap-1">
            <Star aria-hidden="true" className="size-3.5" />
            {repo.stars}
          </span>
        ) : null}
        <span className="ml-auto font-mono text-[0.6875rem] uppercase tracking-[0.08em]">
          {formatDate(repo.updatedAt)}
        </span>
      </div>
    </a>
  );
}
