import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { ThemeProvider } from './context/themeContext';
import { Provider } from 'react-redux';
import { store } from 'store/store.ts';
import { NavlinkProvider } from '@context/navlinkContext.tsx';
import 'reflect-metadata'; 
import('dotenv').then((e) => e.config());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NavlinkProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NavlinkProvider>
    </Provider>
  </React.StrictMode>
);
