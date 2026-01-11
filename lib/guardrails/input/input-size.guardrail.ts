import { BaseGuardrail } from '../core/base';

export interface InputSizeConfig {
  maxChars?: number;
}

export class InputSizeGuardrail extends BaseGuardrail<InputSizeConfig> {
  private readonly maxChars: number;

  constructor(config: InputSizeConfig = {}) {
    super('InputSizeGuardrail', 'input', config);
    this.maxChars = config.maxChars ?? 50_000;
  }

  execute(text: string) {
    const charCount = text.length;

    if (charCount > this.maxChars) {
      return this.result({
        passed: false,
        severity: 'error',
        action: 'BLOCK',
        message: `Input exceeds maximum allowed size of ${this.maxChars} characters`,
        metadata: {
          charCount,
          maxChars: this.maxChars,
          exceededBy: charCount - this.maxChars,
        },
      });
    }

    return this.result({
      passed: true,
      severity: 'info',
      action: 'ALLOW',
      message: `Input size valid (${charCount}/${this.maxChars})`,
      metadata: {
        charCount,
        maxChars: this.maxChars,
      },
    });
  }
}
