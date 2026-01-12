export const HUB_TAGS = [
  'input',
  'output',
  'tool',
  'security',
  'privacy',
  'compliance',
  'content-safety',
  'enterprise',
  'healthcare',
  'finance',
] as const;

export type HubTag = (typeof HUB_TAGS)[number];
