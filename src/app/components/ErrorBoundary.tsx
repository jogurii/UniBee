/**
 * Error Boundary Component
 * Catches JavaScript errors in child components and displays a fallback UI
 * Prevents the entire app from crashing on a single component error
 */

import React, { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    // Call optional onError callback
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center px-6 text-center p-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Terjadi Kesalahan</h1>
          <p className="text-slate-400 text-sm mb-6 max-w-xs">
            Maaf, terjadi kesalahan yang tidak terduga. Silakan refresh halaman atau kembali ke halaman sebelumnya.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
          >
            Refresh Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}