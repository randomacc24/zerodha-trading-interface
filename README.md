# Zerodha Trading Interface

A professional trading interface with a sleek matte black and white design that integrates with Zerodha's API for seamless trading operations.

## Features

### 🎨 Modern Design
- **Matte Black & White Theme**: Professional and easy on the eyes
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Enhanced user experience with subtle transitions

### 📊 Trading Dashboard
- **Portfolio Overview**: Real-time portfolio value and performance metrics
- **Holdings Table**: Detailed view of all your stock holdings with P&L tracking
- **Performance Charts**: Visual representation of portfolio performance over time
- **Quick Actions**: One-click access to portfolio and holdings information

### 🔐 Secure Authentication
- **Zerodha API Integration**: Secure connection to your Zerodha trading account
- **API Key Management**: Safe storage and management of trading credentials
- **Session Management**: Automatic session handling and token refresh

### 📈 Trading Features
- **Buy/Sell Orders**: Place market and limit orders with ease
- **Order Management**: Track and manage your trading orders
- **Real-time Data**: Live market data and price updates
- **Order History**: Complete history of all your trading activities

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Zerodha trading account with API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zerodha-trading-interface
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Getting Zerodha API Credentials

1. Log in to your Zerodha Kite account
2. Go to the Developer Console
3. Create a new API application
4. Copy your API Key and Secret
5. Use these credentials to log in to the trading interface

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── LoginForm.tsx   # Authentication form
│   ├── Dashboard.tsx   # Main dashboard
│   ├── HoldingsTable.tsx # Holdings display
│   ├── PortfolioChart.tsx # Performance charts
│   └── TradingPanel.tsx # Trading interface
├── services/           # API services
│   └── zerodhaApi.ts  # Zerodha API integration
├── types/             # TypeScript type definitions
│   └── zerodha.ts    # API data types
├── App.tsx           # Main application component
├── index.tsx         # Application entry point
└── index.css         # Global styles
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure environment variables if needed

### Deploy to AWS S3 + CloudFront
1. Build the project: `npm run build`
2. Upload `build` folder to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain (optional)

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_ZERODHA_API_URL=https://api.kite.trade
REACT_APP_ZERODHA_REDIRECT_URI=http://localhost:3000/callback
```

## API Integration

The application integrates with Zerodha's Kite Connect API:

- **Authentication**: OAuth 2.0 flow with API key/secret
- **Portfolio Data**: Real-time holdings and positions
- **Order Management**: Place and manage trading orders
- **Market Data**: Live quotes and historical data

## Security Features

- **Secure API Communication**: All API calls use HTTPS
- **Token Management**: Secure storage and automatic refresh of access tokens
- **Input Validation**: Comprehensive validation of all user inputs
- **Error Handling**: Graceful error handling and user feedback

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the Zerodha API documentation

## Disclaimer

This application is for educational and demonstration purposes. Always verify your trading decisions and understand the risks involved in stock trading. The developers are not responsible for any financial losses incurred through the use of this application. 