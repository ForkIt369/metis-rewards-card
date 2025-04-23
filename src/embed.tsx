import React from 'react';
import { createRoot } from 'react-dom/client';
import MetisCard from './components/MetisCard';
import './styles/index.css';

// Widget embedding function
function embedMetisWidget(container: HTMLElement) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <MetisCard 
        address="0x6Cb5365ADfC0fdFc2aD7C02151A04e9f0F9eBeCA"
        threshold={5000}
      />
    </React.StrictMode>
  );
}

// Development render
const rootElement = document.getElementById('root');
if (rootElement) {
  embedMetisWidget(rootElement);
}

// Expose function globally
window.embedMetisWidget = embedMetisWidget;

// Export for bundling
export { embedMetisWidget, MetisCard };

// TypeScript declaration
declare global {
  interface Window {
    embedMetisWidget: (container: HTMLElement) => void;
  }
}
