import { guardrailRegistry } from '@/modules/guardrails/engine/registry';

/* -------------------------------------------------------------------------- */
/* Input Guardrails                                                            */
/* -------------------------------------------------------------------------- */

import { InputSizeGuardrail } from '@/modules/guardrails/guards/input/input-size.guardrail';
import { SecretsInInputGuardrail } from '@/modules/guardrails/guards/input/secrets.guardrail';
import { NSFWAdvancedGuardrail } from '@/modules/guardrails/guards/input/nsfw.guardrail';
import { PHIAwarenessGuardrail } from '@/modules/guardrails/guards/input/phi-awareness.guardrail';
import { UrlFileBlockerGuardrail } from '@/modules/guardrails/guards/input/url-file-blocker.guardrail';
import { BinaryAttachmentGuardrail } from '@/modules/guardrails/guards/input/binary-attachment.guardrail';
import { EncodingObfuscationGuardrail } from '@/modules/guardrails/guards/input/encoding-obfuscation.guardrail';
import { DangerousPatternsGuardrail } from '@/modules/guardrails/guards/input/dangerous-patterns.guardrail';
import { LanguageRestrictionGuardrail } from '@/modules/guardrails/guards/input/language-restriction.guardrail';
import { PromptInjectionSignatureGuardrail } from '@/modules/guardrails/guards/input/prompt-injection.guardrail';
import { SystemPromptLeakGuardrail } from '@/modules/guardrails/guards/input/system-prompt-leak.guardrail';
import { CrossContextManipulationGuardrail } from '@/modules/guardrails/guards/input/cross-context-manipulation.guardrail';
import { JailbreakPatternGuardrail } from '@/modules/guardrails/guards/input/jailbreak-pattern.guardrail';
import { RoleplayInjectionGuardrail } from '@/modules/guardrails/guards/input/roleplay-injection.guardrail';
import { OverrideInstructionGuardrail } from '@/modules/guardrails/guards/input/override-instruction.guardrail';
import { RightToErasureGuardrail } from '@/modules/guardrails/guards/input/right-to-erasure.guardrail';
import { UserConsentValidationGuardrail } from '@/modules/guardrails/guards/input/user-consent.guardrail';
import { GDPRDataMinimizationGuardrail } from '@/modules/guardrails/guards/input/gdpr-data-minimization.guardrail';
import { PoliticalPersuasionGuardrail } from '@/modules/guardrails/guards/input/political-persuasion.guardrail';
import { SelfHarmGuardrail } from '@/modules/guardrails/guards/input/self-harm.guardrail';
import { HateSpeechGuardrail } from '@/modules/guardrails/guards/input/hate-speech.guardrail';
import { LLMClassifierInjectionGuardrail } from '@/modules/guardrails/guards/input/llm-classifier-injection.guardrail';
import { RegexFilterGuardrail } from '@/modules/guardrails/guards/input/regex-filter.guardrail';

/* -------------------------------------------------------------------------- */
/* Registration                                                               */
/* -------------------------------------------------------------------------- */

guardrailRegistry.register('InputSize', (c) => new InputSizeGuardrail(c));
guardrailRegistry.register('SecretsInInput', (c) => new SecretsInInputGuardrail(c));
guardrailRegistry.register('NSFWAdvanced', (c) => new NSFWAdvancedGuardrail(c));
guardrailRegistry.register('PHIAwareness', (c) => new PHIAwarenessGuardrail(c));
guardrailRegistry.register('UrlFileBlocker', (c) => new UrlFileBlockerGuardrail(c));
guardrailRegistry.register('BinaryAttachment', (c) => new BinaryAttachmentGuardrail(c));
guardrailRegistry.register('EncodingObfuscation', (c) => new EncodingObfuscationGuardrail(c));
guardrailRegistry.register('DangerousPatterns', (c) => new DangerousPatternsGuardrail(c));
guardrailRegistry.register('LanguageRestriction', (c) => new LanguageRestrictionGuardrail(c));
guardrailRegistry.register(
  'PromptInjectionSignature',
  (c) => new PromptInjectionSignatureGuardrail(c),
);
guardrailRegistry.register('SystemPromptLeak', (c) => new SystemPromptLeakGuardrail(c));
guardrailRegistry.register(
  'CrossContextManipulation',
  (c) => new CrossContextManipulationGuardrail(c),
);
guardrailRegistry.register('JailbreakPattern', (c) => new JailbreakPatternGuardrail(c));
guardrailRegistry.register('RoleplayInjection', (c) => new RoleplayInjectionGuardrail(c));
guardrailRegistry.register('OverrideInstruction', (c) => new OverrideInstructionGuardrail(c));
guardrailRegistry.register('RightToErasure', (c) => new RightToErasureGuardrail(c));
guardrailRegistry.register('UserConsentValidation', (c) => new UserConsentValidationGuardrail(c));
guardrailRegistry.register('GDPRDataMinimization', (c) => new GDPRDataMinimizationGuardrail(c));
guardrailRegistry.register('PoliticalPersuasion', (c) => new PoliticalPersuasionGuardrail(c));
guardrailRegistry.register('SelfHarm', (c) => new SelfHarmGuardrail(c));
guardrailRegistry.register('HateSpeech', (c) => new HateSpeechGuardrail(c));
guardrailRegistry.register('LLMClassifierInjection', (c) => new LLMClassifierInjectionGuardrail(c));
guardrailRegistry.register('RegexFilter', (c) => new RegexFilterGuardrail(c));
