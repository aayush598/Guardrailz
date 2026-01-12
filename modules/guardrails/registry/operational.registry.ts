import { guardrailRegistry } from '@/modules/guardrails/engine/registry';

import { RateLimitGuardrail } from '@/modules/guardrails/guards/operational/rate-limit.guardrail';
import { TelemetryEnforcementGuardrail } from '@/modules/guardrails/guards/operational/telemetry-enforcement.guardrail';
import { ModelVersionPinGuardrail } from '@/modules/guardrails/guards/operational/model-version-pin.guardrail';
import { CostThresholdGuardrail } from '@/modules/guardrails/guards/operational/cost-threshold.guardrail';

guardrailRegistry.register('RateLimit', (c) => new RateLimitGuardrail(c));
guardrailRegistry.register('TelemetryEnforcement', (c) => new TelemetryEnforcementGuardrail(c));
guardrailRegistry.register('ModelVersionPin', (c) => new ModelVersionPinGuardrail(c));
guardrailRegistry.register('CostThreshold', (c) => new CostThresholdGuardrail(c));
