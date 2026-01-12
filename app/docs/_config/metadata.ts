import { Metadata } from 'next';

export const docsMetadata: Metadata = {
  title: {
    default: 'Guardrails Documentation',
    template: '%s · Guardrails Docs',
  },
  description:
    'Official documentation for Guardrails — production-grade safety, security, and compliance for LLM applications.',
  keywords: [
    'LLM guardrails',
    'AI safety',
    'content moderation',
    'prompt injection',
    'AI compliance',
    'Guardrails SDK',
  ],
  authors: [{ name: 'Guardrails Team' }],
  openGraph: {
    type: 'website',
    title: 'Guardrails Documentation',
    description:
      'Production-ready guardrails for AI systems. Learn how to secure, control, and scale LLM applications.',
    url: 'https://guardrails.ai/docs',
    siteName: 'Guardrails',
    images: [
      {
        url: '/og/docs.png',
        width: 1200,
        height: 630,
        alt: 'Guardrails Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guardrails Documentation',
    description: 'Learn how to implement production-grade guardrails for LLM applications.',
    images: ['/og/docs.png'],
  },
};
