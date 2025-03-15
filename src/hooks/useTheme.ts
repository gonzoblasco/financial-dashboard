'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setThemeMode, ThemeMode } from '@/store/slices/uiSlice';

export function useTheme() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  // Determinar el tema real basado en la preferencia del sistema si es necesario
  const actualTheme =
    themeMode === 'system'
      ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : themeMode;

  useEffect(() => {
    // Aplicar clase al documento para modo oscuro
    if (actualTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Guardar preferencia en LocalStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', themeMode);
    }
  }, [themeMode, actualTheme]);

  // Recuperar tema guardado al iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        dispatch(setThemeMode(savedTheme));
      }
    }
  }, [dispatch]);

  return {
    themeMode,
    actualTheme,
    setThemeMode: (mode: ThemeMode) => dispatch(setThemeMode(mode)),
  };
}
