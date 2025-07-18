# Milestone 1 – Boardgame.io Scaffold & Core UI Shell

### Objective

Stand up a running multiplayer skeleton: a Boardgame.io server, a Vite‑served React
client that can connect to a single hard‑coded game room, and two stub UI components
(`PlayerSeat`, `Card`) visible in Storybook.

### Success Criteria

- `yarn dev` starts **both** the Vite client (port 5173) and a Boardgame.io Node server (port 8000) via a single npm script.
- Visiting http://localhost:5173 shows “Waiting for other players…”.
- Storybook (`yarn storybook`) lists “UI/PlayerSeat” and “UI/Card” stories.
- Unit test verifies the client can connect and receive initial game state.
- No ESLint or TypeScript errors; CI passes.

### Out of Scope

- Real game rules or reducers beyond an empty `moves: {}` placeholder.
- Styling beyond minimal Tailwind utility usage.
- Persistence, tasks, or lobby screens.
