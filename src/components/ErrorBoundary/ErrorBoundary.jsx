import React from "react"; // Import React

// Class component to handle errors in the component tree
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // Initialize state with hasError set to false
  }

  // Update state if an error is thrown
  static getDerivedStateFromError() {
    return { hasError: true }; // Set hasError to true if an error is caught
  }

  // Log error details
  componentDidCatch(_, errorInfo) {
    console.log("ErrorBoundary caught an error", errorInfo); // Log error information
  }

  // Render method to display fallback UI or children
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>; // Display fallback UI if an error is caught
    }

    return this.props.children; // Render children if no error is caught
  }
}

export default ErrorBoundary; // Export ErrorBoundary component
