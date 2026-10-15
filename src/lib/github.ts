/**
 * Minimal GitHub REST client for public repository data.
 *
 * - Uses the unauthenticated public API (no tokens in frontend code).
 * - Caches responses in localStorage to respect rate limits (60 req/h unauth).
 * - Throws typed errors the UI can render gracefully.
 */

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  htmlUrl: string;
  homepage: string | null;
  updatedAt: string;
  stars: number;
  topics: string[];
}

interface RawRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  stargazers_count: number;
  topics: string[];
  fork: boolean;
}

const API_BASE = 'https://api.github.com';
const CACHE_KEY = 'simon-portfolio:github-repos';
const CACHE_TTL_MS = 30 * 60 * 1000;

interface CacheEnvelope {
  savedAt: number;
  repos: GithubRepo[];
}

export class GithubError extends Error {
  constructor(
    message: string,
    readonly kind: 'rate-limit' | 'network' | 'unknown',
  ) {
    super(message);
    this.name = 'GithubError';
  }
}

function readCache(): GithubRepo[] | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEnvelope;
    if (!Array.isArray(parsed.repos)) return null;
    // Serve stale cache on failure, refresh when fresh.
    return parsed.repos;
  } catch {
    return null;
  }
}

function isCacheFresh(): boolean {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as CacheEnvelope;
    return Date.now() - parsed.savedAt < CACHE_TTL_MS;
  } catch {
    return false;
  }
}

function writeCache(repos: GithubRepo[]): void {
  try {
    const envelope: CacheEnvelope = { savedAt: Date.now(), repos };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(envelope));
  } catch {
    /* storage full or blocked — the section still works without caching */
  }
}

function mapRepo(raw: RawRepo): GithubRepo {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    language: raw.language,
    htmlUrl: raw.html_url,
    homepage: raw.homepage || null,
    updatedAt: raw.updated_at,
    stars: raw.stargazers_count,
    topics: raw.topics ?? [],
  };
}

/**
 * Fetch the user's public repositories (forks excluded), newest first.
 * Returns cached data when fresh; only hits the network otherwise.
 */
export async function fetchPublicRepos(username: string): Promise<GithubRepo[]> {
  if (isCacheFresh()) {
    const cached = readCache();
    if (cached) return cached;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/users/${username}/repos?per_page=100&sort=updated`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
  } catch {
    const stale = readCache();
    if (stale) return stale;
    throw new GithubError('Could not reach the GitHub API.', 'network');
  }

  if (response.status === 403 || response.status === 429) {
    const stale = readCache();
    if (stale) return stale;
    throw new GithubError('GitHub API rate limit reached.', 'rate-limit');
  }

  if (!response.ok) {
    const stale = readCache();
    if (stale) return stale;
    throw new GithubError(`GitHub API responded with ${response.status}.`, 'unknown');
  }

  const raw = (await response.json()) as RawRepo[];
  const repos = raw
    .filter((repo) => !repo.fork)
    .map(mapRepo)
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

  writeCache(repos);
  return repos;
}
