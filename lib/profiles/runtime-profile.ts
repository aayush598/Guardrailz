import { GuardrailDescriptor } from '@/modules/guardrails/descriptors/types';

export interface RuntimeProfile {
  id: string;
  name: string;

  // precomputed
  input: GuardrailDescriptor[];
  output: GuardrailDescriptor[];
  both: GuardrailDescriptor[];
}
