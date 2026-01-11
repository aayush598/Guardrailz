import { GuardrailResult, GuardrailStage } from './types';

export abstract class BaseGuardrail<Config = any> {
  readonly name: string;
  readonly stage: GuardrailStage;
  protected config: Config;

  constructor(name: string, stage: GuardrailStage, config: Config) {
    this.name = name;
    this.stage = stage;
    this.config = config;
  }

  abstract execute(): Promise<GuardrailResult> | GuardrailResult;

  protected result(partial: Omit<GuardrailResult, 'guardrailName'>): GuardrailResult {
    return {
      guardrailName: this.name,
      ...partial,
    };
  }
}
