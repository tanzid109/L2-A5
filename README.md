# Rent Nest

A Next.js real estate rental marketplace with role-based dashboards for tenants, landlords, and admins.

## Features

- Login/register flow with token-based authentication
- Property browsing and detail pages
- Role-based dashboard navigation
- Mobile-friendly navigation and sidebar
- Admin tools for properties, rentals, users, and categories

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Notes

- API requests are configured using `BACKEND_API_URL` in `.env`
- Dashboard navigation is rendered per user role
- Mobile menu and dashboard actions are available in the mobile sheet
