# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digital version of the cooperative card game "The Crew: Mission Deep Sea" built with TypeScript, React, and boardgame.io.

## Commands

### Development

- `yarn install` - Install dependencies using Yarn Berry (v3)
- `yarn dev` - Start Vite dev server
- `yarn build` - Build for production
- `yarn preview` - Preview production build on port 4173

### Testing & Quality

- `yarn test` - Run Vitest tests with coverage
- `yarn lint` - Run ESLint on .ts/.tsx files
- `yarn storybook` - Launch Storybook UI component viewer
- `yarn storybook:build` - Build static Storybook

### Release & Commits

- `yarn release` - Generate changelog via standard-version
- Commits must follow conventional format: `feat:`, `fix:`, `test:`, `chore:`, `docs:`
- Pre-commit hooks run via Husky (lint-staged)

## Architecture

### Tech Stack

- **Language:** TypeScript 5.x
- **UI Framework:** React 18 with hooks (no class components)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with JIT mode
- **Testing:** Vitest (unit), Storybook (component), Cypress (E2E after Milestone 4)
- **State Management:** boardgame.io for game logic, zustand for UI-only state
- **Package Manager:** Yarn Berry (v4) with node-modules linker

### Directory Structure

```
src/
  game/      # boardgame.io reducers and game logic
  ui/        # React components (atomic design pattern)
  hooks/     # Custom React hooks
  types/     # TypeScript type definitions
  pages/     # Page-level components
```

### Branching Strategy

- **Main branch:** `main` - always deployable
- **Milestones:** Parent branches like `feat/m03-trick-engine`
- **Tasks:** Child branches like `feat/m03-logic`, merged to parent milestone branch
- PRs target parent milestone branch, then fast-forward to main when all green
- The main branch is called "master"

### Code Quality Requirements

- ESLint with airbnb-typescript config
- Prettier formatting on commit
- Coverage targets: 90% for `src/game`, 90% for UI components
- All PRs must pass `yarn test` and `yarn lint`
- Update CHANGELOG.md for releases

## Key Development Patterns

- Use function components with hooks (no class components)
- Prefer `type` over `interface` unless extending
- Use `readonly` for immutable game state fields
- Component naming: PascalCase (e.g., `TaskCard`, `PlayerSeat`)
- Hook naming: camelCase with "use" prefix (e.g., `useTrickWinner`)
- Test files: `*.test.tsx`, Story files: `*.stories.tsx`
- Keep JSDoc comments brief (max 4 lines)

## Important Notes

- Designed to be built primarily by AI agents with minimal manual intervention
- Use the Task tool to delegate work to sub-agents
- Try using tools for finding and searching the codebase before resorting to using `find` and `grep` in Bash.
