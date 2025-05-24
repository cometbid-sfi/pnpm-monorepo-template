## The Cometbid Technology Foundation(TCTF) Portal Frontend

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

### Setting Up a Monorepo with pnpm

**Install pnpm:**  
Start by Installing pnpm globally if you haven't already:

```sh
npm install -g pnpm
```

**Initialize a Workspace:**

Create a new directory for your monorepo and initialize a pnpm workspace:

```sh
mkdir pnpm-monorepo-template
cd pnpm-monorepo-template
pnpm init
```

**Configure the Workspace:**

Create a pnpm-workspace.yaml file in the root of your monorepo to define the packages in the workspace:

```yaml
packages:
  - "packages/*"
  - "apps/*"
  - "libs/*"
```

**Create Applications:**

Create apps for react and nest apps. And packages for re-useable libraries:

```sh
mkdir apps
mkdir packages
```

**Initialize the React Application:**

To create the react app using vite run following command from root of monorepo.

```sh
pnpm create vite apps/ui
```

**Initialize the Nest Application:**

To create the nestjs app using nestjs/cli run following command from root of monorepo.

```sh
pnpx @nestjs/cli new apps/api
```

**Build the Dependencies**
```sh
pnpm --filter @pnpmworkspace/logger build
```

**Run the react(UI) app:**

Make sure to build dependencies first, or you will into an error:

```sh
pnpx nx build ui 
or
pnpm --filter ui build

pnpm --filter ui start:dev
pnpm --filter ui start:prod
```

**Run the nestjs(api) app:**

```sh
pnpx nx build api 
or
pnpm --filter api build

pnpm --filter api start:dev
pnpm --filter api start:prod
```

**Scripts and Automation:**

Update the package.json file on root. Add some scripts in package.json to start both apps with single command:

```json
"scripts": {
  "start:ui": "pnpm --filter ui dev",
  "start:api": "pnpm --filter api start:dev",
  "start": "pnpm run start:ui & pnpm run start:api",
  "build": "pnpm recursive run build",
  "test": "pnpm recursive run test"
}
```

```sh
pnpm start:ui // It will run UI app
pnpm start:api // It will run API app
pnpm start // It will run both apps
pnpm test // it will test on all workspaces
```

Explanation of pnpm commands:

**— filter:** It will filter the app you want to run in out case ui and api are two apps.

**— ui/api:** Name of the app

**— dev/start:dev:** Script in package.json of app. dev is script command in scripts object in ui app. and start:dev is the script command in api app.

**— recursive:** It will run the specifies command like build and test on all workspaces. If some workspace doesn’t have test script, it will ignore it.

**Create a Shared Logger Package:**

Create a new folder for your shared logger package inside the packages folder:

```sh
mkdir -p packages/logger
cd packages/logger
pnpm init
```

**Implement the Logger Package:**

Add a simple logger implementation in packages/logger/src/index.ts:

```javascript
export const Logger = (message: string) => {
    console.log(`${'Logger - ' + new Date().toISOString() + ': ' + message}`)
}

export default Logger;
```

**Add dependencies:**

Add the dependencies for logger, in our case it’s only typescript. Run the following command on root of project.

```sh
pnpm add --filter logger typescript
```

**Update package.json:** package.json file of logger should look like:

```json
{
  "name": "@pnpmworkspace/logger",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "typescript": "^5.5.3"
  }
}
```

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "allowJs": true,
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

**Build Logger package (Run from root):**

```sh
pnpm --filter logger build
```

**Add Logger as dependency(Run from root):**

```sh
pnpm add ./packages/logger --workspace-root
```

Above command will add the package logger into root node_module folder.

**— workspace-root:** It will add package in root node_module folder.

**Use Logger Package:** You can use @pnpmworkspace/logger into both ui and api apps.

```javascript
import { Logger } from "@pnpmworkspace/logger";
```

**Run both apps:**

```sh
pnpm start
```

This ensures that build and test commands are executed for all projects within the monorepo.

**Build individual Projects:**

```sh
pnpx nx build api
pnpx nx build ui
```

**Run build command on all apps:**

Following command run all build command on all apps at once.

```sh
pnpx nx run-many -t=build
```

**Using Nx with pnpm:**

Nx provides a rich CLI and graphical interface for managing your projects. You can run build, test, and lint commands for specific projects.

```sh
pnpx nx run-many --targets=lint,test,build --projects=api
```

Or for all projects.

```sh
pnpx nx run-many --targets=lint,test,build
```

## How to Setup Nx in a pnpm Workspace

Nx enhances the monorepo experience by providing advanced tooling for building, testing, and deploying applications. When combined with pnpm, it offers efficient dependency management and powerful workspace capabilities.

**Add Nx to Your Workspace:**

Initialize the Nx workspace in your project

```sh
pnpx nx@latest init
```

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

Relevant Blogs:

- [Monorepo using pnpm workspaces](https://fazalerabbi.medium.com/monorepo-using-pnpm-workspaces-cb23ed332127)

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
pnpx nx dev tctf-member-dashboard
pnpx nx dev tctf-main-portal
```

To create a production bundle:

```sh
pnpx nx build tctf-member-dashboard
pnpx nx build tctf-main-portal
```

To see all available targets to run for a project, run:

```sh
pnpx nx show project tctf-member-dashboard
pnpx nx show project tctf-main-portal
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

**To upgrade libraries to the latest versions, run:**

```bash
pnpm update --latest

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

**Using LightHouse for Performance Monitoring**

- Install Lighthouse CLI

```bash
pnpm i -g lighthouse
```

- Run Lighthouse audit on your Nextjs application

```bash
lighthouse http://cometbid.org/
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
