
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    User, Mail, Phone, Shield, LogOut, Send,
    Loader2, Edit2, Save, X, AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { profileMessageSchema, profileUpdateSchema, validateData } from "@/lib/validation";
import { checkRateLimit, formatRemainingTime, MESSAGE_RATE_LIMIT } from "@/lib/rateLimit";

interface UserProfile {
    role: string;
    email: string;
    mobile?: string;
    altEmail?: string;
    displayName?: string;
}

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form States
    const [mobile, setMobile] = useState("");
    const [altEmail, setAltEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [messageError, setMessageError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data() as UserProfile;
                        setProfile(data);
                        setMobile(data.mobile || "");
                        setAltEmail(data.altEmail || "");
                    }
                } catch (error) {
                    toast.error("Failed to load profile data.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                navigate("/auth");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleSaveProfile = async () => {
        if (!user) return;
        setFormError(null);

        // Validate profile update data
        const validation = validateData(profileUpdateSchema, { mobile, altEmail });
        if (validation.success === false) {
            setFormError(validation.errors[0]);
            return;
        }
        const validatedData = validation.data;

        setIsSaving(true);
        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                mobile: validatedData.mobile || "",
                altEmail: validatedData.altEmail || ""
            });
            setProfile(prev => prev ? { ...prev, mobile: validatedData.mobile || "", altEmail: validatedData.altEmail || "" } : null);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setMessageError(null);

        // Rate limiting check
        const rateCheck = checkRateLimit('profile-message', MESSAGE_RATE_LIMIT);
        if (!rateCheck.allowed) {
            setMessageError(`Too many messages. Please wait ${formatRemainingTime(rateCheck.remainingMs || 300000)}.`);
            return;
        }

        // Validate message
        const validation = validateData(profileMessageSchema, { message });
        if (validation.success === false) {
            setMessageError(validation.errors[0]);
            return;
        }
        const validatedData = validation.data;

        setIsSending(true);
        try {
            await addDoc(collection(db, "messages"), {
                userId: user.uid,
                userEmail: user.email,
                content: validatedData.message,
                createdAt: serverTimestamp(),
                status: "new"
            });
            setMessage("");
            toast.success("Message sent successfully! We will contact you soon.");
        } catch (error) {
            toast.error("Failed to send message.");
        } finally {
            setIsSending(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-6xl">

                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                            My Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your profile and connect with Theion Consulting.
                        </p>
                    </div>

                    <Button variant="outline" onClick={handleLogout} className="border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary" />

                            <div className="flex flex-col items-center text-center mb-6 relative z-10">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-lg">
                                    <User className="w-10 h-10 text-primary" />
                                </div>
                                <h2 className="text-xl font-bold text-foreground">
                                    {user?.displayName || "Theion User"}
                                </h2>
                                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                                    <Shield className="w-3 h-3 mr-1" />
                                    {profile?.role || "Member"}
                                </div>
                            </div>

                            <div className="space-y-4 text-sm relative z-10">
                                <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/5">
                                    <Mail className="w-4 h-4 text-muted-foreground mr-3" />
                                    <span className="text-foreground truncate">{user?.email}</span>
                                </div>

                                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center text-muted-foreground">
                                            <Phone className="w-4 h-4 mr-3" />
                                            <span>Mobile</span>
                                        </div>
                                        {!isEditing && (
                                            <button onClick={() => setIsEditing(true)} className="text-primary hover:text-primary/80 transition-colors">
                                                <Edit2 className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>

                                    {isEditing ? (
                                        <div className="space-y-2 mt-2">
                                            {formError && (
                                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-2 rounded-lg flex items-center">
                                                    <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                                                    {formError}
                                                </div>
                                            )}
                                            <Input
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                placeholder="+1 (555) 000-0000"
                                                className="bg-black/20 border-white/10 h-8 text-sm"
                                                maxLength={20}
                                            />
                                            <Input
                                                value={altEmail}
                                                onChange={(e) => setAltEmail(e.target.value)}
                                                placeholder="alt@example.com"
                                                className="bg-black/20 border-white/10 h-8 text-sm"
                                                type="email"
                                                maxLength={255}
                                            />
                                            <div className="flex gap-2 justify-end pt-1">
                                                <Button size="sm" variant="ghost" onClick={() => { setIsEditing(false); setFormError(null); }} className="h-7 px-2">
                                                    <X className="w-3 h-3" />
                                                </Button>
                                                <Button size="sm" onClick={handleSaveProfile} disabled={isSaving} className="h-7 px-2 btn-gold">
                                                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-1 pl-7">
                                            <div className="text-foreground font-medium">{profile?.mobile || "Not set"}</div>
                                            {profile?.altEmail && <div className="text-xs text-muted-foreground">{profile.altEmail}</div>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Actions & Messages */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Quick Actions Grid (Placeholder for future features) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-card/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer group"
                            >
                                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Course Enrollment</h3>
                                <p className="text-sm text-muted-foreground">Browse and enroll in our comprehensive courses.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-card/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer group"
                            >
                                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Book a Session</h3>
                                <p className="text-sm text-muted-foreground">Schedule a 1-on-1 consultation with our experts.</p>
                            </motion.div>
                        </div>

                        {/* Message Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />

                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                                <Send className="w-5 h-5 mr-3 text-primary" />
                                Contact Theion Support
                            </h3>

                            <form onSubmit={handleSendMessage} className="space-y-4 relative z-10">
                                {messageError && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                                        {messageError}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label>Your Message</Label>
                                    <Textarea
                                        placeholder="How can we assist you today?"
                                        className="min-h-[120px] bg-black/20 border-white/10 focus:border-primary/50"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        minLength={5}
                                        maxLength={2000}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" className="btn-gold min-w-[120px]" disabled={isSending}>
                                        {isSending ? (
                                            <>Sending... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                                        ) : (
                                            <>Send Message <Send className="w-4 h-4 ml-2" /></>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;