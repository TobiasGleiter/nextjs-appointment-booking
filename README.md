# nextjs13-ts-tailwind-husky-eslint-template

This is a [Next.js](https://nextjs.org/) template with following addons:

- [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Husky](https://typicode.github.io/husky/)
- [Tailwindcss](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)

Furthermore, this project template is optimized for Visual Studio Code with the Prettier extension.

## Getting Started

Ensure you have [Node.js](http://nodejs.org/) >= 19.8.1 installed, then clone the repository, `cd nextjs13-ts-tailwind-husky-eslint-template` and run:

```bash
    $ [sudo] npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you intend to use `yarn dev`, you need to update the `engines` field in the `package.json` to match your Yarn version:

```JSON
"engines": {
    "node": ">=16.17.0",
    "npm": "Please use yarn.",
    "yarn": "YOUR-YARN-VERSION"
},
```

## Storybook

Storybook is an npm package and a popular open-source tool used by developers to build, test, and showcase individual UI components in isolation. It provides a dedicated environment where developers can create interactive and isolated stories for each component, making it easier to visualize, develop, and iterate on various UI elements independently of the larger application. This helps ensure consistent design and behavior while facilitating collaboration between designers and developers.

### Run Storybook

First, run the Storybook:

```bash
npm run storybook
```

### Storybook workflow

To create a new component, follow these steps:

- Locate the `components/template` folder.
- Copy the `base` folder (for example).
- Create a new parent folder within the `components` directory, e.g., `modals`.
- Paste the previously copied `base` folder into the new `modals` folder.
- Rename the four files inside the copied folder, replacing `BaseTemplate` with a new name like `BaseModal`.
- Use a search within the folder to replace all occurrences (17 instances) of `BaseTemplate` with the new name (e.g., `BaseModal`).
- Find the file `BaseModal.stories.tsx` and modify the `title` field from `templates/BaseTemplate` to match your preferred category name, such as `modals/BaseModals`.

## Github and Husky

Husky is a tool that allows developers to automate tasks and enforce best practices by running scripts or commands at certain Git lifecycle events, such as before a commit (pre-commit), before a push (pre-push), or when a commit message is being created (commit-msg). These scripts can include actions like code linting, formatting checks, running tests, or any other custom tasks you want to perform before or after specific Git actions. Husky ensures that developers follow a consistent and high-quality development process.

There are three main rules created with Husky:

- `commit-msg`
- `pre-commit`
- `pre-push`

To handle errors before commit or push, the typical git workflow is as follows:

- Use `git add .` to add the current folders, or `git add [filename | dir]` to add a specific file or directory directly.
- Employ `git commit -m "[commit type]:[custom commit text]"` for committing. You can find commit types listed in `commitlint.config.js`, for instance, `git commit -m "feat: created new base modal"`. Git commit will automatically pre-check the code and verify if the commit type is valid.
- Use `git push` to push changes to the remote repository. Git push will automatically pre-build, proceeding only if the push is successful.
- There is also a yaml file with a github workflow which tests the branch automatically on github side.
- Besides that, the main branch is locked and can only merged with a pull request from github

The available commit types can be found in the `commitlint.config.js`.

## ESLint and CommitLint

ESLint and CommitLint settings can be located in `.eslintrc.json` and `commitlint.config.json`.

If you encounter a "no-unused-vars" warning in commit or ESLint, you can prefix the variable name with an underscore (`_`) until it is used.

## Folder structure

```none
nextjs13-ts-tailwind-husky-eslint-template
└── app
│    ├── favicon.ico
│    ├── globals.css
|    ├── layout.css
|    └── page.tsx
└── components
|    └── template
|    |    ├── base
|    |    │    ├── BaseTemplate.mocks.ts
|    |    │    ├── BaseTemplate.module.css
|    |    │    ├── BaseTemplate.stories.tsx
|    |    |    └── BaseTemplate.tsx
|    |    └── button (...)
└── lib
└── public
|    ├── next.svg
|    └── vercel.svg
└── stories (...)
└── (...)
```
