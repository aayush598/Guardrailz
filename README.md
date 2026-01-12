# LLM Guardrails SaaS Platform

## Overview

A comprehensive SaaS platform for securing LLM applications with intelligent guardrails. Protect your AI applications from PII leaks, secrets exposure, and malicious inputs.

## Features

### ✨ Core Capabilities

- **Input Validation**: Detect secrets, PII, and size limits before LLM processing
- **Output Sanitization**: Automatically redact sensitive information from responses
- **Parallel Processing**: Execute multiple guardrails simultaneously for speed
- **Built-in Profiles**: Pre-configured security profiles for different industries
- **Custom Profiles**: Create your own guardrail combinations
- **Rate Limiting**: Per API key and per user account limits
- **Real-time Dashboard**: Monitor usage, view analytics, test guardrails
- **REST API**: Easy integration with any application
- **JavaScript SDK**: Simple wrapper for common use cases

### 🛡️ Available Guardrails

1. **InputSizeGuardrail**: Enforce maximum input length (default 50,000 chars)
2. **SecretsInInputGuardrail**: Detect API keys, tokens, and credentials
3. **OutputPIIRedactionGuardrail**: Redact emails, phones, SSNs, credit cards, IPs

### 📦 Built-in Profiles

- **default**: Basic security for general use
- **enterprise_security**: Strict controls for businesses (25K char limit)
- **child_safety**: Maximum protection for educational contexts
- **healthcare**: HIPAA-compliant guardrails
- **financial**: Compliance for fintech applications
- **minimal**: Lightweight for development/testing

## Tech Stack

- **Framework**: Next.js 14 + TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **UI**: Tailwind CSS + shadcn/ui
- **Rate Limiting**: Custom implementation with PostgreSQL

## Getting Started

### Installation

```bash
yarn install
```

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
DATABASE_URL=your_postgres_url
```

### Database Setup

```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:migrate
```

### Run Development Server

```bash
yarn dev
```

Visit `http://localhost:3000`

## API Usage

### REST API Endpoint

**POST** `/api/validate`

```bash
curl -X POST https://your-app-url.com/api/validate \
  -H "Content-Type: application/json" \
  -H "x-api-key: grd_live_xxxxx" \
  -d '{
    "text": "My email is john@example.com",
    "validationType": "output",
    "profileId": "optional-profile-id"
  }'
```

**Response:**

```json
{
  "success": true,
  "passed": true,
  "validationType": "output",
  "profile": {
    "id": "profile-id",
    "name": "default"
  },
  "results": [
    {
      "passed": true,
      "guardrailName": "OutputPIIRedactionGuardrail",
      "severity": "warning",
      "message": "Redacted 1 PII instance(s) from output",
      "details": {
        "redactions": [{ "type": "Email", "count": 1 }],
        "totalRedactions": 1
      },
      "redactedText": "My email is [EMAIL_REDACTED]"
    }
  ],
  "summary": {
    "total": 1,
    "passed": 1,
    "failed": 0
  },
  "executionTimeMs": 5,
  "redactedText": "My email is [EMAIL_REDACTED]",
  "rateLimits": {
    "perMinute": { "current": 1, "max": 100 },
    "perDay": { "current": 1, "max": 10000 }
  }
}
```

## JavaScript SDK Usage

### Installation

```html
<!-- Browser -->
<script src="https://your-app-url.com/sdk/guardrails-sdk.js"></script>

<!-- Node.js -->
// const GuardrailsClient = require('./guardrails-sdk');
```

### Basic Usage

```javascript
const client = new GuardrailsClient('grd_live_xxxxx');

// Validate input before sending to LLM
const inputResult = await client.validateInput('User prompt here');
if (!inputResult.passed) {
  console.error('Input validation failed:', inputResult.results);
}

// Validate and sanitize LLM output
const outputResult = await client.validateOutput('LLM response here');
const safeOutput = outputResult.redactedText || outputResult.text;
```

### Wrapper Pattern (Recommended)

```javascript
const client = new GuardrailsClient('grd_live_xxxxx');

// Wrap your LLM call
const result = await client.wrapLLMCall(
  async (input) => {
    // Your LLM API call
    const response = await callOpenAI(input);
    return response.text;
  },
  'User prompt',
  'profile-id-for-input', // optional
  'profile-id-for-output', // optional
);

if (result.error) {
  console.error('Validation failed:', result.inputValidation);
} else {
  console.log('Safe output:', result.output);
}
```

## Dashboard Features

### API Key Management

- Create unlimited API keys with custom rate limits
- View usage statistics per key
- Deactivate keys instantly
- Copy keys to clipboard

### Profile Management

- View all built-in profiles
- Create custom profiles with specific guardrail combinations
- See guardrail counts per profile

### Usage Analytics

- Total executions (all time)
- Last 24 hours activity
- Success rate percentage
- Current rate limit usage
- Recent execution logs

### Test Playground

- Test guardrails in real-time
- Select any profile
- Choose input or output validation
- See detailed results and redacted text
- View execution time

## Rate Limiting

### Default Limits (Free Tier)

**Per API Key:**

- 100 requests per minute
- 10,000 requests per day

**Per User Account (all keys combined):**

- 500 requests per minute
- 50,000 requests per day

### Rate Limit Response

When exceeded (HTTP 429):

```json
{
  "error": "API key per-minute rate limit exceeded",
  "limits": {
    "perMinute": { "current": 101, "max": 100 },
    "perDay": { "current": 5000, "max": 10000 }
  }
}
```

## Architecture

### Database Schema

- **users**: Clerk user sync
- **profiles**: Built-in and custom guardrail profiles
- **api_keys**: User API keys with rate limits
- **guardrail_executions**: Execution logs for analytics
- **rate_limit_tracking**: Request counting (minute/day windows)
- **user_rate_limits**: Account-level limits

### Guardrail System

**Base Class Pattern:**

```typescript
abstract class BaseGuardrail {
  abstract execute(text: string, context?: any): GuardrailResult;
  protected createResult(
    passed,
    message,
    details?,
    redactedText?,
  ): GuardrailResult;
}
```

**Parallel Execution:**
All guardrails in a profile run simultaneously using `Promise.all()` for maximum performance.

## Extending the Platform

### Adding New Guardrails

1. Create new guardrail class in `/lib/guardrails/`
2. Extend `BaseGuardrail`
3. Implement `execute()` method
4. Register in `/lib/guardrails/index.ts`
5. Add to desired profiles

Example:

```typescript
import { BaseGuardrail, GuardrailResult } from './base';

export class CustomGuardrail extends BaseGuardrail {
  execute(text: string): GuardrailResult {
    // Your validation logic
    const passed = yourValidationLogic(text);

    return this.createResult(passed, 'Your message', { details: 'here' });
  }
}

export const tags = ['input', 'custom'];
```

## Security Considerations

- API keys use secure random generation (`nanoid`)
- All database queries use parameterized statements (Drizzle ORM)
- Rate limiting prevents abuse
- Clerk handles authentication securely
- Environment variables for sensitive data
- HTTPS required in production

## Deployment

1. Set environment variables
2. Run database migrations
3. Deploy to Vercel, Railway, or any Node.js host
4. Update SDK base URL
5. Configure Clerk production URLs

## License

MIT

## Support

For issues and questions, please open a GitHub issue or contact support.
