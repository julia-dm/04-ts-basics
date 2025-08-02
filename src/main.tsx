import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './components/App/App';

import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')as HTMLDivElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
<App />
<Toaster position="top-center" />
<ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);


