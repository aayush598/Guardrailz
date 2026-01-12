import { guardrailRegistry } from '@/modules/guardrails/engine/registry';

// Content / policy guardrails
import { DefamationGuardrail } from '@/modules/guardrails/guards/content/defamation.guardrail';
import { MedicalAdviceGuardrail } from '@/modules/guardrails/guards/content/medical-advice.guardrail';
import { ViolenceGuardrail } from '@/modules/guardrails/guards/content/violence.guardrail';

guardrailRegistry.register('Defamation', (c) => new DefamationGuardrail(c));
guardrailRegistry.register('MedicalAdvice', (c) => new MedicalAdviceGuardrail(c));
guardrailRegistry.register('Violence', (c) => new ViolenceGuardrail(c));
