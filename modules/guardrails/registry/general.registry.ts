/**
 * General Guardrails Registry
 *
 * General guardrails are:
 * - Not tied to input/output/tool stages
 * - Cross-cutting policies
 * - Executable in any validation context
 */

import { guardrailRegistry } from '../engine/registry';

// General guardrails
import { RetentionCheckGuardrail } from '../guards/general/retention-check.guardrail';

guardrailRegistry.register('RetentionCheck', (c) => new RetentionCheckGuardrail(c));
