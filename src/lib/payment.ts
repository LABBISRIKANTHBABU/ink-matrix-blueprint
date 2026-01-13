
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export type PaymentStatus = "pending" | "success" | "failed";
export type PaymentGateway = "stripe" | "razorpay" | "mock";

export interface CreatePaymentParams {
    userId: string;
    purpose: "course" | "session";
    amount: number;
    currency: string;
    gateway?: PaymentGateway;
    metadata?: Record<string, any>;
}

export const createPaymentRecord = async (params: CreatePaymentParams) => {
    try {
        const docRef = await addDoc(collection(db, "payments"), {
            ...params,
            gateway: params.gateway || "mock",
            status: "pending",
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating payment record:", error);
        throw error;
    }
};

export const updatePaymentStatus = async (paymentId: string, status: PaymentStatus) => {
    // Placeholder for status updates (likely via webhooks in real app)
    console.log(`Payment ${paymentId} status updated to: ${status}`);
};
