/**
 * Gemini API Integration for MindForge AI
 * Handles connection, live streaming/inference, model selection, and error fallbacks.
 */

const GeminiClient = {
  STORAGE_KEY_API: 'mindforge_gemini_key',
  STORAGE_KEY_MODE: 'mindforge_engine_mode',

  getApiKey() {
    return localStorage.getItem(this.STORAGE_KEY_API) || '';
  },

  setApiKey(key) {
    localStorage.setItem(this.STORAGE_KEY_API, key.trim());
  },

  getEngineMode() {
    return localStorage.getItem(this.STORAGE_KEY_MODE) || 'local';
  },

  setEngineMode(mode) {
    localStorage.setItem(this.STORAGE_KEY_MODE, mode);
  },

  isLiveGeminiEnabled() {
    return this.getEngineMode() === 'gemini' && !!this.getApiKey();
  },

  /**
   * Tests the connection with a lightweight prompt
   */
  async testConnection(apiKey) {
    const keyToTest = apiKey || this.getApiKey();
    if (!keyToTest) {
      return { success: false, message: 'Please enter a valid Gemini API key.' };
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToTest}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Respond with only the word "ONLINE" to confirm API readiness.' }] }],
            generationConfig: { maxOutputTokens: 10, temperature: 0.1 }
          })
        }
      );

      if (!response.ok) {
        // Fallback check on gemini-1.5-flash
        const fallbackRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToTest}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Respond with only the word "ONLINE" to confirm API readiness.' }] }],
              generationConfig: { maxOutputTokens: 10, temperature: 0.1 }
            })
          }
        );

        if (!fallbackRes.ok) {
          const errData = await fallbackRes.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${response.status}: Failed to authorize API key`);
        }
        return { success: true, message: 'Connected successfully to Gemini 1.5 Flash!' };
      }

      return { success: true, message: 'Connected successfully to Gemini 2.5 Flash!' };
    } catch (err) {
      return { success: false, message: err.message || 'Connection test failed.' };
    }
  },

  /**
   * Generates response using Gemini API with specific system instruction
   */
  async generateContent(prompt, systemInstruction = '') {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('No Gemini API key configured. Switch to Local Engine or enter key.');
    }

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    // Try Gemini 2.5 Flash first, then fallback to Gemini 1.5 Flash
    const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
    let lastError = null;

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }
        );

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          lastError = new Error(err.error?.message || `HTTP ${response.status}`);
          continue; // try next model
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text;
        if (text) {
          return text;
        }
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('Failed to generate response from Gemini API.');
  }
};
