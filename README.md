# frontend

**Customer storefront** for ShopWorthy — an intentionally vulnerable e-commerce platform for application security training and demos.

Part of the [ShopWorthy](https://github.com/ShopWorthy) organization.

## Technology

| Item | Choice |
|------|--------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| HTTP Client | axios |
| State Management | React Context + localStorage |
| Router | React Router v6 |

## Prerequisites

- Node.js 20+
- npm or yarn

## Setup

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

The app will be available at **http://localhost:3000**. It expects the primary API at **http://localhost:4000**.

## Build (production)

```bash
npm run build
```

## Docker

```bash
docker build -t shopworthy-frontend .
docker run -p 3000:3000 shopworthy-frontend
```

## Port

| Environment | Port |
|-------------|------|
| Vite dev server | 3000 |
| Production (nginx) | 3000 |

## Related Repositories

- [api](https://github.com/ShopWorthy/api) — Primary REST API (required)
- [infra](https://github.com/ShopWorthy/infra) — Full stack via Docker Compose
