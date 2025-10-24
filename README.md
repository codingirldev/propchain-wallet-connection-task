
A React application with MetaMask wallet integration for property listings and blockchain features.


## Local Development


### Installation

```bash

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


## Source

This project is based on source: https://bitbucket.org/hiring-sfox/propchain/src/master/
