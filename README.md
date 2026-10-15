# E-Commerce Monorepo

This repository is a full-stack single-owner e-commerce platform scaffold with two frontend apps:

- Customer app: storefront and buyer workflow
- Admin app: owner-only store management and administration

Both frontend apps share one common backend service. The store owner manages the catalog and orders through the Admin app.

## Architecture overview

- Frontend apps: React + Vite + Tailwind CSS
- Routing: React Router
- State: Zustand
- API client: Axios
- Backend: Node.js + Express.js
- PostgreSQL + Prisma: transactions, users, orders, payments, inventory, coupons
- MongoDB + Mongoose: product catalog, reviews, cart, wishlist

## Database split

- PostgreSQL handles relational business data and operational workflows.
- MongoDB handles document-heavy catalog and user interaction collections.

## Folder structure

```text
/frontend
  /customer
  /admin
/backend
/docs
/docker-compose.yml
/.gitignore
/README.md
```

## Local development

1. Copy `backend/.env.example` to `backend/.env` and update values.
2. Run `docker-compose up --build` to start infrastructure.
3. Start the backend, customer app, and admin app with their package scripts.

## Notes

This repository intentionally contains starter scaffolding only. Business logic, database queries, and API handlers are not implemented yet.
