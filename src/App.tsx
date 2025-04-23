import React from 'react';
import { createRoot } from 'react-dom/client';
import MetisCard from './components/MetisCard';
import './styles/App.css';

const App: React.FC = () => (
  <MetisCard 
    address="0x6Cb5365ADfC0fdFc2aD7C02151A04e9f0F9eBeCA"
    threshold={5000}
  />
);

export default App;

export function embedMetisWidget(container: HTMLElement) {
  const reactRoot = createRoot(container);
  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  return () => reactRoot.unmount();
}
