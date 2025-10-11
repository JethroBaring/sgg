# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

## Design System (SUGO UI)

This section documents the core UI tokens and component sizing used in the app. It’s Tailwind-first; use these classes for consistency.

### Colors
- **Primary (Red theme)**
  - Base: `red-600`
  - Hover/Darker: `red-700`
  - Light BG: `red-50`
  - Soft Text on red: `red-100`
- **Neutral**
  - Text: `gray-800`
  - Subtext: `gray-600`
  - Muted: `gray-500`
  - Dividers/Borders: `gray-200`
  - Surfaces: `white`
- **Status/Accents**
  - Success: `green-600` (bg `green-50`)
  - Warning: `amber-600` (bg `amber-50`)
  - Info: `blue-600` (bg `blue-50`)
  - Aircon accent: `teal-600` (bg `teal-50`)
  - Electrician accent: `amber-600` (bg `amber-50`)

### Gradients
- App headers: `bg-gradient-to-r from-red-600 to-red-700`
- Splash: `bg-gradient-to-br from-red-500 via-red-600 to-red-700`

### Radii
- Small pill: `rounded-lg`
- Card default: `rounded-2xl`
- Major containers (splash/cards): `rounded-3xl`
- Chat bubbles: `rounded-2xl` with `rounded-br-sm`/`rounded-bl-sm` for tails

### Elevation (Shadows)
- Card: `shadow-sm`
- Emphasis card/containers: `shadow-lg`
- App shell: `shadow-2xl`

### Spacing
- Card padding: `p-5` (inner elements often `space-y-3`/`space-y-4`)
- Header padding: `p-6`
- Page gutters: `p-4` to `p-6`

### Buttons
- Base style (primary): `bg-red-600 text-white hover:bg-red-700 transition`
- Shape: `rounded-xl`
- Shadow: `shadow-lg` for primary calls
- Sizes:
  - Small: `text-sm py-2 px-3`
  - Medium (default): `text-base py-3 px-4`
  - Large/CTA: `text-lg py-4 w-full`
- Secondary/ghost:
  - Outline: `border-2 border-red-200 text-red-600 hover:bg-red-50`
  - Subtle: `bg-gray-100 text-gray-700 hover:bg-gray-200`

### Inputs
- Text inputs: `w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400`
- Textarea: same as inputs plus `resize-none`
- Inline underlined (header card variants): `px-0 py-2 border-b border-gray-200`
- OTP cells: `w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-red-500`

### Lists & Cards
- Cards: `bg-white rounded-2xl p-5 shadow-sm`
- Emphasis on red headers: `bg-white/10 backdrop-blur-lg rounded-2xl p-4`
- Stats mini-cards: `bg-white/10 rounded-xl p-3 text-center`

### Chat
- Container: `bg-white rounded-2xl p-5 shadow-sm flex flex-col`
- Messages area: `flex-1 overflow-y-auto bg-gray-50 rounded-xl p-3 min-h-0`
- Input row: `flex gap-2`
- Customer bubble: `bg-red-600 text-white rounded-2xl rounded-br-sm px-4 py-2`
- Other bubble: `bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm px-4 py-2`

### Navigation
- Bottom nav: `fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg`
- Active tab color: `text-red-600`; inactive: `text-gray-400`

### Loading
- Modal overlay: `fixed inset-0 bg-black/50 z-50`
- Panel: `bg-white rounded-3xl p-8 w-full max-w-sm`
- Spinner badge: `w-16 h-16 bg-red-100 rounded-full`

### Mobile Frame
- App shell: `max-w-md mx-auto bg-white shadow-2xl min-h-screen relative pb-20 flex flex-col`
- Non-scrollable home with scrollable chat: parent `flex-1 overflow-hidden`, messages `flex-1 overflow-y-auto`

### Iconography (lucide-react)
- Delivery: `Package`
- Chat: `MessageCircle` / `MessageSquare`
- Payment: `CreditCard`
- Services: `Wrench` (plumbing), `Wind` (aircon), `PlugZap` (electrician)

### Accessibility
- Maintain color contrast: text on red uses `text-white` or `text-red-100`
- Focus states rely on `focus:border-red-500` on inputs and visible hover transitions on buttons

Use these tokens to keep screens consistent. If you add new components, prefer the same sizes, radii, and colors above.
