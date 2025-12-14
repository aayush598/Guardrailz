import { BaseGuardrail, GuardrailConfig, GuardrailResult } from './base';

export class SecretsInInputGuardrail extends BaseGuardrail {
  private patterns = [
    { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/gi },
    { name: 'GitHub Token', regex: /ghp_[a-zA-Z0-9]{36}/gi },
    { name: 'OpenAI API Key', regex: /sk-[a-zA-Z0-9]{48}/gi },
    { name: 'Stripe API Key', regex: /sk_(test|live)_[0-9a-zA-Z]{24,99}/gi },
    { name: 'Generic API Key', regex: /api[_-]?key[\s:="']+[a-zA-Z0-9_\-]{16,}/gi },
    { name: 'Bearer Token', regex: /Bearer\s+[a-zA-Z0-9_\-\.]{20,}/gi },
    { name: 'Private Key', regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/gi },
    { name: 'JWT Token', regex: /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/gi },
  ];

  execute(text: string): GuardrailResult {
    const foundSecrets: Array<{ type: string; match: string }> = [];

    for (const pattern of this.patterns) {
      const matches = text.match(pattern.regex);
      if (matches) {
        matches.forEach((match) => {
          foundSecrets.push({ type: pattern.name, match: this.maskSecret(match) });
        });
      }
    }

    if (foundSecrets.length > 0) {
      return this.createResult(
        false,
        `Found ${foundSecrets.length} potential secret(s) in input`,
        { secrets: foundSecrets, count: foundSecrets.length }
      );
    }

    return this.createResult(
      true,
      'No secrets detected in input',
      { count: 0 }
    );
  }

  private maskSecret(secret: string): string {
    if (secret.length <= 8) return '***';
    return secret.substring(0, 4) + '***' + secret.substring(secret.length - 4);
  }
}

export const tags = ['input', 'security'];