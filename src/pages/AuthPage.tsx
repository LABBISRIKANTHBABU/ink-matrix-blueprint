
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
    GraduationCap,
    Briefcase,
    Building2,
    ArrowRight,
    Mail,
    Lock,
    Loader2,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logoImg from "@/Gemini_Generated_Image_86xpwe86xpwe86xp.png";

const AuthPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"student" | "professional" | "client" | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Clear error when switching modes
    useEffect(() => {
        setError(null);
    }, [isLogin]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user document exists
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // If new Google user, we might need to ask for role.
                // For simplicity in this flow, if they use Google and it's their first time,
                // we might default them or show a "Finish Profile" modal.
                // Per requirements "Role selection (Student/Professional/Client)" is needed.
                // If we are strictly following the single page flow, we can ask for role even with Google if we want.
                // But typically Google Sign In is "one click". 
                // Let's assume for now we default or check if role is selected in state (unlikely if they just clicked G-button).
                // A better UX: If new user via Google, redirect to an onboarding page. 
                // OR: Force them to select role BEFORE clicking Google (if registering).
                // Let's create the doc with a "pending" role or prompt after.
                // For this implementation, let's create it as "student" default or specific if they selected a radio before clicking (if we enable that).

                // Let's assume we force role selection for Google Sign Up if possible, or default. 
                // Implementing simple default for now to keep flow unblocked:
                await setDoc(userDocRef, {
                    email: user.email,
                    role: role || "student", // Fallback to student if not selected
                    provider: "google",
                    createdAt: new Date(),
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            }

            // Fetch role for redirect
            const finalDoc = await getDoc(userDocRef);
            const userData = finalDoc.data();
            redirectUser(userData?.role);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to sign in with Google.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isLogin) {
                // Login
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const userDoc = await getDoc(doc(db, "users", user.uid));

                if (userDoc.exists()) {
                    redirectUser(userDoc.data().role);
                } else {
                    // Fallback if doc missing
                    redirectUser("student");
                }
            } else {
                // Register
                if (!role) {
                    setError("Please select a role to create your account.");
                    setIsLoading(false);
                    return;
                }

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    role: role,
                    provider: "email",
                    createdAt: new Date(),
                });

                toast.success("Account created successfully!");
                redirectUser(role);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Authentication failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const redirectUser = (userRole: string) => {
        switch (userRole) {
            case "student":
                navigate("/education"); // Placeholder route
                break;
            case "professional":
                navigate("/dashboard"); // Placeholder
                break;
            case "client":
                navigate("/book-session"); // Placeholder
                break;
            default:
                navigate("/");
        }
    };

    const rolesList = [
        { id: "student", label: "Student", icon: GraduationCap, color: "text-blue-400" },
        { id: "professional", label: "Professional", icon: Briefcase, color: "text-emerald-400" },
        { id: "client", label: "Client", icon: Building2, color: "text-purple-400" },
    ];

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] translate-y-1/2" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Header */}
                <div className="text-center mb-8">
                    <Link to="/">
                        <div className="w-20 h-20 mx-auto rounded-full bg-card border border-primary/20 flex items-center justify-center shadow-lg mb-4 relative group">
                            <div className="absolute inset-0 rounded-full border border-primary/10 group-hover:animate-pulse-glow transition-all" />
                            <img src={logoImg} alt="Logo" className="w-full h-full object-cover rounded-full p-2" />
                        </div>
                    </Link>
                    <h2 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {isLogin ? "Welcome Back" : "Join Theion"}
                    </h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                        {isLogin ? "Sign in to continue to your dashboard" : "Select your role and start your journey"}
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                    {/* Top Highlight Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    {/* Google Button */}
                    <Button
                        variant="outline"
                        className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all text-muted-foreground font-medium mb-6"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>

                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative bg-card/40 px-3 text-xs uppercase text-muted-foreground backdrop-blur-xl">
                            Or continue with email
                        </div>
                    </div>

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg flex items-center animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-10 h-10 bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-10 bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Role Selection - Only for Register */}
                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-2 pb-1">
                                        <Label className="mb-3 block text-xs uppercase tracking-wider text-muted-foreground">Select Role</Label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {rolesList.map((r) => {
                                                const Icon = r.icon;
                                                const isSelected = role === r.id;
                                                return (
                                                    <div
                                                        key={r.id}
                                                        onClick={() => setRole(r.id as any)}
                                                        className={`
                                    cursor-pointer rounded-xl border p-3 flex flex-col items-center justify-center gap-2 transition-all duration-200
                                    ${isSelected ? "bg-primary/20 border-primary" : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"}
                                  `}
                                                    >
                                                        <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                                                        <span className={`text-[10px] uppercase font-semibold ${isSelected ? "text-primary" : "text-muted-foreground"}`}>{r.label}</span>
                                                        {isSelected && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            className="w-full h-11 btn-gold mt-4 font-semibold text-base relative overflow-hidden"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Get Started"}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Footer Links */}
                <div className="text-center mt-6 space-y-2">
                    <p className="text-sm text-muted-foreground">
                        {isLogin ? "New to Theion?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-all"
                        >
                            {isLogin ? "Create an account" : "Sign in"}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
