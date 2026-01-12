import { BaseGuardrail } from '@/modules/guardrails/engine/base.guardrails';
import { GuardrailContext } from './context';
import { GuardrailResult } from './types';

export async function executeGuardrails(
  guardrails: BaseGuardrail[],
  text: string,
  context: GuardrailContext = {},
) {
  const start = Date.now();
  const results: GuardrailResult[] = [];

  for (const guardrail of guardrails) {
    try {
      const result = await guardrail.execute(text, context);
      results.push(result);

      if (result.action === 'BLOCK') break;
    } catch (err: any) {
      results.push({
        passed: false,
        guardrailName: guardrail.name,
        action: 'BLOCK',
        severity: 'error',
        message: err?.message ?? 'Guardrail execution failed',
      });
      break;
    }
  }

  return {
    passed: results.every((r) => r.passed),
    results,
    executionTimeMs: Date.now() - start,
    summary: {
      total: results.length,
      passed: results.filter((r) => r.passed).length,
      failed: results.filter((r) => !r.passed).length,
    },
  };
}
