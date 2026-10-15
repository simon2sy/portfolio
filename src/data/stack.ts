export interface StackGroup {
  name: string;
  note: string;
  items: string[];
}

/**
 * Only technologies evidenced by Simon's live projects and public
 * repositories (requirements.txt of candleproject, package.json of
 * thresherproject / Lachi / TrustNepalTechnologies, deployments, CI files).
 */
export const stackGroups: StackGroup[] = [
  {
    name: 'Backend',
    note: 'Where most of my work lives',
    items: ['Python', 'Django', 'Django REST Framework', 'REST API design', 'JWT authentication'],
  },
  {
    name: 'Frontend',
    note: 'Interfaces wired to those APIs',
    items: ['React', 'JavaScript', 'HTML & CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'Data & delivery',
    note: 'From schema to production',
    items: ['PostgreSQL', 'Git & GitHub', 'GitHub Actions', 'Vercel', 'Netlify', 'PythonAnywhere'],
  },
];
