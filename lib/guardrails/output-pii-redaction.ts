import { BaseGuardrail, GuardrailConfig, GuardrailResult } from './base';

export class OutputPIIRedactionGuardrail extends BaseGuardrail {
  private patterns = [
    { name: 'Email', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, replacement: '[EMAIL_REDACTED]' },
    { name: 'Phone (US)', regex: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/gi, replacement: '[PHONE_REDACTED]' },
    { name: 'SSN', regex: /\b\d{3}-\d{2}-\d{4}\b/gi, replacement: '[SSN_REDACTED]' },
    { name: 'Credit Card', regex: /\b(?:\d{4}[- ]?){3}\d{4}\b/gi, replacement: '[CC_REDACTED]' },
    { name: 'IPv4', regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/gi, replacement: '[IP_REDACTED]' },
  ];

  execute(text: string): GuardrailResult {
    let redactedText = text;
    const redactions: Array<{ type: string; count: number }> = [];

    for (const pattern of this.patterns) {
      const matches = text.match(pattern.regex);
      if (matches) {
        redactedText = redactedText.replace(pattern.regex, pattern.replacement);
        redactions.push({ type: pattern.name, count: matches.length });
      }
    }

    if (redactions.length > 0) {
      const totalRedactions = redactions.reduce((sum, r) => sum + r.count, 0);
      return this.createResult(
        true,
        `Redacted ${totalRedactions} PII instance(s) from output`,
        { redactions, totalRedactions },
        redactedText
      );
    }

    return this.createResult(
      true,
      'No PII detected in output',
      { redactions: [], totalRedactions: 0 },
      text
    );
  }
}

export const tags = ['output', 'privacy'];