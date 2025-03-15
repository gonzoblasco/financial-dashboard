# Financial Dashboard

An advanced financial dashboard application built with Next.js, TypeScript, Redux Toolkit, and React Query.

## Features (Planned)

- Real-time financial data visualization
- Interactive price charts with various timeframes
- Technical indicators and analysis
- Customizable dashboard layouts
- Watchlists and portfolios
- Advanced statistics and performance metrics

## Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit for global state
- **Data Fetching**: React Query for server state and caching
- **Styling**: Tailwind CSS
- **Visualization**: D3.js, Recharts, TradingView Lightweight Charts
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Jest and React Testing Library

## Development Roadmap

### v0.1.0 - Cimientos del Proyecto

- Base Next.js setup with TypeScript
- Directory structure and code organization
- Redux Toolkit and React Query configuration
- Light/dark theme implementation
- Basic dashboard layout and navigation

### v0.2.0 - Visualización de Datos Estáticos

- TypeScript interfaces for financial data
- Mock data implementation
- Basic line chart visualization
- Simple instruments table
- Data service structure

### v0.3.0 - Interactividad Básica

- Time filters for charts
- Instrument selection functionality
- UI state management with Redux
- Basic user preferences persistence

### v0.4.0 - Visualizaciones Avanzadas

- Candlestick chart implementation
- Zoom and pan functionality
- Responsive visualizations
- Crosshair and tooltips
- Detailed information panels

### v0.5.0 - Gestión de Datos

- Complete React Query implementation
- Cache management and revalidation
- Periodic data updates simulation
- Loading and error states
- API routes structure

### v0.6.0 - Indicadores Técnicos Básicos

- Technical analysis algorithms (SMA, EMA)
- Indicator visualization on charts
- Indicator management panel
- Indicator configuration persistence
- Customization options

### v0.7.0 - Dashboard Personalizable

- Draggable dashboard layouts
- Multiple widgets support
- Dashboard configuration saving/loading
- Modular widget system
- Multi-instrument monitoring

### v0.8.0 - Análisis Avanzado

- Complex technical indicators (RSI, MACD, Bollinger)
- Performance statistics panel
- Multi-instrument comparison
- Data and screenshot export
- Chart annotations

### v0.9.0 - Pre-Lanzamiento

- UI/UX polish
- Authentication system
- Performance optimization
- Comprehensive testing
- Documentation
- Bug fixes and final adjustments

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/financial-dashboard.git
   cd financial-dashboard
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
financial-dashboard/
├── src/
│   ├── app/                          # App Router routes
│   │   ├── dashboard/                # Dashboard pages
│   │   ├── instrument/[symbol]/      # Instrument detail pages
│   │   ├── watchlist/                # Watchlist pages
│   │   └── api/                      # API Routes
│   ├── components/                   # UI Components
│   │   ├── ui/                       # Base UI components
│   │   ├── charts/                   # Chart components
│   │   ├── data-display/             # Tables, stats, etc.
│   │   ├── layouts/                  # Layout components
│   │   └── forms/                    # Form components
│   ├── features/                     # Feature modules
│   │   ├── watchlist/                # Watchlist feature
│   │   ├── instruments/              # Instruments feature
│   │   ├── indicators/               # Indicators feature
│   │   └── preferences/              # User preferences
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utilities and configs
│   │   ├── api/                      # API clients
│   │   ├── constants/                # Constants
│   │   ├── helpers/                  # Helper functions
│   │   └── mocks/                    # Mock data
│   ├── models/                       # TypeScript types
│   ├── store/                        # Redux store
│   │   ├── slices/                   # Redux slices
│   │   └── hooks.ts                  # Typed Redux hooks
│   ├── services/                     # External services
│   └── algorithms/                   # Financial algorithms
│       ├── indicators/               # Technical indicators
│       ├── statistics/               # Statistical calculations
│       └── transformers/             # Data transformers
├── public/                           # Static assets
└── tests/                            # Tests
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run check-types` - Check TypeScript types
- `npm run check-all` - Run all checks (lint, types, format)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts)
- [D3.js Documentation](https://d3js.org/)
