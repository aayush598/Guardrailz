import { BaseGuardrail } from '@/modules/guardrails/engine/base.guardrails';

export type GuardrailFactory<TConfig> = (config: TConfig) => BaseGuardrail;

export class GuardrailRegistry {
  private readonly registry = new Map<string, GuardrailFactory<any>>();

  register<TConfig>(name: string, factory: GuardrailFactory<TConfig>): void {
    if (this.registry.has(name)) {
      throw new Error(`Guardrail "${name}" already registered`);
    }
    this.registry.set(name, factory);
  }

  has(name: string): boolean {
    return this.registry.has(name);
  }

  create<TConfig>(name: string, config: TConfig): BaseGuardrail {
    const factory = this.registry.get(name) as GuardrailFactory<TConfig> | undefined;

    if (!factory) {
      throw new Error(`Guardrail "${name}" not registered`);
    }

    return factory(config);
  }

  list(): string[] {
    return Array.from(this.registry.keys());
  }
}

export const guardrailRegistry = new GuardrailRegistry();
