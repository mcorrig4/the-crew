# Testing Guidelines

## 1. Unit tests (Vitest)
* One assertion block per logical branch.
* Avoid snapshot tests for game logic—assert explicit values.

## 2. Component tests
* Use Storybook stories as fixtures.
* Test only public behaviour (aria labels, visible text).

## 3. End‑to‑end (Cypress)
* Live server spun up on port 4173 (`yarn preview`).
* E2E runs in CI after Milestone 4.

## 4. Coverage
* `vitest --coverage` must stay ≥ targets in DEVELOPMENT_GUIDELINES.md.
* Coverage gate enforced in CI; below target = red build.
