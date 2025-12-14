import { BaseGuardrail, GuardrailConfig, GuardrailResult } from './base';

export interface InputSizeGuardrailConfig extends GuardrailConfig {
  maxChars?: number;
}

export class InputSizeGuardrail extends BaseGuardrail {
  private maxChars: number;

  constructor(config: InputSizeGuardrailConfig = {}) {
    super(config);
    this.maxChars = config.maxChars || 50000;
  }

  execute(text: string): GuardrailResult {
    const charCount = text.length;

    if (charCount > this.maxChars) {
      return this.createResult(
        false,
        `Input exceeds maximum size of ${this.maxChars} characters`,
        { charCount, maxChars: this.maxChars, exceeded: charCount - this.maxChars }
      );
    }

    return this.createResult(
      true,
      `Input size valid (${charCount}/${this.maxChars} characters)`,
      { charCount, maxChars: this.maxChars }
    );
  }
}

export const tags = ['input', 'general'];