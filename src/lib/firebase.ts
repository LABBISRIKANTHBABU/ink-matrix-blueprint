import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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
export const db = getFirestore(app);

// User profile interface
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  provider: 'google' | 'email';
  role: 'customer' | 'admin';
  createdAt: string;
}

// Save user profile to Firestore
export const saveUserProfile = async (profile: Omit<UserProfile, 'createdAt'>) => {
  try {
    const userRef = doc(db, 'users', profile.uid);
    await setDoc(userRef, {
      ...profile,
      createdAt: new Date().toISOString(),
    }, { merge: true });
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<{ profile: UserProfile | null; error: string | null }> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { profile: userSnap.data() as UserProfile, error: null };
    }
    return { profile: null, error: null };
  } catch (error: any) {
    return { profile: null, error: error.message };
  }
};

// Check if user needs phone number
export const userNeedsPhone = async (uid: string): Promise<boolean> => {
  const { profile } = await getUserProfile(uid);
  return !profile || !profile.phone;
};

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

export type { User };
