# PropChain Wallet Connection Task

A React application with MetaMask wallet integration for property listings and blockchain features.

## Features

- 🔗 **MetaMask Wallet Integration** - Connect and manage Ethereum wallets
- 🏠 **Property Listings** - Browse and search property listings
- ❤️ **Favorites System** - Save and manage favorite properties
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Built with Tailwind CSS

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension

### Installation

```bash
# Clone the repository
git clone https://github.com/codingirldev/propchain-wallet-connection-task.git

# Navigate to the project directory
cd propchain-wallet-connection-task

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

### Deploy to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import the repository `codingirldev/propchain-wallet-connection-task`

2. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**
   - No environment variables required for basic functionality
   - MetaMask integration works client-side only

4. **Deploy:**
   - Click "Deploy" button
   - Vercel will automatically build and deploy your application
   - Your app will be available at `https://your-project-name.vercel.app`

### Alternative Deployment Options

- **Netlify:** Connect GitHub repository and deploy with default Vite settings
- **GitHub Pages:** Use GitHub Actions to build and deploy
- **Railway:** Connect repository and deploy with automatic detection

## MetaMask Integration

The application includes full MetaMask wallet integration:

- **Connect Wallet:** Users can connect their MetaMask wallet
- **Account Management:** Automatic detection of account changes
- **Network Detection:** Monitors blockchain network changes
- **Error Handling:** User-friendly error messages for connection issues

## Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **MetaMask API** - Wallet integration

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (WalletContext)
├── pages/              # Application pages
├── data/               # Mock data and types
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with descriptive messages
5. Push to your fork
6. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
