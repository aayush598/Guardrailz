export interface DocsVersion {
  id: string;
  label: string;
  isLatest: boolean;
  pathPrefix: string;
  deprecated?: boolean;
}

/**
 * Documentation Versions
 *
 * Rules:
 * - `pathPrefix` maps to URL segment
 * - Latest version must have `isLatest = true`
 */
export const docsVersions: DocsVersion[] = [
  {
    id: 'v1',
    label: 'v1 (Current)',
    isLatest: true,
    pathPrefix: '',
  },

  // Future example
  // {
  //   id: 'v2',
  //   label: 'v2 (Beta)',
  //   isLatest: false,
  //   pathPrefix: 'v2',
  // },
];

/**
 * Helper to resolve default docs version
 */
export function getLatestDocsVersion(): DocsVersion {
  const latest = docsVersions.find((v) => v.isLatest);
  if (!latest) {
    throw new Error('No latest docs version configured');
  }
  return latest;
}
