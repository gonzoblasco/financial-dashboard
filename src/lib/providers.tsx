'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { PropsWithChildren, useState, useEffect } from 'react';

export function Providers({ children }: PropsWithChildren) {
  // Estado para controlar si la aplicación está "hidratada"
  const [isHydrated, setIsHydrated] = useState(false);

  // Marcar que la hidratación está completa después del primer render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Crear un cliente de React Query para cada request en el cliente
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 Minuto
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // Script para detectar tema del sistema y aplicarlo antes del primer render
  // Esto previene el parpadeo inicial
  useEffect(() => {
    // Script para establecer el tema antes del primer render
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        try {
          var savedTheme = localStorage.getItem('theme');
          if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (e) {}
      })();
    `;
    script.async = false;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        {isHydrated && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
