import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './pages/App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <QueryClientProvider  client={queryClient}>
    <BrowserRouter>
       <App/>
       <ReactQueryDevtools/>
    </BrowserRouter>
  </QueryClientProvider>
  </Provider>
);

