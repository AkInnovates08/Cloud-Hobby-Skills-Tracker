import React from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError:false, error:null }; }
  static getDerivedStateFromError(error) { return { hasError:true, error }; }
  componentDidCatch(error, info) { console.error("UI error:", error, info); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <div className="route-error">
      <div className="route-error-card">
        <div className="error-symbol">!</div>
        <h2>This page could not be loaded</h2>
        <p>The application recovered from a page error. Other pages remain available.</p>
        <div className="error-actions">
          <button className="primary-btn" onClick={() => this.setState({hasError:false,error:null})}>Try again</button>
          <Link className="ghost-btn" to="/dashboard">Go to dashboard</Link>
        </div>
      </div>
    </div>;
  }
}
