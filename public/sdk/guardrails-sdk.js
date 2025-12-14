/**
 * LLM Guardrails SDK
 * Easy-to-use wrapper for the Guardrails API
 */

class GuardrailsClient {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || 'https://your-app-url.com/api';
  }

  /**
   * Validate input text before sending to LLM
   * @param {string} text - The input text to validate
   * @param {string} profileId - Optional profile ID (uses 'default' if not provided)
   * @returns {Promise<Object>} Validation result
   */
  async validateInput(text, profileId = null) {
    return this._validate(text, 'input', profileId);
  }

  /**
   * Validate and sanitize LLM output
   * @param {string} text - The output text to validate
   * @param {string} profileId - Optional profile ID (uses 'default' if not provided)
   * @returns {Promise<Object>} Validation result with redacted text
   */
  async validateOutput(text, profileId = null) {
    return this._validate(text, 'output', profileId);
  }

  /**
   * Wrap your LLM call with guardrails
   * @param {Function} llmFunction - Async function that calls your LLM
   * @param {string} inputText - The user input
   * @param {string} inputProfileId - Profile for input validation
   * @param {string} outputProfileId - Profile for output validation
   * @returns {Promise<Object>} Object with { output, inputValidation, outputValidation }
   */
  async wrapLLMCall(llmFunction, inputText, inputProfileId = null, outputProfileId = null) {
    // Validate input first
    const inputValidation = await this.validateInput(inputText, inputProfileId);
    
    if (!inputValidation.passed) {
      return {
        error: 'Input validation failed',
        inputValidation,
        output: null,
        outputValidation: null,
      };
    }

    // Call LLM
    const llmOutput = await llmFunction(inputText);

    // Validate output
    const outputValidation = await this.validateOutput(llmOutput, outputProfileId);

    return {
      output: outputValidation.redactedText || llmOutput,
      inputValidation,
      outputValidation,
      error: null,
    };
  }

  async _validate(text, validationType, profileId) {
    const response = await fetch(`${this.baseUrl}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
      body: JSON.stringify({
        text,
        validationType,
        profileId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Validation failed');
    }

    return response.json();
  }
}

// Export for Node.js and browsers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GuardrailsClient;
} else {
  window.GuardrailsClient = GuardrailsClient;
}
