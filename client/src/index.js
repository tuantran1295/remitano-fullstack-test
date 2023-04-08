import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RootStoreProvider } from './store/rootStore';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RootStoreProvider>
    <App/>     
  </RootStoreProvider>

);

