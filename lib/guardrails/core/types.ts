export type GuardrailStage = 'input' | 'output' | 'tool' | 'general';

export type GuardrailAction = 'ALLOW' | 'WARN' | 'BLOCK' | 'MODIFY';

export type GuardrailSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface GuardrailResult {
  /** Did this guardrail pass */
  passed: boolean;

  /** Guardrail identifier */
  guardrailName: string;

  /** Action taken */
  action: GuardrailAction;

  /** Severity level */
  severity: GuardrailSeverity;

  /** Human-readable message */
  message?: string;

  /** Optional redacted output */
  redactedText?: string;

  /** Arbitrary metadata */
  metadata?: Record<string, unknown>;
}
