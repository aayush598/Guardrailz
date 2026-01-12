/**
 * Security Guardrails Registry
 *
 * Registers all guardrails related to:
 * - API key security
 * - Credential hygiene
 * - Abuse / compromise detection
 *
 * This file is intentionally isolated to keep
 * security-sensitive logic auditable and contained.
 */

import { guardrailRegistry } from '../engine/registry';

// Security guardrails
import { ApiKeyRotationTriggerGuardrail } from '../guards/security/api-key-rotation.guardrail';

/**
 * API Key Rotation Trigger
 *
 * Detects signals indicating API key compromise or misuse
 * and triggers rotation workflows.
 */
guardrailRegistry.register('ApiKeyRotationTrigger', (c) => new ApiKeyRotationTriggerGuardrail(c));
