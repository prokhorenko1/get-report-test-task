import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/transactions" replace />} />
          <Route path="transactions" element={<App.TransactionsList />} />
          <Route path="transactions/:transactionId" element={<App.TransactionDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
