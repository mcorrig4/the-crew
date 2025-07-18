# Task List – Milestone 1

---

## TASK 1.1 – Add Boardgame.io dependencies & server entry‑point

**Agent template:** /logic_agent  
**Branch:** feat/m01-bgio-server

### Instructions

1. Run
   ```bash
   yarn add boardgame.io@^1.6 immer zustand
   yarn add -D ts-node concurrently
   ```
````

2. Create `server/index.ts` with:
   - Import `Server` from boardgame.io/server.
   - Export a dummy `Game`:

     ```ts
     export const CrewGame: Game = { name: 'crew', setup: () => ({}) };
     ```

   - Start a `Server({ games: [CrewGame], port: 8000 })`.

3. Add npm script to `package.json`
   `"server": "ts-node server/index.ts"`
4. Stage → commit → push
   _Commit msg:_ `feat(server): scaffold boardgame.io server`

### Acceptance

- Running `yarn server` prints “Serving boardgame.io on port 8000”.

---

## TASK 1.2 – Integrate dev proxy & combined `dev` script

**Agent template:** /logic_agent
**Branch:** feat/m01-dev-script

### Instructions

1. Install `concurrently` (`yarn add -D concurrently`).
2. Replace existing `dev` script with

   ```json
   "dev": "concurrently -k \"yarn vite\" \"yarn server\""
   ```

3. Add Vite proxy in `vite.config.ts`:

   ```ts
   server: { proxy: { '/socket.io': 'http://localhost:8000' } }
   ```

4. Stage → commit → push
   _Commit msg:_ `chore(dev): run client and server together`

### Acceptance

- `yarn dev` starts both processes; no port collision.

---

## TASK 1.3 – Basic Boardgame.io client wrapper

**Agent template:** /logic_agent
**Branch:** feat/m01-client-wrapper

### Instructions

1. Create `src/game/client.ts` which exports a `createClient()` function:

   ```ts
   import { Client } from 'boardgame.io/react';
   import { CrewGame } from '../../server/index';
   export const createClient = () =>
     Client({ game: CrewGame, multiplayer: { server: 'http://localhost:8000' } });
   ```

2. In `src/App.tsx` render `<GameClient />` displaying “Waiting for other players…” using Tailwind classes.
3. Stage → commit → push
   _Commit msg:_ `feat(client): connect React app to boardgame.io`

### Acceptance

- Browser console logs socket connection; page text visible.

---

## TASK 1.4 – `PlayerSeat` skeleton component

**Agent template:** /ui_agent
**Branch:** feat/m01-playerseat

### Instructions

1. Create `src/ui/PlayerSeat.tsx`: props `{ seat: number; isCurrent: boolean }`.
2. Render a rounded div with seat number and conditional background (`bg-teal-500` when current).
3. Storybook story “UI/PlayerSeat/Default” with seat 1 & `isCurrent: false` and “Current” variant.
4. Stage → commit → push
   _Commit msg:_ `feat(ui): add PlayerSeat component with stories`

### Acceptance

- Storybook shows both variants correctly coloured.

---

## TASK 1.5 – `Card` skeleton component

**Agent template:** /ui_agent
**Branch:** feat/m01-card

### Instructions

1. `src/ui/Card.tsx`: props `{ suit: 'pink'|'blue'|'yellow'|'green'|'sub'; value: number }`.
2. Use Tailwind border and colour ring (different ring per suit; placeholder mapping in component).
3. Storybook story with four example suits and value 5.
4. Stage → commit → push
   _Commit msg:_ `feat(ui): stub Card component and story`

### Acceptance

- Storybook grid shows four card examples.

---

## TASK 1.6 – Unit test: client connects

**Agent template:** /test_agent
**Branch:** feat/m01-connect-test

### Instructions

1. Add dev dependency `@vitest/web-environment`.
2. Create `src/game/__tests__/client.test.ts`:
   - Mock `socket.io-client` to avoid real network.
   - Import `createClient`, call it, and assert `client` instantiates without error.

3. Stage → commit → push
   _Commit msg:_ `test(client): ensure boardgame.io client instantiation`

### Acceptance

- `yarn test` passes; coverage unaffected.

---

## TASK 1.7 – README dev‑server section

**Agent template:** /docs_agent
**Branch:** feat/m01-readme-update

### Instructions

1. Append to root `README.md` the section:

   ### Running the Dev Stack

   ```bash
   yarn dev  # starts Vite (5173) + boardgame.io server (8000)
   open http://localhost:5173
   ```

2. Stage → commit → push
   _Commit msg:_ `docs(readme): add dev stack instructions`

### Acceptance

- README renders with code block.

---

## TASK 1.8 – CI matrix update for server build

**Agent template:** /ci_agent
**Branch:** feat/m01-ci-update

### Instructions

1. Edit `.github/workflows/ci.yml`:
   - Add step `yarn server &` **before** `yarn test` to ensure server compiles.
   - Ensure job kills background server after tests (use `|| true`).

2. Stage → commit → push
   _Commit msg:_ `ci: include server build in CI pipeline`

### Acceptance

- CI still green on PR, both Node versions.

---

### Parallelisation note

_Start TASK 1.1 first._
TASK 1.2 & 1.3 depend on it; UI tasks 1.4–1.5 are independent once 1.3’s file paths exist.
Merge order: logic branches → UI branches → test branch → docs / CI.

```

---

### Next steps for you

1. **Add the PRD and tasks** files to the repo (`git add`, commit on `feat/m01-bootstrap`).
2. Kick off each task via your slash‑command system, e.g.

```

/logic_agent "READ docs/tasks/M01_TASKS.md until TASK 1.1 and implement it."

```

3. Review PRs, merge into `feat/m01-bootstrap`, then fast‑forward into `main` when CI passes.

Happy building—ping me if anything needs tweaking!

