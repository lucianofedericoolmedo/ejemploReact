import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: If you want to add some custom styles
import App from './App'; // Import your App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // React will render into this div
);
