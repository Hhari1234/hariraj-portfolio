import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: () => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Swallow rendering errors from optional/decorative subtrees (e.g. 3D scene)
    // so a failure there never takes down the rest of the page.
    this.props.onError?.();
    if (import.meta.env.DEV) {
      console.warn("Recovered from a render error in a non-critical section:", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
