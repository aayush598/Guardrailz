export class GuardrailExecutionError extends Error {
  constructor(
    public readonly guardrail: string,
    message: string,
  ) {
    super(message);
    this.name = 'GuardrailExecutionError';
  }
}
