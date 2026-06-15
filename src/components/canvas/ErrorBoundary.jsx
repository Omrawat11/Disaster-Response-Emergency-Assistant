import React from 'react';

export class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #06080f 0%, #0e1018 40%, #1a0a05 70%, #06080f 100%)',
          }}
        >
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full border border-ember/30 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-60">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#C8410A" strokeWidth="1" opacity="0.4" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#D4A853" strokeWidth="0.5" opacity="0.3" />
                <circle cx="50" cy="50" r="3" fill="#C8410A" />
              </svg>
            </div>
            <p className="text-smoke text-xs font-mono uppercase tracking-widest">
              2D Fallback Mode
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
