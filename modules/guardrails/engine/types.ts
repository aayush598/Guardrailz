export type GuardrailStage = 'input' | 'output' | 'tool' | 'general';

export type GuardrailAction = 'ALLOW' | 'WARN' | 'BLOCK' | 'MODIFY';

export type GuardrailSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface GuardrailResult {
  passed: boolean;
  guardrailName: string;
  action: GuardrailAction;
  severity: GuardrailSeverity;
  message?: string;
  redactedText?: string;
  metadata?: Record<string, unknown>;
}
