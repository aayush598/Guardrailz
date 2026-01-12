export interface DocsNavItem {
  title: string;
  slug: string;
}

export interface DocsNavSection {
  section: string;
  items: DocsNavItem[];
}

/**
 * Docs Navigation Configuration
 *
 * ❗ Rules:
 * - `slug` maps to `/docs/${slug}`
 * - Folder structure MUST mirror slugs
 * - Do not hardcode navigation in components
 */
export const docsNavigation: DocsNavSection[] = [
  {
    section: 'Introduction',
    items: [
      { title: 'Overview', slug: 'introduction/overview' },
      { title: 'Architecture', slug: 'introduction/architecture' },
      { title: 'Core Concepts', slug: 'introduction/concepts' },
    ],
  },

  {
    section: 'Getting Started',
    items: [
      { title: 'Installation', slug: 'getting-started/installation' },
      { title: 'Quickstart', slug: 'getting-started/quickstart' },
      { title: 'Playground', slug: 'getting-started/playground' },
    ],
  },

  {
    section: 'API',
    items: [
      { title: 'Validate API', slug: 'api/validate' },
      { title: 'Profiles API', slug: 'api/profiles' },
      { title: 'Analytics API', slug: 'api/analytics' },
      { title: 'Error Handling', slug: 'api/errors' },
    ],
  },

  {
    section: 'SDK',
    items: [
      { title: 'Overview', slug: 'sdk/overview' },
      { title: 'Client', slug: 'sdk/client' },
      { title: 'Guardrails', slug: 'sdk/guardrails' },
      { title: 'Examples', slug: 'sdk/examples' },
    ],
  },

  {
    section: 'Guardrails',
    items: [
      { title: 'Overview', slug: 'guardrails/overview' },
      { title: 'Input Guardrails', slug: 'guardrails/input' },
      { title: 'Output Guardrails', slug: 'guardrails/output' },
      { title: 'Tool Guardrails', slug: 'guardrails/tool' },
      { title: 'Custom Guardrails', slug: 'guardrails/writing-custom' },
    ],
  },

  {
    section: 'Profiles',
    items: [
      { title: 'Overview', slug: 'profiles/overview' },
      { title: 'Built-in Profiles', slug: 'profiles/built-in' },
      { title: 'Custom Profiles', slug: 'profiles/custom' },
      { title: 'Profile Compilation', slug: 'profiles/compilation' },
    ],
  },

  {
    section: 'Analytics',
    items: [
      { title: 'Overview', slug: 'analytics/overview' },
      { title: 'Events', slug: 'analytics/events' },
      { title: 'Queries', slug: 'analytics/queries' },
      { title: 'Dashboards', slug: 'analytics/dashboards' },
    ],
  },

  {
    section: 'Deployment',
    items: [
      { title: 'Environment', slug: 'deployment/environment' },
      { title: 'Security', slug: 'deployment/security' },
      { title: 'Scaling', slug: 'deployment/scaling' },
    ],
  },
];
