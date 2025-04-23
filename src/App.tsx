import React from 'react';
import { createRoot } from 'react-dom/client';
import MetisCard from './components/MetisCard';
import './styles/App.css';

interface AppProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

const App: React.FC<AppProps> = ({ containerRef }) => {
  return (
    <div ref={containerRef} className="metis-widget-container">
      <MetisCard 
        address="0x6Cb5365ADfC0fdFc2aD7C02151A04e9f0F9eBeCA"
        threshold={5000}
      />
    </div>
  );
};

// Export for direct use
export default App;

// Export for embedding
export function embedMetisWidget(container: HTMLElement) {
  const root = document.createElement('div');
  container.appendChild(root);
  
  const reactRoot = createRoot(root);
  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  return () => {
    reactRoot.unmount();
    container.removeChild(root);
  };
}
