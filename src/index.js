import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextWrapper } from './authProvider/authProvider';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// src/main.jsx (Vite) OR src/index.js (CRA)
import 'bootstrap/dist/css/bootstrap.min.css';
// main.jsx / index.js
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './feature/counter/store';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <Provider store={store}>
      <BrowserRouter>
        <AuthContextWrapper>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <App />
          </QueryClientProvider>
        </AuthContextWrapper>
      </BrowserRouter>
    </Provider>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
