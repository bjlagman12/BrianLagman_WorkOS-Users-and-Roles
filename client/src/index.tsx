import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const App = () => <h1>React app</h1>;

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}