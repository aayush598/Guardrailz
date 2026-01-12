/**
 * Tool Guardrails Registry
 *
 * Registers all guardrails that operate on tool invocation,
 * permissions, execution safety, and side effects.
 */

import { guardrailRegistry } from '../engine/registry';

// Tool guardrails
import { ToolAccessControlGuardrail } from '../guards/tool/tool-access.guardrail';
import { IAMPermissionGuardrail } from '../guards/tool/iam-permission.guardrail';
import { FileWriteRestrictionGuardrail } from '../guards/tool/file-write-restriction.guardrail';
import { ApiRateLimitGuardrail } from '../guards/tool/api-rate-limit.guardrail';
import { DestructiveToolCallGuardrail } from '../guards/tool/destructive-tool-call.guardrail';

// -----------------------------------------------------------------------------
// Registration
// -----------------------------------------------------------------------------

guardrailRegistry.register('ToolAccess', (c) => new ToolAccessControlGuardrail(c));
guardrailRegistry.register('IAMPermission', (c) => new IAMPermissionGuardrail(c));
guardrailRegistry.register('FileWriteRestriction', (c) => new FileWriteRestrictionGuardrail(c));
guardrailRegistry.register('ApiRateLimit', (c) => new ApiRateLimitGuardrail(c));
guardrailRegistry.register('DestructiveToolCall', (c) => new DestructiveToolCallGuardrail(c));
