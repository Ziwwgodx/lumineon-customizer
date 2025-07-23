import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/preview-styles.css';
import '@fontsource/tilt-neon/latin-400.css';
import '@fontsource/orbitron/latin-400.css';
import '@fontsource/orbitron/latin-700.css';
import '@fontsource/audiowide/latin-400.css';
import '@fontsource/electrolize/latin-400.css';

// Import Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Righteous&family=Russo+One&family=Bungee&family=Monoton&family=Creepster&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
