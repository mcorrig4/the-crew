# Development Guidelines

These rules apply to **every contributor and LLM coding agent**.

## 1. Branching model  
* **Main branch:** `main` – always deployable.  
* **Milestones:** one parent branch per milestone, e.g. `feat/m03-trick-engine`.  
* **Parallel worktrees (Option B)**  
  - Spawn child branches such as `feat/m03-logic`, `feat/m03-ui`, `feat/m03-tests`.  
  - Merge child PRs *into the parent milestone branch*; when green, fast‑forward parent to `main`.  
* If work‑tree coordination becomes painful, we will fall back to a linear model (Option A).

## 2. Task workflow  
1. **Mini‑PRD** (≤ 1 page) defines scope, acceptance criteria, out‑of‑scope.  
2. Break into **~1‑point tasks** (~1–2 human hours).  
3. Assign each task to the appropriate agent via the role prompt template.  
4. Agent opens a draft PR targeting its child branch.  
5. Human (you) or a review agent merges when CI is green.

## 3. Code style  
* **Language:** TypeScript 5.x, React 18, Tailwind CSS.  
* **Lint:** ESLint (`eslint-config-airbnb-typescript` base).  
* **Format:** Prettier (`--write` on commit via lint‑staged).  
* **File layout**
```

src/
game/         // boardgame.io reducers, helpers
ui/           // React components (atomic design)
hooks/
types/
pages/

```

## 4. Testing  
* **Unit:** Vitest + jsdom.  
* **Component:** Storybook 8 stories + @storybook/testing‑react.  
* **End‑to‑end:** Cypress after Milestone 4.  
* **Coverage target:** 80 % lines for `src/game`, 70 % for UI.

## 5. Commit rules  
* Conventional commits (`feat:`, `fix:`, `test:` …).  
* Every PR must:  
- Pass `yarn test` and `yarn lint`  
- Publish a Storybook build (if UI changed)  
- Update CHANGELOG.md via `yarn changelog` script.

## 6. Documentation  
* Keep docs concise; one Markdown file per topic in `/docs`.  
* Update diagrams using Excalidraw and save the `.excalidraw` source alongside the exported PNG.
