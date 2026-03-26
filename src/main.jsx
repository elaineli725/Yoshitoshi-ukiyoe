import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import './styles.css';

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown runtime error' };
  }

  componentDidCatch(error) {
    // Keep console details for debugging GitHub Pages white-screen reports.
    // eslint-disable-next-line no-console
    console.error('Root render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-ink px-6 py-16 text-moon">
          <div className="mx-auto max-w-3xl rounded-2xl border border-crimson/40 bg-panel/70 p-8">
            <h1 className="font-serifCn text-3xl">页面加载失败</h1>
            <p className="mt-4 text-moon/80">
              检测到前端运行时错误，已阻止白屏。请打开浏览器开发者工具查看 Console 并反馈错误信息。
            </p>
            <p className="mt-3 break-words text-sm text-gold">{this.state.message}</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </RootErrorBoundary>
  </React.StrictMode>
);
