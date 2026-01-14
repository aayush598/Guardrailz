import type { GuardrailDescriptor } from '@/modules/guardrails/descriptors/types';

export interface ProfileUI {
  id: string;
  name: string;
  description: string;
  isBuiltIn: boolean;
  inputGuardrails: GuardrailDescriptor[];
  outputGuardrails: GuardrailDescriptor[];
  toolGuardrails: GuardrailDescriptor[];
}
