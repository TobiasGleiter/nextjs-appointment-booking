# 👋🏼 Handler (Chain of Responsibility Pattern)

## ❓ Frequently Asked Questions

- **How can I add a handler into the appointment booking process?**

---

## 🌚 How can I add a handler into the appointment booking process?

1. Find the `src/lib/handler/appointment-handler.ts` file
2. Add a new handler function:

```typescript
/**
 * Your description what to check, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class YourHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const isOK = await checkSomething();
    if (!isOK) {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    return super.handle(data);
  }
}
```

3. Rename the handler as needed.
4. Add a new helper function that includes the logic in the `src/lib/helper/appointment-helper.ts` file:

```typescript
/**
 *  your description what to check
 * @param appointmentDate
 * @returns
 */
export async function checkSomething(): Promise<boolean> {
  const isDatabaseFineWithThat = await checkIfDatabaseIsFineWithThat();
  if (!isDatabaseFineWithThat) {
    return false;
  }

  return true;
}
```

5. Rename the function in the helper and in the handler file.
6. Add the logic you need, e.g. check the database if a specific document exists.
7. Test your handler.
