import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC44TyS-pE1rx7C2pB7xe9u3eBbul69JWU",
  authDomain: "inkmatrix-78001.firebaseapp.com",
  projectId: "inkmatrix-78001",
  storageBucket: "inkmatrix-78001.firebasestorage.app",
  messagingSenderId: "54713350190",
  appId: "1:54713350190:web:b128bd5b5be335852707bf",
  measurementId: "G-ZCH8VK9E70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error: any) {
    let errorMessage = 'An error occurred during sign in.';
    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid email or password. Please try again.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later.';
    }
    return { user: null, error: errorMessage };
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error: any) {
    let errorMessage = 'An error occurred during sign up.';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'An account with this email already exists.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Please enter a valid email address.';
    }
    return { user: null, error: errorMessage };
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error: any) {
    let errorMessage = 'An error occurred while sending reset email.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Please enter a valid email address.';
    }
    return { success: false, error: errorMessage };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Phone authentication
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
    confirmationResult: ConfirmationResult | undefined;
  }
}

export const setupRecaptcha = (containerId: string) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
    });
  }
  return window.recaptchaVerifier;
};

export const sendOTP = async (phoneNumber: string, containerId: string) => {
  try {
    const recaptchaVerifier = setupRecaptcha(containerId);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    return { success: true, error: null };
  } catch (error: any) {
    // Reset recaptcha on error
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
    }
    let errorMessage = 'Failed to send OTP. Please try again.';
    if (error.code === 'auth/invalid-phone-number') {
      errorMessage = 'Invalid phone number. Please check and try again.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many attempts. Please try again later.';
    }
    return { success: false, error: errorMessage };
  }
};

export const verifyOTP = async (otp: string) => {
  try {
    if (!window.confirmationResult) {
      return { user: null, error: 'Please request OTP first.' };
    }
    const result = await window.confirmationResult.confirm(otp);
    return { user: result.user, error: null };
  } catch (error: any) {
    let errorMessage = 'Invalid OTP. Please try again.';
    if (error.code === 'auth/invalid-verification-code') {
      errorMessage = 'Invalid verification code. Please check and try again.';
    } else if (error.code === 'auth/code-expired') {
      errorMessage = 'OTP expired. Please request a new one.';
    }
    return { user: null, error: errorMessage };
  }
};

export type { User };
