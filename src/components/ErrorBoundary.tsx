
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-4xl font-display font-semibold mb-4 text-primary">Oops!</h1>
                        <p className="text-muted-foreground mb-6">
                            Something went wrong. We apologize for the inconvenience.
                        </p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="btn-gold rounded-full"
                        >
                            Refresh Page
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
