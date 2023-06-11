import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Navigation from './components/router/Navigation.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider  client={queryClient}>
    <BrowserRouter>
       <Navigation/>
       <ReactQueryDevtools/>
    </BrowserRouter>
  </QueryClientProvider>
);

