'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { PrimaryButton } from '../components/ui/PrimaryButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-danger" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground">
            We encountered an error while loading your portfolio. Please try again.
          </p>
        </div>
        
        <PrimaryButton
          onClick={reset}
          className="w-full"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </PrimaryButton>
      </div>
    </div>
  );
}
