import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Make sure this is correct!
import './styles/main.scss'; // If you have a main.scss

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
