# 📢 Language

## ❓ Frequently Asked Questions

- **How can I add more languages?**

---

## How can I add more languages?

To add a new language to the project, follow these steps:

1. Locate the file `src/lib/lang/i18.config.ts`.
2. Add your desired language(s) to the `locales: ['en', ...]` array.
3. Find the file `src/lib/lang/lang.ts`.
4. Within the `dictionaries = {}` object, add your language. For example, for German: `de: () => import('@/src/lang/de.json').then((module) => module.default)`.
5. Create a new file `src/lang/de.json` for German language support.
6. Copy the contents from `src/lang/en.json` into the new language `.json` file.
7. Translate the contents of the file into the desired language, using tools like ChatGPT or GEMINI.
8. Test if the language works by running `npm run dev`, then accessing the path `http://localhost:3000/de` and verifying that the page is translated correctly.
