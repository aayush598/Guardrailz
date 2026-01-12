import '../registry';
import { normalizeDescriptor } from '../descriptors/normalize';
import { guardrailRegistry } from '../engine/registry';
import { executeGuardrails } from '../engine/executor';
import { GuardrailContext } from '../engine/context';

export async function runGuardrails(
  rawDescriptors: unknown[],
  text: string,
  context: GuardrailContext,
) {
  const instances = rawDescriptors
    .map(normalizeDescriptor)
    .filter(Boolean)
    .map((d) => guardrailRegistry.create(d!.name, d!.config));

  return executeGuardrails(instances, text, context);
}
