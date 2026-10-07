/**
 * Real-time password validation utility for NextSofthr authentication.
 * Checks for minimum length and complexity rules (numbers, uppercase, lowercase, special symbols).
 */

export interface PasswordRule {
  id: 'length' | 'uppercase' | 'lowercase' | 'number' | 'special';
  label: string;
  isValid: boolean;
}

export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0 to 4
  rules: PasswordRule[];
  feedbackMessage: string;
  hasStartedTyping: boolean;
  strengthLabel: 'Too Short' | 'Weak' | 'Fair' | 'Good' | 'Strong';
}

export function validatePasswordRealtime(password: string): PasswordValidationResult {
  const hasStartedTyping = password.length > 0;

  const rules: PasswordRule[] = [
    {
      id: 'length',
      label: 'Minimum 8 characters',
      isValid: password.length >= 8,
    },
    {
      id: 'lowercase',
      label: 'Lowercase letter (a-z)',
      isValid: /[a-z]/.test(password),
    },
    {
      id: 'uppercase',
      label: 'Uppercase letter (A-Z)',
      isValid: /[A-Z]/.test(password),
    },
    {
      id: 'number',
      label: 'At least 1 number (0-9)',
      isValid: /\d/.test(password),
    },
    {
      id: 'special',
      label: 'Special character (!@#$%^&*)',
      isValid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passedCount = rules.filter((r) => r.isValid).length;

  let score = 0;
  let strengthLabel: PasswordValidationResult['strengthLabel'] = 'Too Short';
  let feedbackMessage = 'Enter at least 8 characters to secure your workspace account.';

  if (!hasStartedTyping) {
    score = 0;
    strengthLabel = 'Too Short';
    feedbackMessage = 'Enter your workspace password.';
  } else if (password.length < 8) {
    score = 1;
    strengthLabel = 'Too Short';
    feedbackMessage = `Add ${8 - password.length} more character${8 - password.length === 1 ? '' : 's'}.`;
  } else if (passedCount <= 2) {
    score = 2;
    strengthLabel = 'Weak';
    feedbackMessage = 'Add numbers or uppercase letters for better security.';
  } else if (passedCount === 3 || passedCount === 4) {
    score = 3;
    strengthLabel = 'Good';
    feedbackMessage = 'Almost there! Add a symbol to reach enterprise grade.';
  } else {
    score = 4;
    strengthLabel = 'Strong';
    feedbackMessage = 'Strong enterprise-grade password ready.';
  }

  // Minimum required for valid submission: at least 6 characters (recommended 8+)
  const isValid = password.length >= 6;

  return {
    isValid,
    score,
    rules,
    feedbackMessage,
    hasStartedTyping,
    strengthLabel,
  };
}
