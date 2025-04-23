import React from 'react';
import { createRoot } from 'react-dom/client';
import MetisCard from './components/MetisCard';
import './styles/index.css';

// Development entry point
const container = document.createElement('div');
container.id = 'metis-widget';
document.body.appendChild(container);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <MetisCard 
      address="0x6Cb5365ADfC0fdFc2aD7C02151A04e9f0F9eBeCA"
      threshold={5000}
    />
  </React.StrictMode>
);

// Export for production
export { MetisCard };
export { embedMetisWidget } from './embed';
