# Aampere Electric Vehicle Marketplace

A Next.js application for browsing and comparing electric vehicles.

## Features

- Browse electric vehicles
- Filter by price, range, and other specifications
- Sort vehicles by different criteria
- Detailed vehicle information pages
- Responsive design

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Testing**: Jest & React Testing Library
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/ramkumar897003/next-electric-vehicle-marketplace.git
cd aampere-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

### Testing

Tests are written using Jest and React Testing Library. Run the test suite:

```bash
npm run test
```

### Docker Deployment

1. Build and run using docker-compose:

```bash
docker-compose up --build
```

2. Access the application at [http://localhost:3000](http://localhost:3000)

The docker-compose configuration:

- Builds from local Dockerfile
- Exposes port 3000
- Sets production environment
- Configures automatic restart

## Project Structure

```
├── components/          # Reusable UI components
├── features/           # Feature-based modules
│   └── vehicles/      # Vehicle-related features
├── pages/             # Next.js pages
├── public/            # Static assets
├── styles/            # Global styles
└── __tests__/        # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT](LICENSE)
