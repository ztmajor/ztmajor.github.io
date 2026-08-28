import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';

// HashRouter：静态托管（含 GitHub Pages）下刷新子路由不会 404
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
