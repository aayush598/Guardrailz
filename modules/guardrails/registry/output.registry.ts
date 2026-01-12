// modules/guardrails/registry/output.registry.ts
//
// Output-stage guardrail registrations.
// This file fully replaces the old monolithic registration logic
// for ALL output-related guardrails.
//

import { guardrailRegistry } from '@/modules/guardrails/engine/registry';

// Output guardrails
import { OutputPIIRedactionGuardrail } from '@/modules/guardrails/guards/output/pii-redaction.guardrail';
import { SecretLeakOutputGuardrail } from '@/modules/guardrails/guards/output/secret-leak-output.guardrail';
import { InternalDataLeakGuardrail } from '@/modules/guardrails/guards/output/internal-data-leak.guardrail';
import { HallucinationRiskGuardrail } from '@/modules/guardrails/guards/output/hallucination-risk.guardrail';
import { ConfidentialityGuardrail } from '@/modules/guardrails/guards/output/confidentiality.guardrail';
import { OutputSchemaValidationGuardrail } from '@/modules/guardrails/guards/output/output-schema-validation.guardrail';
import { CitationRequiredGuardrail } from '@/modules/guardrails/guards/output/citation-required.guardrail';
import { SandboxedOutputGuardrail } from '@/modules/guardrails/guards/output/sandboxed-output.guardrail';
import { QualityThresholdGuardrail } from '@/modules/guardrails/guards/output/quality-threshold.guardrail';
import { EnvVarLeakGuardrail } from '@/modules/guardrails/guards/output/env-var-leak.guardrail';
import { InternalEndpointLeakGuardrail } from '@/modules/guardrails/guards/output/internal-endpoint.guardrail';
import { SecretsInLogsGuardrail } from '@/modules/guardrails/guards/output/secrets-in-logs.guardrail';
import { CommandInjectionOutputGuardrail } from '@/modules/guardrails/guards/output/command-injection.guardrail';

// ─────────────────────────────────────────────────────────────
// Output guardrail registrations
// ─────────────────────────────────────────────────────────────

guardrailRegistry.register('OutputPIIRedaction', (c) => new OutputPIIRedactionGuardrail(c));

guardrailRegistry.register('SecretLeakOutput', (c) => new SecretLeakOutputGuardrail(c));

guardrailRegistry.register('InternalDataLeak', (c) => new InternalDataLeakGuardrail(c));

guardrailRegistry.register('HallucinationRisk', (c) => new HallucinationRiskGuardrail(c));

guardrailRegistry.register('Confidentiality', (c) => new ConfidentialityGuardrail(c));

guardrailRegistry.register('OutputSchemaValidation', (c) => new OutputSchemaValidationGuardrail(c));

guardrailRegistry.register('CitationRequired', (c) => new CitationRequiredGuardrail(c));

guardrailRegistry.register('SandboxedOutput', (c) => new SandboxedOutputGuardrail(c));

guardrailRegistry.register('QualityThreshold', (c) => new QualityThresholdGuardrail(c));

guardrailRegistry.register('EnvVarLeak', (c) => new EnvVarLeakGuardrail(c));

guardrailRegistry.register('InternalEndpointLeak', (c) => new InternalEndpointLeakGuardrail(c));

guardrailRegistry.register('SecretsInLogs', (c) => new SecretsInLogsGuardrail(c));

guardrailRegistry.register('CommandInjectionOutput', (c) => new CommandInjectionOutputGuardrail(c));
