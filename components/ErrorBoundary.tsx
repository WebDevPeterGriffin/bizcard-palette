import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';
import { logger } from '@/lib/logger';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-destructive/10 p-4">
                                <AlertTriangle className="h-12 w-12 text-destructive" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-foreground">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-muted-foreground">
                                We encountered an unexpected error. Don't worry, your data is safe.
                            </p>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="bg-muted p-4 rounded-lg text-left">
                                <p className="text-xs font-mono text-muted-foreground break-all">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={this.handleReset}
                                className="w-full"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Go to Homepage
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                                className="w-full"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
