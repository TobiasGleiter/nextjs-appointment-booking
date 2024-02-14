# 🎮 Components

## ❓ Frequently Asked Questions

- **How can I add a reusable component?**

---

## How can I add a reusable component?

You have two options for adding a reusable component:

### Using Shadcn UI

Shadcn UI provides a comprehensive library of components that you can seamlessly integrate into your project.

1. Ensure you have Shadcn UI set up in your project.
2. Explore the available components in the [Shadcn UI documentation](https://ui.shadcn.com/docs/components/accordion).
3. Copy the `npx` command provided for the desired component.
4. Execute the command in your terminal at the root folder of your project.
5. Your newly installed component will be available in the `components/ui` folder.
6. Refer to the Shadcn UI documentation for guidance on importing and using the component in your pages.

### Creating Your Own Reusable Component

If you prefer to create your own reusable component from scratch:

1. Navigate to the `src/components/` folder in your project.
2. Ensure the component you need to create fits the existing folder schema (e.g., components for a form placed into the `form` folder).
3. Create a new file following the naming convention: `componentName-parentFolderName.tsx` (e.g., `userAuth-form.tsx`).
4. Implement the basic structure of the component:

```typescript
interface ComponentNameProps {
  lang: Locale;
}

export function ComponentNameParentFolderName({ lang }: ComponentNameProps) {
  return <div>ComponentNameParentFolderName</div>;
}
```

5. Add your logic and UI elements to the reusable component as needed.
