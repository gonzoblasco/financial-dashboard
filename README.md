# Financial Dashboard

An advanced financial dashboard application built with Next.js, TypeScript, Redux Toolkit, and React Query. This project aims to provide a comprehensive platform for financial data visualization and analysis.

![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

Financial Dashboard is a modern web application that allows users to visualize and analyze financial market data. The dashboard provides interactive charts, instrument details, and watchlist functionality to help users track and analyze financial instruments.

## Features

### Implemented (v0.2.0)

- **Data Visualization**

  - Line charts for price history visualization
  - Candlestick charts for OHLC data
  - Timeframe selection for different data ranges

- **Financial Instruments**

  - Comprehensive instrument details view
  - Instruments table with key metrics
  - Individual instrument cards

- **Watchlists**

  - Create and manage watchlists
  - Add/remove instruments from watchlists
  - Quick access to favorite instruments

- **User Interface**
  - Responsive layout for all device sizes
  - Light/dark theme support
  - Clean, modern design

### Planned for Future Releases

- Real-time data updates
- Technical indicators and analysis
- Customizable dashboard layouts
- Portfolio tracking and performance metrics
- Advanced statistics and analytics

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

### ✅ v0.1.0 - Project Foundations (Completed)

- ✅ Base Next.js 14 setup with TypeScript 5
- ✅ Directory structure and code organization
- ✅ Redux Toolkit and React Query configuration
- ✅ Light/dark theme implementation with useTheme hook
- ✅ Basic dashboard layout and navigation
- ✅ Project configuration (ESLint, Prettier, Husky)

### ✅ v0.2.0 - Static Data Visualization (Completed)

- ✅ TypeScript interfaces for financial instruments, market data, and watchlists
- ✅ Mock data implementation for development
- ✅ Line chart visualization with Recharts
- ✅ Candlestick chart implementation (ahead of schedule)
- ✅ Instruments table with key metrics
- ✅ Instrument detail cards
- ✅ Data service structure (instrumentService, marketDataService)
- ✅ Custom hooks for data fetching (useInstruments, useMarketData)
- ✅ Watchlist functionality (ahead of schedule)
- ✅ Timeframe selection for charts

### v0.3.0 - Basic Interactivity

- Enhanced time filters for charts
- Advanced instrument selection functionality
- UI state management with Redux
- User preferences persistence
- Improved navigation between views

### v0.4.0 - Advanced Visualizations

- ✅ Candlestick chart implementation (completed in v0.2.0)
- Zoom and pan functionality for charts
- Enhanced responsive visualizations
- Crosshair and detailed tooltips
- Detailed information panels and statistics

### v0.5.0 - Data Management

- Complete React Query implementation with caching strategies
- Advanced cache management and revalidation
- Periodic data updates simulation
- Comprehensive loading and error states
- API routes structure for future backend integration

### v0.6.0 - Basic Technical Indicators

- Technical analysis algorithms implementation (SMA, EMA)
- Indicator visualization on charts
- Indicator management panel
- Indicator configuration persistence
- Customization options for indicators

### v0.7.0 - Customizable Dashboard

- ✅ Basic watchlist functionality (completed in v0.2.0)
- Draggable dashboard layouts
- Multiple widgets support
- Dashboard configuration saving/loading
- Modular widget system
- Multi-instrument monitoring

### v0.8.0 - Advanced Analysis

- Complex technical indicators (RSI, MACD, Bollinger Bands)
- Performance statistics panel
- Multi-instrument comparison tools
- Data and screenshot export functionality
- Chart annotations and drawing tools

### v0.9.0 - Pre-Release

- UI/UX polish and refinement
- Authentication system implementation
- Performance optimization
- Comprehensive testing suite
- Complete documentation
- Bug fixes and final adjustments

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

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

### Key Pages

- **Home** (`/`): Landing page with project overview
- **Dashboard** (`/dashboard`): Main dashboard with overview of financial data
- **Instruments** (`/instrument`): List of available financial instruments
- **Instrument Details** (`/instrument/[symbol]`): Detailed view of a specific instrument
- **Watchlist** (`/watchlist`): User's watchlist of favorite instruments

## Screenshots

_Coming soon_

> Note: The application currently uses mock data for development purposes. In future versions, it will connect to real financial data APIs.

## Project Structure

```
financial-dashboard/
├── src/
│   ├── app/                          # App Router routes
│   │   ├── dashboard/                # Dashboard page
│   │   ├── instrument/               # Instruments list page
│   │   │   └── [symbol]/             # Instrument detail page
│   │   ├── watchlist/                # Watchlist page
│   │   ├── api/                      # API Routes (future)
│   │   ├── layout.tsx                # Root layout with theme provider
│   │   └── page.tsx                  # Home page
│   ├── components/                   # UI Components
│   │   ├── charts/                   # Chart components
│   │   │   ├── CandlestickChart.tsx  # Candlestick chart component
│   │   │   ├── LineChart.tsx         # Line chart component
│   │   │   └── TimeframeSelector.tsx # Timeframe selection component
│   │   ├── data-display/             # Data display components
│   │   │   ├── InstrumentCard.tsx    # Instrument card component
│   │   │   └── InstrumentsTable.tsx  # Instruments table component
│   │   ├── layouts/                  # Layout components
│   │   ├── ui/                       # Base UI components (future)
│   │   └── forms/                    # Form components (future)
│   ├── features/                     # Feature modules (future)
│   ├── hooks/                        # Custom React hooks
│   │   ├── useInstruments.ts         # Hook for instrument data
│   │   ├── useMarketData.ts          # Hook for market data
│   │   ├── useTheme.ts               # Hook for theme management
│   │   └── useWatchlists.ts          # Hook for watchlist management
│   ├── lib/                          # Utilities and configs
│   │   ├── constants/                # Constants
│   │   ├── helpers/                  # Helper functions
│   │   └── mocks/                    # Mock data
│   ├── models/                       # TypeScript types
│   │   ├── instruments.ts            # Instrument types
│   │   ├── marketData.ts             # Market data types
│   │   └── watchlist.ts              # Watchlist types
│   ├── store/                        # Redux store
│   │   ├── slices/                   # Redux slices
│   │   └── hooks.ts                  # Typed Redux hooks
│   ├── services/                     # External services
│   │   ├── instrumentService.ts      # Service for instrument data
│   │   ├── marketDataService.ts      # Service for market data
│   │   └── watchlistService.ts       # Service for watchlist management
│   └── algorithms/                   # Financial algorithms (future)
├── public/                           # Static assets
└── tests/                            # Tests (future)
```

## Current Limitations

- The application currently uses mock data for development purposes
- Some features shown in the UI may be partially implemented or non-functional
- The application is not yet connected to any real financial data APIs
- Technical indicators and advanced analysis features are planned for future releases
- Mobile responsiveness is implemented but may need further refinement

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

### General Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contributing to v0.3.0

We're currently working on v0.3.0, which focuses on enhancing interactivity. If you'd like to contribute, here are some areas to focus on:

- Enhanced time filters for charts
- Advanced instrument selection functionality
- UI state management with Redux
- User preferences persistence
- Improved navigation between views

## Code Quality

This project maintains high code quality standards:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- Comprehensive testing (planned)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

### Technologies

- [Next.js](https://nextjs.org/docs) - The React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Recharts](https://recharts.org/) - Composable charting library
- [TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts) - Financial charting library

### Resources

- [Financial Modeling Prep API](https://financialmodelingprep.com/developer/docs/) - Financial data API (planned integration)
- [Alpha Vantage](https://www.alphavantage.co/) - Market data API (planned integration)
- [Yahoo Finance API](https://finance.yahoo.com/) - Financial data (planned integration)
