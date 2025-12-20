import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { signInWithGoogle, signUpWithEmail, saveUserProfile, getUserProfile } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.png';
import PhoneInput from '@/components/auth/PhoneInput';
import GoogleButton from '@/components/auth/GoogleButton';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Check if completing profile after Google sign-in
  const isCompletingProfile = searchParams.get('complete') === 'true';
  
  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Phone form state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  // Password validation
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  
  const isPasswordStrong = Object.values(passwordChecks).every(Boolean);
  
  // Phone validation
  const isPhoneValid = phoneNumber.length >= 10;

  // If completing profile and user exists, pre-fill email
  useEffect(() => {
    if (isCompletingProfile && user) {
      setEmail(user.email || '');
      setTermsAccepted(true);
    }
  }, [isCompletingProfile, user]);

  const handleGoogleSignUp = async () => {
    if (!termsAccepted) {
      toast.error('Please accept the Terms & Conditions');
      return;
    }
    
    setLoading(true);
    const { user, error } = await signInWithGoogle();
    setLoading(false);
    
    if (error) {
      toast.error(error);
    } else if (user) {
      // Check if user already has phone number
      const { profile } = await getUserProfile(user.uid);
      if (profile?.phone) {
        toast.success('Welcome!');
        sessionStorage.removeItem('welcomed');
        navigate('/?welcome=true');
      } else {
        // Redirect to complete profile
        toast.success('Please add your phone number to complete registration');
        navigate('/signup?complete=true');
      }
    }
  };
  
  // Handle completing profile (adding phone number after Google sign-in)
  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPhoneValid) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    if (!user) {
      toast.error('Please sign in first');
      navigate('/signin');
      return;
    }
    
    setLoading(true);
    const fullPhone = `${countryCode}${phoneNumber}`;
    
    const { success, error } = await saveUserProfile({
      uid: user.uid,
      name: user.displayName || '',
      email: user.email || '',
      phone: fullPhone,
      provider: 'google',
      role: 'customer',
    });
    
    setLoading(false);
    
    if (error) {
      toast.error(error);
    } else if (success) {
      toast.success('Profile completed successfully!');
      sessionStorage.removeItem('welcomed');
      navigate('/?welcome=true');
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error('Please accept the Terms & Conditions');
      return;
    }
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!isPhoneValid) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!isPasswordStrong) {
      toast.error('Please choose a stronger password');
      return;
    }
    
    setLoading(true);
    const { user, error } = await signUpWithEmail(email, password);
    
    if (error) {
      setLoading(false);
      toast.error(error);
      return;
    }
    
    if (user) {
      // Save user profile with phone number
      const fullPhone = `${countryCode}${phoneNumber}`;
      const { success, error: profileError } = await saveUserProfile({
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || email,
        phone: fullPhone,
        provider: 'email',
        role: 'customer',
      });
      
      setLoading(false);
      
      if (profileError) {
        toast.error('Account created but failed to save profile. Please update your profile later.');
      } else {
        toast.success('Account created successfully!');
      }
      sessionStorage.removeItem('welcomed');
      navigate('/?welcome=true');
    }
  };

  // Render complete profile form (for Google sign-in users)
  if (isCompletingProfile && user) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            {/* Logo */}
            <Link to="/" className="flex justify-center mb-8">
              <img src={logo} alt="Ink Matrix" className="h-12" />
            </Link>
            
            <h1 className="text-2xl font-bold text-center mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground text-center mb-8">
              Add your phone number to complete registration
            </p>
            
            <form onSubmit={handleCompleteProfile} className="space-y-4">
              {/* Email (read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="pl-10 bg-muted"
                  />
                </div>
              </div>
              
              {/* Phone Number */}
              <PhoneInput
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
              />
              <p className="text-xs text-muted-foreground">
                We'll use this for order updates and support
              </p>
              
              <Button type="submit" className="w-full" disabled={loading || !isPhoneValid}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* Logo */}
          <Link to="/" className="flex justify-center mb-8">
            <img src={logo} alt="Ink Matrix" className="h-12" />
          </Link>
          
          <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-muted-foreground text-center mb-8">
            Join Ink Matrix for premium corporate gifts
          </p>
          
          {/* Google Sign Up */}
          <GoogleButton onClick={handleGoogleSignUp} loading={loading} text="Sign up with Google" />
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">or continue with email</span>
            </div>
          </div>
          
          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Phone Number */}
            <PhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />
            <p className="text-xs text-muted-foreground -mt-2">
              Required for order updates and support
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {/* Password strength indicators */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center gap-1 ${passwordChecks.length ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <Check className={`h-3 w-3 ${passwordChecks.length ? 'opacity-100' : 'opacity-30'}`} />
                      8+ characters
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <Check className={`h-3 w-3 ${passwordChecks.uppercase ? 'opacity-100' : 'opacity-30'}`} />
                      Uppercase
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <Check className={`h-3 w-3 ${passwordChecks.lowercase ? 'opacity-100' : 'opacity-30'}`} />
                      Lowercase
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.number ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <Check className={`h-3 w-3 ${passwordChecks.number ? 'opacity-100' : 'opacity-30'}`} />
                      Number
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{' '}
                <Link to="/terms" className="text-accent hover:underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/signin" className="text-accent font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
