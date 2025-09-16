'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { PrimaryButton } from './ui/PrimaryButton';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.handleRetry} />;
      }

      return <DefaultErrorFallback error={this.state.error!} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: Error;
  retry: () => void;
}

function DefaultErrorFallback({ error, retry }: DefaultErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-lg p-6 max-w-md w-full text-center space-y-4">
        <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8 text-danger" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-card-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-muted/20 rounded p-3 text-left">
            <p className="text-xs text-muted-foreground font-mono">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex space-x-2">
          <PrimaryButton onClick={retry} className="flex-1 flex items-center justify-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

// Hook for handling async errors
export function useAsyncError() {
  const [, setError] = React.useState();

  return React.useCallback(
    (error: Error) => {
      setError(() => {
        throw error;
      });
    },
    []
  );
}

// Higher-order component for async error handling
export function withAsyncErrorHandler<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AsyncErrorWrapper(props: P) {
    const throwError = useAsyncError();

    return <Component {...props} onAsyncError={throwError} />;
  };
}

