# 🎹 Middleware

## ❓ Frequently Asked Questions

- **How can I add a custom middleware?**

---

## How can I add a custom middleware?

This project employs a middleware chain, allowing the integration of various custom middlewares for specific functionalities.

### Overview of Middleware Components:

- **`src/middleware.ts`**: This file, from Next.js, defines the paths where middleware intercepts requests and adds custom middleware to the chain.
- **`src/lib/middleware/auth-middleware.ts`**: Manages authentication.
- **`src/lib/middleware/locale-middleware.ts`**: Handles locale settings, facilitating the use of different languages.
- **`src/lib/middleware/chain-middleware.ts`**: Defines the middleware chain to incorporate multiple middlewares.

### Creating a New Middleware:

1. Navigate to the `src/lib/middleware` folder.
2. Create a new middleware file following the naming convention `name-middleware.ts`.
3. Use the following template:

```typescript
export function middleware() {}

export function customMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // Add your logic here ...
    return middleware(request, event, response);
  };
}
```

4. Implement your custom logic within the `customMiddleware` function to handle requests appropriately.
