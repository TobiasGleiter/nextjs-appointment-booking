# 🧧 Environment Variables

## ❓ Frequently Asked Questions

- **How can I add environment variables?**

---

## How can I add environment variables?

This project utilizes the `@t3-oss/env-nextjs` package for managing environment variables, providing a structured approach for defining and accessing them.

To add a new environment variable, follow these steps:

1. Locate the `.env.local` or `.env` file in the root directory.
2. Add your environment variable (e.g., `MY_SUPER_SECRET_KEY`).
3. Find the `env.mjs` file in the root directory.
4. Define the environment schema within the `server: {}` section using `zod`, for example: `MY_SUPER_SECRET_KEY: z.string().min(32)`.
5. Add your environment variable to the `runtimeEnv: {}` section, like so: `MY_SUPER_SECRET_KEY: process.env.MY_SUPER_SECRET_KEY`.
6. You can now access the environment variable anywhere in your project using `env.MY_SUPER_SECRET_KEY`.
