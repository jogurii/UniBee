# UniBee

<p align="center">
  <img src="public/icon.png" alt="UniBee Logo" width="120" />
</p>

<p align="center">
  A mobile-first event management and discovery platform built with Next.js and Capacitor.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#mobile-development">Mobile Development</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#license">License</a>
</p>

---

## Features

- 🎫 **Event Discovery** — Browse and explore events happening around you
- 🎟️ **Ticket Management** — View and manage your tickets in one place
- 📍 **Location-Based** — Find events near you with map integration
- 📱 **Mobile-First** — Native-like experience on iOS and Android
- 🔐 **Authentication** — Secure user authentication system
- ⚡ **Fast & Responsive** — Built with Next.js 15 for optimal performance

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15, React 19 |
| **Language** | TypeScript |
| **UI Components** | shadcn/ui |
| **Styling** | Tailwind CSS |
| **Mobile** | Capacitor |
| **Deployment** | Vercel |

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- (For mobile) Android Studio or Xcode

### Installation

```bash
# Clone the repository
git clone https://github.com/joguri/UniBee.git
cd UniBee

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (if using)
DATABASE_URL=

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# API Keys (if applicable)
NEXT_PUBLIC_API_KEY=
```

## Mobile Development

UniBee uses Capacitor to package the web app as a native mobile application.

### Build for Android

```bash
# Build web app
npm run build

# Sync to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

### Build for iOS

```bash
# Build web app
npm run build

# Sync to iOS
npx cap sync ios

# Open in Xcode
npx cap open ios
```

### Running on Device

After syncing with Capacitor, you can run the app on a connected device or emulator:

```bash
# Android
npx cap run android

# iOS
npx cap run ios
```

## Project Structure

```
UniBee/
├── public/                  # Static assets
│   └── icon.png            # App icon
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── components/     # React components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   └── figma/     # Figma-designed components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and helpers
│   │   └── page.tsx       # Main pages
│   ├── components/         # Shared components
│   └── styles/            # Global styles
├── android/               # Capacitor Android project
├── ios/                   # Capacitor iOS project
├── capacitor.config.ts    # Capacitor configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.ts         # Next.js configuration
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx cap sync` | Sync web app to native projects |
| `npx cap open` | Open native IDE |
| `npx cap run` | Run on device/emulator |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/joguri">joguri</a>
</p>
