# Task List – Milestone 0

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

