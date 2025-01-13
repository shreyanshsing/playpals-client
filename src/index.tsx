import React from 'react';
// import { hydrateRoot } from 'react-dom/client';
import App from './App';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// hydrateRoot(document.getElementById('root') as HTMLElement, <App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
