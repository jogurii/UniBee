# UniBee

A mobile-first web application built with Next.js and Capacitor.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui
- **Mobile Framework**: Capacitor
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## Mobile Development

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

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── figma/       # Figma-designed components
│   ├── hooks/           # Custom React hooks
│   └── lib/              # Utilities and helpers
android/                  # Capacitor Android project
ios/                      # Capacitor iOS project (if configured)
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

## License

MIT
  