# 📶 API

## ❓ Frequently Asked Questions

- **How can I add a new API Endpoint?**

---

## 🚀 How can I add a new API Endpoint?

1. Find the `src/app/api/v1` folder (or create a new folder for a new version e.g. v2)
2. Create a new directory `myApiRoute`
3. Add a `route.ts` file and add the following code:

```typescript
export async function GET() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function POST() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PATCH() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function DELETE() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PUT() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function OPTIONS() {
  return NextResponse.json('Forbidden', { status: 403 });
}
```

4. Add your logic to the HTTP request (GET, POST, PATCH, DELETE, PUT, OPTIONS)
