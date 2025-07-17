# Task List – Milestone 0

### Overview
| # | Title | Agent Template | Key Deliverables |
|---|-------|----------------|------------------|
| 0.1 | **Create project folder structure & placeholder docs** | Docs‑Agent (`.claude/commands/agents/docs_agent.md`) | `src/`, `docs/`, `commands/`, `tasks/`; empty `.md` files for all guideline & prompt docs. |
| 0.2 | **Initialise Git repo, .gitignore, README stub** | Logic‑Coder | `git init`, `.gitignore` (Node, macOS, VS Code), `README.md` with install/run. |
| 0.3 | **Add Yarn v3 (berry) & root `package.json`** | Logic‑Coder | `yarn set version berry`; minimal scripts `dev`, `build`, `test`, `lint`. |
| 0.4 | **Install Vite + React + TypeScript** | Logic‑Coder | Dependencies, `vite.config.ts`, `index.html`, `src/main.tsx`, `App.tsx`. |
| 0.5 | **Configure Tailwind CSS (JIT)** | UI‑Coder | `tailwind.config.ts`, `postcss.config.cjs`, import in `index.css`, demo class on App. |
| 0.6 | **Add Storybook 8 (Vite builder)** | UI‑Coder | `storybook` scripts, `.storybook/` config, run with `yarn storybook`. |
| 0.7 | **Set up ESLint & Prettier with Husky + lint‑staged** | Logic‑Coder | `.eslintrc.cjs`, `.prettierrc`, `husky/pre‑commit`, `lint-staged.config.mjs`. |
| 0.8 | **Integrate Vitest testing framework** | Test‑Writer (`.claude/commands/agents/test_agent.md`) | `vitest.config.ts`, example empty test, `yarn test` script. |
| 0.9 | **Add GitHub Actions CI workflow skeleton** | CI/CD‑Agent (`.claude/commands/agents/ci_agent.md`) | `.github/workflows/ci.yml` running install‑lint‑test matrix (Node 18/20). |
| 0.10 | **Commit Conventional Commit & CHANGELOG tooling** | Docs‑Agent | `commitlint`, `standard‑version`, CHANGELOG template, badge in README. |

> **Concurrency hint:**  
> *Run 0.1 first* (creates folders).  
> Tasks **0.2 → 0.10** may execute in parallel via worktrees, but enforce the rule: **do not edit the same file** across concurrent branches.

### Task Template Reminder
When you launch an agent:

1. Provide the **agent system prompt** from `.claude/commands/agents/…`.
2. Append the **specific task (copy row text)**.
3. Finally append relevant excerpts from `@docs/guidelines/DEVELOPMENT_GUIDELINES.md`, `@docs/guidelines/STYLE_GUIDE.md`, and `@docs/guidelines/TESTING_GUIDELINES.md`.

---------------------------------------------------------



# Tasks
Below is a **ready‑to‑copy set of 10 story‑card prompts**—one for each task in Milestone 0.
Paste the relevant card into the chat with the specified **system prompt** to launch an agent.
*No additional decisions are left to the agent.*

---

## Milestone 0 – Detailed Task Cards

> **Branch naming**
> Use the branch given in each card. All branches fork from `feat/m00-bootstrap`.

---

### **TASK 0.1 – Repository skeleton & placeholder docs**

**Agent template:** `commands/docs_agent.md`
**Branch:** `feat/m00-structure`

```
You are working in branch feat/m00-structure.

Objective  
---------  
Create the entire folder tree and placeholder files that future tasks will fill. Do **not** add any code, config, or text beyond the exact placeholders listed below.

Step‑by‑step instructions  
1. Create directories (using `mkdir -p` or equivalent):  
   src/game  
   src/ui  
   src/hooks  
   src/types  
   src/pages  
   docs/prds  
   docs/tasks  
   commands  
   .github/workflows  
2. In every empty directory add a `.gitkeep` file to keep it in git.  
3. Add **empty** markdown files:  
   docs/DEVELOPMENT_GUIDELINES.md  
   docs/STYLE_GUIDE.md  
   docs/TESTING_GUIDELINES.md  
   docs/WORKFLOW.md  
   docs/tasks/TEMPLATE.md  
4. Add **empty** agent prompt files in `commands/`:  
   logic_agent.md  
   ui_agent.md  
   test_agent.md  
   docs_agent.md  
   ci_agent.md  
5. Stage, commit, push.  
   Commit message:  
   `chore(structure): add directory skeleton and placeholder docs`
```

**Acceptance criteria**

* Running `tree -I node_modules -L 2` shows the directories above.
* All listed `.md` files exist and are **zero bytes**.
* No other files added.

---

### **TASK 0.2 – Git repo initialise, .gitignore, README stub**

**Agent template:** `commands/logic_agent.md`
**Branch:** `feat/m00-git`

````
You are working in branch feat/m00-git.

Objective  
---------  
Initialise git (if not already) and create a robust `.gitignore` plus a minimal README.

Instructions  
1. If `.git` directory does not exist, run `git init`.  
2. Add `.gitignore` with entries for  
   - Node (dist, node_modules)  
   - macOS (`.DS_Store`)  
   - VS Code (`.vscode/`)  
   - Logs (`*.log`)  
3. Create `README.md` containing:  
   # Crew Mission Deep Sea (Web)  
   ## Prerequisites  
   * Node >= 18, Yarn 3 (berry)  
   ## Getting Started  
   ```bash  
   yarn install  
   yarn dev  
````

4. Stage, commit, push.
   Commit message:
   `docs(readme): add README and .gitignore`

```

**Acceptance criteria**  
* `git status` is clean after commit.  
* README renders correctly in GitHub preview.

---

### **TASK 0.3 – Add Yarn v3 (berry) and root package.json**

**Agent template:** `commands/logic_agent.md`  
**Branch:** `feat/m00-yarn`

```

You are working in branch feat/m00-yarn.

## Objective

Switch project to Yarn berry and add an initial `package.json` with scripts.

Instructions

1. Run `yarn set version berry` (creates `.yarn/releases/**`).
2. Add `.yarnrc.yml` with

   ```yml
   nodeLinker: node-modules  
   ```
3. Create `package.json` with:
   {
   "name": "crew-mission-deep-sea",
   "private": true,
   "version": "0.0.0",
   "scripts": {
   "dev": "vite",
   "build": "vite build",
   "test": "vitest run",
   "lint": "eslint . --ext .ts,.tsx"
   }
   }
4. Stage, commit, push.
   Commit message:
   `chore(tooling): enable Yarn berry and base scripts`

```

**Acceptance criteria**  
* `.yarn/releases` directory exists.  
* `yarn -v` prints a v3.x version when run locally (CI will verify).

---

### **TASK 0.4 – Install Vite + React + TypeScript scaffold**

**Agent template:** `commands/logic_agent.md`  
**Branch:** `feat/m00-vite`

```

You are working in branch feat/m00-vite.

## Objective

Create a minimal Vite React TypeScript app that compiles.

Instructions

1. Add dependencies
   yarn add react react-dom
   yarn add -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
2. Create `vite.config.ts` with react plugin.
3. In `index.html`, set root div with id "root".
4. Create files:
   src/main.tsx
   src/App.tsx
   src/index.css
   Content: main mounts <App />, App returns `<h1 className="text-2xl">Hello Vite</h1>`.
5. Update `package.json` `"type": "module"`.
6. Stage, commit, push.
   Commit message:
   `feat(vite): bootstrap React+TS app`

```

**Acceptance criteria**  
* `yarn dev` starts Vite, page shows “Hello Vite”.  
* No TypeScript errors.

---

### **TASK 0.5 – Configure Tailwind CSS (JIT)**

**Agent template:** `commands/ui_agent.md`  
**Branch:** `feat/m00-tailwind`

```

You are working in branch feat/m00-tailwind.

## Objective

Add Tailwind with JIT and demonstrate a utility class works.

Instructions

1. yarn add -D tailwindcss postcss autoprefixer
2. npx tailwindcss init -p
3. Configure `tailwind.config.ts` content paths:
   "./index.html", "./src/\*\*/\*.{ts,tsx}"
4. In `src/index.css` import Tailwind base, components, utilities.
5. Replace `<h1>` in App.tsx with Tailwind classes:
   `<h1 className="text-3xl font-bold text-teal-600">Hello Tailwind</h1>`
6. Stage, commit, push.
   Commit message:
   `feat(style): integrate Tailwind CSS`

```

**Acceptance criteria**  
* Browser text is teal and larger.  
* No PurgeCSS errors in console.

---

### **TASK 0.6 – Add Storybook 8**

**Agent template:** `commands/ui_agent.md`  
**Branch:** `feat/m00-storybook`

```

You are working in branch feat/m00-storybook.

## Objective

Set up Storybook (using Vite builder) with a single demo story.

Instructions

1. npx storybook\@latest init --builder @storybook/builder-vite --type react
2. Ensure `"storybook"` and `"storybook:build"` scripts are added to package.json.
3. Create `src/ui/Placeholder.tsx` that renders `<button className="btn">Hello</button>`.
4. Add `src/ui/Placeholder.stories.tsx` with default export title "UI/Placeholder".
5. Stage, commit, push.
   Commit message:
   `chore(storybook): bootstrap Storybook 8`

```

**Acceptance criteria**  
* `yarn storybook` opens and shows the “Placeholder” story.  
* No ESLint complaints.

---

### **TASK 0.7 – ESLint, Prettier, Husky + lint‑staged**

**Agent template:** `commands/logic_agent.md`  
**Branch:** `feat/m00-lint`

```

You are working in branch feat/m00-lint.

## Objective

Enforce code style automatically.

Instructions

1. yarn add -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser husky lint-staged
2. Create `.eslintrc.cjs` extending airbnb-typescript and prettier.
3. Add `.prettierrc` with trailingComma: "all".
4. Add `lint-staged.config.mjs` running eslint --fix and prettier --write.
5. Husky: `npx husky install`; add pre-commit to run lint‑staged.
6. Update `package.json` `"prepare": "husky install"`.
7. Stage, commit, push.
   Commit message:
   `chore(lint): add ESLint, Prettier, Husky`

```

**Acceptance criteria**  
* `yarn lint` exits 0.  
* Committing triggers husky (CI verifies).

---

### **TASK 0.8 – Integrate Vitest**

**Agent template:** `commands/test_agent.md`  
**Branch:** `feat/m00-vitest`

```

You are working in branch feat/m00-vitest.

## Objective

Set up Vitest with an empty passing test.

Instructions

1. yarn add -D vitest @testing-library/react @testing-library/jest-dom jsdom happy-dom
2. Create `vitest.config.ts` importing defineConfig with jsx: 'react'.
3. Add `src/__tests__/smoke.test.ts` containing `expect(true).toBe(true)`.
4. Ensure `package.json` "test" script is `vitest run --coverage`.
5. Stage, commit, push.
   Commit message:
   `test(setup): configure Vitest`

```

**Acceptance criteria**  
* `yarn test` passes with coverage report.  
* Coverage folder in .gitignore.

---

### **TASK 0.9 – GitHub Actions CI skeleton**

**Agent template:** `commands/ci_agent.md`  
**Branch:** `feat/m00-ci`

```

You are working in branch feat/m00-ci.

## Objective

Create CI workflow that installs, lints, tests on pull requests.

Instructions

1. Create `.github/workflows/ci.yml` with:
   name: CI
   on: \[push, pull\_request]
   jobs:
   build:
   runs-on: ubuntu-latest
   strategy:
   matrix: { node-version: \[18.x, 20.x] }
   steps:
   \- uses: actions/checkout\@v4
   \- uses: actions/setup-node\@v4
   with: { node-version: \${{ matrix.node-version }} }
   \- run: corepack enable
   \- run: yarn install --immutable
   \- run: yarn lint
   \- run: yarn test --coverage
2. Stage, commit, push.
   Commit message:
   `ci: add base GitHub Actions workflow`

```

**Acceptance criteria**  
* Workflow passes in GitHub on PR.  
* Uses both Node 18 & 20.

---

### **TASK 0.10 – Conventional Commits & CHANGELOG tooling**

**Agent template:** `commands/docs_agent.md`  
**Branch:** `feat/m00-changelog`

```

You are working in branch feat/m00-changelog.

## Objective

Enable automated changelog generation.

Instructions

1. yarn add -D @commitlint/config-conventional @commitlint/cli standard-version
2. Add `commitlint.config.cjs` extending `@commitlint/config-conventional`.
3. Husky hook: `.husky/commit-msg` running `npx --no-install commitlint --edit "$1"`.
4. Add npm script `"release": "standard-version"` to package.json.
5. Create empty `CHANGELOG.md` with heading.
6. Stage, commit, push.
   Commit message:
   `chore(release): setup commitlint and standard-version`

```

**Acceptance criteria**  
* Committing with bad prefix fails locally.  
* Running `yarn release --dry-run` updates CHANGELOG.

---

### How to proceed

1. Merge **TASK 0.1** first.  
2. Open worktrees for each remaining branch and run tasks in any order, ensuring no shared file edits.  
3. Review & merge child branches into `feat/m00-bootstrap`; fast‑forward into `main` when CI is green.
```
