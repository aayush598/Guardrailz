import { InputSizeGuardrail } from './input-size';
import { SecretsInInputGuardrail } from './secrets-in-input';
import { OutputPIIRedactionGuardrail } from './output-pii-redaction';
import { BaseGuardrail } from './base';

// Guardrail Registry
export const GUARDRAIL_REGISTRY: Record<string, typeof BaseGuardrail> = {
  InputSizeGuardrail,
  SecretsInInputGuardrail,
  OutputPIIRedactionGuardrail,
};

// Get guardrail instance by class name
export function getGuardrailInstance(className: string, config: any = {}): BaseGuardrail {
  const GuardrailClass = GUARDRAIL_REGISTRY[className];
  if (!GuardrailClass) {
    throw new Error(`Guardrail ${className} not found in registry`);
  }
  return new GuardrailClass(config);
}

// Execute multiple guardrails in parallel
export async function executeGuardrails(
  guardrails: Array<{ class: string; config?: any }>,
  text: string,
  context?: any
) {
  const startTime = Date.now();
  
  const results = await Promise.all(
    guardrails.map(async (guardDef) => {
      try {
        const guard = getGuardrailInstance(guardDef.class, guardDef.config);
        return await guard.execute(text, context);
      } catch (error: any) {
        return {
          passed: false,
          guardrailName: guardDef.class,
          severity: 'error' as const,
          message: `Error executing guardrail: ${error.message}`,
          details: { error: error.message },
        };
      }
    })
  );

  const executionTime = Date.now() - startTime;
  const allPassed = results.every((r) => r.passed);

  return {
    passed: allPassed,
    results,
    executionTimeMs: executionTime,
    summary: {
      total: results.length,
      passed: results.filter((r) => r.passed).length,
      failed: results.filter((r) => !r.passed).length,
    },
  };
}