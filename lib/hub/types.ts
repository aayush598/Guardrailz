export type Stage = 'development' | 'completed' | 'maintenance';

export type HubTag =
  | 'input'
  | 'output'
  | 'tool'
  | 'security'
  | 'privacy'
  | 'compliance'
  | 'content-safety'
  | 'enterprise'
  | 'healthcare'
  | 'finance';

export interface HubStats {
  views: number;
  likes: number;
  shares: number;
}

export interface GuardrailMeta {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: HubTag[];
  stage: Stage;
  icon: string;
  stats: HubStats;
}

export interface ProfileMeta {
  id: string;
  slug: string;
  name: string;
  description: string;
  guardrails: string[];
  tags: HubTag[];
  stage: Stage;
  icon: string;
  stats: HubStats;
}
