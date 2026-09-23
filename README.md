# E-Commerce Monorepo

This repository is a full-stack e-commerce platform scaffold with three separate frontend apps:

- Customer app: storefront and buyer workflow
- Seller app: store management and order analytics
- Admin app: platform administration and moderation

All three frontend apps share one common backend service.

## Architecture overview

- Frontend apps: React + Vite + Tailwind CSS
- Routing: React Router
- State: Zustand
- API client: Axios
- Backend: Node.js + Express.js
- PostgreSQL + Prisma: transactions, users, sellers, orders, payments, payouts, inventory, coupons
- MongoDB + Mongoose: product catalog, reviews, cart, wishlist

## Database split

- PostgreSQL handles relational business data and operational workflows.
- MongoDB handles document-heavy catalog and user interaction collections.

## Folder structure

```text
/frontend
  /customer
  /seller
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
3. Start each app separately with its own package scripts.

## Notes

This repository intentionally contains starter scaffolding only. Business logic, database queries, and API handlers are not implemented yet.
