// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorRedirect error={this.state.error} />;
    }
    return this.props.children;
  }
}

function ErrorRedirect({ error }: { error?: Error }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/error', {
      state: {
        error: error?.message || 'Application crashed',
        statusCode: 500
      },
      replace: true
    });
  }, [navigate, error]);

  return null;
}