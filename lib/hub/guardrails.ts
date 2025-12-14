import { GuardrailMeta } from './types';

export const GUARDRAILS: GuardrailMeta[] = [
  {
    id: 'pii-detection',
    slug: 'pii-detection',
    name: 'PII Detection Guardrail',
    description: 'Detects and optionally redacts personally identifiable information.',
    category: 'Input Validation',
    tags: ['input', 'privacy', 'compliance'],
    stage: 'completed',
    icon: '/icons/pii.svg',
    stats: { views: 1240, likes: 312, shares: 88 },
  },
  {
    id: 'prompt-injection',
    slug: 'prompt-injection',
    name: 'Prompt Injection Signature Guardrail',
    description: 'Detects known prompt injection patterns.',
    category: 'Prompt Security',
    tags: ['input', 'security'],
    stage: 'completed',
    icon: '/icons/shield.svg',
    stats: { views: 980, likes: 201, shares: 65 },
  },
  {
    id: 'llm-classifier-injection',
    slug: 'llm-classifier-injection',
    name: 'LLM Classifier Injection Guardrail',
    description: 'ML-based injection detection (in progress).',
    category: 'Prompt Security',
    tags: ['input', 'security'],
    stage: 'development',
    icon: '/icons/ai.svg',
    stats: { views: 410, likes: 44, shares: 9 },
  },
];
