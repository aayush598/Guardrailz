export interface GuardrailDescriptor {
  name: string;
  config?: Record<string, unknown>;
}

export interface GuardrailResult {
  guardrailName: string;
  passed: boolean;
  severity?: string;
  message?: string;
}
