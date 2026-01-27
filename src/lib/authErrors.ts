/**
 * Maps Firebase authentication error codes to user-friendly messages.
 * Prevents user enumeration attacks by using generic messages.
 */
export const getAuthErrorMessage = (error: any): string => {
  const code = error?.code;

  // Don't reveal if user exists or not - prevents user enumeration
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    return 'Invalid email or password. Please try again.';
  }

  if (code === 'auth/email-already-in-use') {
    return 'Unable to create account. Please try logging in instead.';
  }

  if (code === 'auth/weak-password') {
    return 'Password must be at least 6 characters.';
  }

  if (code === 'auth/invalid-email') {
    return 'Please enter a valid email address.';
  }

  if (code === 'auth/too-many-requests') {
    return 'Too many attempts. Please wait before trying again.';
  }

  if (code === 'auth/network-request-failed') {
    return 'Network error. Please check your connection.';
  }

  if (code === 'auth/popup-closed-by-user') {
    return 'Sign in was cancelled. Please try again.';
  }

  if (code === 'auth/account-exists-with-different-credential') {
    return 'An account already exists with this email using a different sign-in method.';
  }

  // Generic fallback - never expose internal error details
  return 'Authentication failed. Please try again.';
};
