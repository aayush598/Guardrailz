// Base Guardrail Class
export interface GuardrailConfig {
  severity?: 'info' | 'warning' | 'error' | 'critical';
  [key: string]: any;
}

export interface GuardrailResult {
  passed: boolean;
  guardrailName: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  details?: any;
  redactedText?: string;
}

export abstract class BaseGuardrail {
  protected config: GuardrailConfig;
  protected name: string;

  constructor(config: GuardrailConfig = {}) {
    this.config = config;
    this.name = this.constructor.name;
  }

  abstract execute(text: string, context?: any): Promise<GuardrailResult> | GuardrailResult;

  protected createResult(
    passed: boolean,
    message: string,
    details?: any,
    redactedText?: string
  ): GuardrailResult {
    return {
      passed,
      guardrailName: this.name,
      severity: this.config.severity || 'warning',
      message,
      details,
      redactedText,
    };
  }
}

// Guardrail Types
export type GuardrailType = 'input' | 'output' | 'tool' | 'general';