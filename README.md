# RentKano - Rental Service Platform

A modern React-Vite web application for a rental service platform with Docker containerization and Tailwind CSS styling.

## 🚀 Features

- **Landing Page** - Beautiful hero section and feature highlights
- **Browse Rentals** - Search and filter rental properties
- **User Profiles** - Comprehensive user profile system
- **Profile Editing** - Edit user information
- **Verification Tracker** - Track user verification progress
- **Renters Directory** - Browse verified renters
- **Renter Profiles** - View individual renter details and reviews
- **Rental History** - Track your rental history
- **Who Rented Me** - View tenant records (for landlords)
- **Report Abuse** - Community safety reporting system
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Tailwind CSS with Lucide React icons

## 📋 Prerequisites

- Node.js 18+ or Docker
- npm or yarn package manager

## 🛠️ Local Development

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rental_client

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

```bash
# Build and run the application
docker-compose up -d

# View logs
docker-compose logs -f rental-app

# Stop the application
docker-compose down
```

The application will be available at `http://localhost:5173`

### Using Docker Directly

```bash
# Build the image
docker build -t rental-client .

# Run the container
docker run -p 5173:5173 --name rental-app rental-client

# Run in background
docker run -d -p 5173:5173 --name rental-app rental-client

# Stop the container
docker stop rental-app

# Remove the container
docker rm rental-app
```

## 📁 Project Structure

```
rental_client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.jsx   # Main navigation bar
│   │   └── Footer.jsx       # Footer component
│   ├── pages/               # Page components
│   │   ├── Landing.jsx      # Home page
│   │   ├── Rentals.jsx      # Browse rentals
│   │   ├── Profile.jsx      # User profile
│   │   ├── ProfileEdit.jsx  # Edit profile
│   │   ├── Verification.jsx # Verification tracker
│   │   ├── Renters.jsx      # Renters directory
│   │   ├── RenterProfile.jsx # Individual renter profile
│   │   ├── RentalHistory.jsx # User rental history
│   │   ├── WhoRentedMe.jsx  # Tenant records
│   │   └── ReportAbuse.jsx  # Report abuse form
│   ├── App.jsx              # Main app component with routing
│   ├── index.css            # Tailwind CSS
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🎨 Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **Docker** - Containerization
- **Axios** - HTTP client (ready to use)

## 🔄 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home/Landing page |
| `/rentals` | Browse all rentals |
| `/profile` | View user profile |
| `/profile/edit` | Edit profile |
| `/verification` | Verification tracker |
| `/renters` | Browse renters directory |
| `/renter/:id` | Individual renter profile |
| `/rental-history` | User's rental history |
| `/who-rented-me` | Tenant records |
| `/report-abuse` | Report abuse form |

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        success: '#16a34a',
        danger: '#dc2626',
        warning: '#f59e0b',
      },
    },
  },
}
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=RentKano
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐳 Docker Best Practices

- Multi-stage build for optimized image size
- Alpine Linux for smaller footprint
- Health checks configured
- Non-root user support (recommended for production)
- Environment-based configuration

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Docker Production

```bash
# Build image
docker build -t rental-client:latest .

# Run with environment variables
docker run -d \
  -p 5173:5173 \
  -e NODE_ENV=production \
  rental-client:latest
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@rentkano.com or open an issue on GitHub.

## 🔐 Security

- User input validation on forms
- Verification tracking system
- Abuse reporting mechanism
- Review and rating system for community trust

## 📞 Contact

- Website: https://rentkano.com
- Email: support@rentkano.com
- Location: Tokyo, Japan
