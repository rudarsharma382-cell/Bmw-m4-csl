import React from 'react';

/**
 * Robust Error Boundary to prevent "Black Screen of Death"
 * If any 3D/WebGL or dynamic component throws an uncaught error,
 * this boundary catches it and displays a sleek motorsport fallback UI
 * while preserving the rest of the application.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback(this.state.error, this.handleReset)
          : this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: this.props.height || '360px',
            width: '100%',
            backgroundColor: 'var(--bg-raised, #121317)',
            border: '1px solid var(--line, #24262c)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              color: 'var(--accent, #ff3b1d)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            {this.props.name || 'MODULE'} // TELEMETRY BUFFER OFFLINE
          </span>
          <p
            style={{
              color: 'var(--text-dim, #a3a29c)',
              fontFamily: 'var(--font-text, sans-serif)',
              fontSize: '15px',
              maxWidth: '50ch',
              lineHeight: 1.5,
              marginBottom: '20px',
            }}
          >
            Hardware acceleration encountered a buffer constraint. The remaining chassis telemetry
            and sequence scrollers remain fully operational.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              background: 'transparent',
              border: '1px solid var(--text, #eceae4)',
              color: 'var(--text, #eceae4)',
              padding: '10px 20px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            RE-INITIALIZE BUFFER [↺]
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
