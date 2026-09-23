# Architecture Decision Record

## Why three frontend apps?

The project is split into three separate React apps so each user type can have a tailored UX without mixing workflows.

- Customer app focuses on browsing, cart, checkout, and account tracking.
- Seller app focuses on catalog management, stock updates, payouts, and sales reporting.
- Admin app focuses on governance, moderation, user management, and platform-wide analytics.

This structure reduces route complexity and role leakage while still sharing the same backend and data sources.

## Why one common backend?

The backend is centralized to keep business logic, auth, and API contracts consistent across all three apps. It also allows a shared authentication and authorization layer, route patterns, and service architecture.

## Dual-database strategy

The application uses PostgreSQL and MongoDB intentionally.

- PostgreSQL and Prisma are used for data that benefits from relations and transactional integrity.
- MongoDB and Mongoose are used for document-driven data such as product records, carts, reviews, and wishlists.

This hybrid model supports a scalable ecommerce architecture without forcing all domain objects into a single database model.
