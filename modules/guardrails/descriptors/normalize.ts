import { GuardrailDescriptor } from './types';

export function normalizeDescriptor(raw: unknown): GuardrailDescriptor | null {
  if (!raw) return null;

  if (typeof raw === 'object' && (raw as any).name) {
    return {
      name: String((raw as any).name),
      config: (raw as any).config,
    };
  }

  if (typeof raw === 'object' && (raw as any).class) {
    return {
      name: String((raw as any).class).replace(/Guardrail$/, ''),
      config: (raw as any).config,
    };
  }

  if (typeof raw === 'string') {
    return {
      name: raw.replace(/Guardrail$/, ''),
    };
  }

  return null;
}
