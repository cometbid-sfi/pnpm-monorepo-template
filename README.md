## Cometbid Technology Foundation Portal Frontend

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

### Add @nx/next:app to a pnpm monorepo

1. First, ensure you have a proper pnpm workspace setup by creating/checking your pnpm-workspace.yaml file in your root directory:

```yaml
packages:
  - "apps/*"
  - "libs/*"
```

2. Install the required dependencies using pnpm:

```sh
pnpm add -D @nx/next nx @nx/react --workspace-root
```

3. If you're using a newer version of pnpm, you might need to configure dependency hoisting. Create or update your .npmrc file in the root:

node-linker=hoisted
shamefully-hoist=true

4. Install the peer dependencies:

```sh
pnpm remove next react react-dom --workspace-root
pnpm add next react react-dom --workspace-root
```

5. Clear your pnpm store and reinstall dependencies:

```sh
pnpm store prune
pnpm install
```

6. After installation, you can create a new Next.js app using:

```sh
pnpm nx g @nx/next:app your-app-name
pnpm approve-builds
```

If you're still experiencing issues, try these additional troubleshooting steps:

i. Clear the Nx cache:

```sh
pnpm nx reset
```

ii. Make sure your package.json has the correct dependencies:

```json
{
  "devDependencies": {
    "@nx/next": "latest",
    "@nx/react": "latest",
    "nx": "latest"
  },
  "dependencies": {
    "next": "^13.0.0 || ^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

iii. If you have a nx.json file, ensure it's properly configured:

```json
{
  "extends": "nx/presets/npm.json",
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "affected": {
    "defaultBase": "main"
  },
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default"
    }
  }
}
```

## Add new Nextjs projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
pnpx nx g @nx/next:app app-name
```

for example:

```sh
pnpx nx g @nx/next:app apps/ctf-dashboard
pnpx nx g @nx/next:app apps/ctf-main
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

After creation, you can verify the project setup by running the task.

## Run tasks

To run the dev server for your app, use:

```sh
pnpx nx dev ctf-dashboard
pnpx nx dev ctf-main
```

To create a production bundle:

```sh
pnpx nx build ctf-dashboard
pnpx nx build ctf-main
```

To see all available targets to run for a project, run:

```sh
pnpx nx show project ctf-dashboard
pnpx nx show project ctf-main
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Remove Nextjs project

1. First, to remove the existing Next.js project, you can use the nx remove command:

```sh
pnpx nx g @nx/next:remove ctf-dashboard ctf-dashboard-e2e
```

## Add Bootstrap to Nextjs Project

1. Install Bootstrap and React-Bootstrap using npm, yarn, or pnpm.

Navigate to the root of the Nx project that requires Bootstrap library:

```sh
pnpm i bootstrap react-bootstrap
```

2. Go to the globals.css file present inside app directory. At the top of file add the following code:

```
@import "~bootstrap/dist/css/bootstrap.min.css";
```

OR

Go to the layout.tsx file present inside app directory. At the top of file add the following code:

```css
import "bootstrap/dist/css/bootstrap.min.css";
```

3. You can add the bootstrap styling to elements using className.

To use bootstrap components like Container, Button, Form etc, you can import them from react-bootstrap and use them like normal components.

E.g:

```javascript
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-danger fw-bold">Home</h1>
          <Button variant="primary" className="mt-5">
            Click Me
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
```

That's it, you are all set to use bootstrap in your Next.js application

## Add Tailwind CSS to Nextjs Project

1. Install Tailwind CSS and its peer dependencies:

```bash
pnpm add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

2. Creates two files:

- Create tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Create postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

3. Make sure your package.json has the correct dependencies:

```json
{
  "devDependencies": {
    "tailwindcss": "latest",
    "postcss": "latest",
    "autoprefixer": "latest"
  }
}
```

4. Add Tailwind's CSS directives to your global CSS file ( app/globals.css or styles/globals.css):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. If you're using the App Router, make sure your layout.js or layout.tsx imports the global CSS file:

```javascript
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

6. Test it by adding some Tailwind classes to any component:

```javascript
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">Hello Tailwind CSS!</h1>
    </div>
  );
}
```

7. After setting this up, run pnpm install again to ensure all dependencies are properly installed.

### Other CLI Commands For Nx

```sh
pnpx nx list
```

Lists the currently installed Nx plugins.

```sh
pnpx nx migrate latest
```

Updates the packages in package.json to the latest version.

```sh
pnpx nx affected
```

Performs the action on only the affected or modified apps.

```sh
pnpx nx serve todo-api
pnpx nx serve todo
```

Runs each target project separately.

```sh
pnpx nx run-many --target serve --projects todo-api,todo
```

Runs the target command across all projects listed.

```sh
pnpx nx dep-graph
```

Show the dependency graph of our application.

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
