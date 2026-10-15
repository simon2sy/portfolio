import { useEffect, useState } from 'react';
import { fetchPublicRepos, type GithubRepo } from '../lib/github';

export type GithubStatus = 'loading' | 'ready' | 'error';

interface GithubReposResult {
  repos: GithubRepo[];
  status: GithubStatus;
}

const MAX_REPOS = 6;

/** Loads the most recent public repositories, with cache-aware error handling. */
export function useGithubRepos(username: string): GithubReposResult {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<GithubStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    fetchPublicRepos(username)
      .then((all) => {
        if (cancelled) return;
        setRepos(all.slice(0, MAX_REPOS));
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, status };
}
