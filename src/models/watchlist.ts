/**
 * Modelo de watchlist (lista de seguimiento)
 */
export interface Watchlist {
  id: string; // ID único de la watchlist
  name: string; // Nombre de la watchlist
  symbols: string[]; // Array de símbolos incluidos
  isDefault?: boolean; // Si es la watchlist por defecto
  createdAt: number; // Timestamp de creación
  updatedAt: number; // Timestamp de última actualización
}
