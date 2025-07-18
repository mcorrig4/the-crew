# Task List – Milestone 4

---

### TASK 4.0 – Create feature branch

**Agent template:** /docs_agent  
**Branch:** feat/m04-hand-play

```

## Objective

Fork branch `feat/m04-hand-play` off **master** and add start commit.

Steps

```bash
git checkout master
git pull
git checkout -b feat/m04-hand-play
git commit --allow-empty -m "chore(m04): begin visual hand milestone"
```

Validation

* `git branch --show-current` prints `feat/m04-hand-play`.

```

---

### TASK 4.1 – Finalise `Card` component visuals

**Agent template:** /ui_agent  

```

⚠️  After coding run `yarn storybook` and visually inspect.

## Objective

Upgrade skeleton `Card` component to full face visuals.

Steps

1. `src/ui/Card.tsx`

   * Large value top‑left & bottom‑right.
   * Suit colour background (Tailwind classes).
   * Conditional border when `isSelectable` and `isDisabled`.
2. Props now:

   ```ts
   { card: Card; selectable?: boolean; disabled?: boolean }
   ```
3. Update existing `Card` stories to show selectable + disabled states.
4. Commit msg:
   `feat(ui): full Card visuals with selectable/disabled props`

```

---

### TASK 4.2 – Build `Hand` component

**Agent template:** /ui_agent  

```

Run storybook & tests.

## Objective

Display player’s own hand horizontally sorted by suit, clickable cards.

Steps

1. `src/ui/Hand.tsx` props:

   ```ts
   { hand: Card[]; onPlay: (idx: number) => void; isActive: boolean }
   ```
2. Sort by suit then value.
3. Card onClick calls `onPlay(idx)` only if `isActive`.
4. Storybook: “Active hand” (10 cards, active) and “Inactive hand”.
5. Commit msg:
   `feat(ui): Hand component renders clickable cards`

```

---

### TASK 4.3 – Build `TrickPile` component

**Agent template:** /ui_agent  

```

Open Storybook after implementation.

## Objective

Show cards that have been played this trick.

Steps

1. `src/ui/TrickPile.tsx` props:

   ```ts
   { plays: { [id: string]: Card }, leader: string }
   ```
2. Render small rotated cards in play order; highlight leader seat (ring).
3. Storybook story with 3 sample plays.
4. Commit msg:
   `feat(ui): TrickPile component for current trick`

```

---

### TASK 4.4 – Wire UI into App with boardgame.io client

**Agent template:** /ui_agent  

```

Run `yarn dev` and manually play a few cards.

## Objective

Use Hand, PlayerSeat, TrickPile in the live client.

Steps

1. In `src/App.tsx` (or board page) :

   * Derive `playerID` from URL query `?p=` for quick testing (e.g., `?p=0`).
   * Use `boardgame.io/react` hooks to access `G`, `ctx`, and `moves.playCard`.
   * Render:

     * Opponent seats (top/left/right) with `CardBackCount`.
     * Center `TrickPile`.
     * Bottom `Hand` for self.
2. Disable Hand if `playerID !== ctx.currentPlayer`.
3. Commit msg:
   `feat(ui): integrate hand and trick pile into live game`

```

---

### TASK 4.5 – Component tests for click‑to‑play

**Agent template:** /test_agent  

```

Must keep coverage ≥ 80 % on src/ui and src/game.

## Objective

Ensure clicking a card triggers move only when active.

Steps

1. Mock boardgame.io `moves.playCard` using jest.fn().
2. Render Hand with `isActive: true`; simulate click; expect fn called.
3. With `isActive: false`, expect fn not called.
4. Commit msg:
   `test(ui): verify Hand click behaviour`

```

---

### TASK 4.6 – Update README and docs

**Agent template:** /docs_agent  

```

Preview README in GitHub.

## Objective

Document player setup URL param and new UI components.

Steps

1. README “Quick local multiplayer test” section:

   * Open two browser tabs `?p=0` and `?p=1`.
2. Brief description of Hand and TrickPile components in `docs/guidelines/STYLE_GUIDE.md`.
3. Commit msg:
   `docs(m04): add hand play instructions`

```

---

### TASK 4.7 – Ensure CI pipeline passes or adjust as needed

**Agent template:** /ci_agent  

```

Run full pipeline locally if possible (`act`).

## Objective

Keep CI green; update coverage gate only if necessary.

Steps

1. If new UI tests need jsdom, ensure `vitest.config.ts` `environment: 'jsdom'`.
2. Commit msg (if changed):
   `ci: update test environment for ui components`

```

---

### TASK 4.8 – Open PR into master

**Agent template:** /docs_agent  

```

## Objective

Create pull request for Milestone 4.

Steps

```bash
gh pr create --base master --head feat/m04-hand-play \
  --title "Milestone 4 – Visual Hand Play" \
  --body "Adds Card, Hand and TrickPile components with click‑to‑play wired to playCard move."
```

*Ensure CI checks pass before marking task complete.*

```

---

## Parallel‑execution hints
* UI tasks 4.1, 4.2, 4.3 can run in parallel.  
* Task 4.4 waits until those merge.  
* Tests, docs, CI tasks follow integration.

Dispatch each task via your slash‑command system, e.g.:

```

/ui\_agent "READ docs/tasks/M04\_TASKS.md until TASK 4.1 and implement."

```
