'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setThemeMode, ThemeMode } from '@/store/slices/uiSlice';

export function useTheme() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.ui.themeMode);
  const [mounted, setMounted] = useState(false);

  // Determinar el tema real basado en la preferencia del sistema si es necesario
  const actualTheme =
    themeMode === 'system'
      ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : themeMode;

  // Evitar problemas de hidratación marcando cuando el componente está montado
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Aplicar clase al documento para modo oscuro
    if (actualTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Guardar preferencia en LocalStorage
    localStorage.setItem('theme', themeMode);
  }, [themeMode, actualTheme, mounted]);

  // Recuperar tema guardado al iniciar
  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      dispatch(setThemeMode(savedTheme));
    }
  }, [dispatch, mounted]);

  return {
    themeMode,
    actualTheme,
    setThemeMode: (mode: ThemeMode) => dispatch(setThemeMode(mode)),
    mounted, // Útil para evitar parpadeos de tema
  };
}
