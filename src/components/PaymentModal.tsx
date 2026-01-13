
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { createPaymentRecord } from "@/lib/payment";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    purpose: "course" | "session";
    itemName: string;
    onSuccess?: () => void;
}

const PaymentModal = ({ isOpen, onClose, amount, purpose, itemName, onSuccess }: PaymentModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "failed">("idle");

    const handlePayment = async () => {
        const user = auth.currentUser;
        if (!user) {
            toast.error("You must be logged in to make a payment.");
            // Ideally redirect to auth here
            return;
        }

        setIsLoading(true);
        try {
            // 1. Create Payment Record (Pending)
            await createPaymentRecord({
                userId: user.uid,
                amount,
                currency: "USD",
                purpose,
                metadata: { itemName }
            });

            // 2. Simulate Gateway Delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 3. Mock Success
            setStatus("success");
            toast.success("Payment Successful!");

            setTimeout(() => {
                onSuccess?.();
                onClose();
                setStatus("idle");
            }, 1500);

        } catch (error) {
            console.error(error);
            setStatus("failed");
            toast.error("Payment Failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-card border border-primary/20 text-foreground">
                <DialogHeader>
                    <DialogTitle className="font-display text-xl text-primary">Secure Payment</DialogTitle>
                    <DialogDescription>
                        Complete your purchase for <span className="text-foreground font-semibold">{itemName}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 flex flex-col items-center justify-center space-y-4">
                    {status === "idle" && (
                        <div className="text-center space-y-2">
                            <div className="text-3xl font-bold font-display">${amount}</div>
                            <div className="text-sm text-muted-foreground">One-time payment</div>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="flex flex-col items-center text-emerald-500 animate-in zoom-in-50">
                            <CheckCircle2 className="w-16 h-16 mb-2" />
                            <span className="font-semibold text-lg">Payment Successful</span>
                        </div>
                    )}

                    {status === "failed" && (
                        <div className="flex flex-col items-center text-red-500 animate-in zoom-in-50">
                            <AlertCircle className="w-16 h-16 mb-2" />
                            <span className="font-semibold text-lg">Payment Failed</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="ghost" onClick={onClose} disabled={isLoading}>Cancel</Button>
                    {status === "idle" || status === "failed" ? (
                        <Button className="btn-gold min-w-[140px]" onClick={handlePayment} disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CreditCard className="w-4 h-4 mr-2" />}
                            {isLoading ? "Processing..." : "Pay Now"}
                        </Button>
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;
