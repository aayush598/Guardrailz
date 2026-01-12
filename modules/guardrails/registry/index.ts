/**
 * Guardrail Registry Bootstrap
 *
 * This file replaces the old monolithic `lib/guardrails/index.ts`.
 *
 * Responsibilities:
 * - Ensure ALL guardrails are registered exactly once
 * - Keep registration order deterministic
 * - Avoid a single mega-file with hundreds of imports
 *
 * ❗ This file MUST be imported once at process startup
 *    (service layer already does this).
 */

// Input guardrails
import './input.registry';

// Output guardrails
import './output.registry';

// Tool guardrails
import './tool.registry';

// Content / policy guardrails
import './content.registry';

// Operational / platform guardrails
import './operational.registry';

// General / cross-cutting guardrails
import './general.registry';

// Security-specific guardrails
import './security.registry';
