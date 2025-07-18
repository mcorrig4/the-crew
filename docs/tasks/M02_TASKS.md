Below is the **complete Milestone 2 package**—PRD plus fully‑specified task cards.
All tasks explicitly:

* **Start by creating the branch** `feat/m02-deck-dealing` off `master` (task 2.0).
* **End by opening a pull‑request into `master`** (task 2.last).
* **Remind the agent to run & validate** before proceeding.

Copy these markdown blocks into the repo, then launch each task with your slash‑command system.

---

## `docs/prds/M02_DECK_AND_DEALING.md`

````md
# Milestone 2 – Deck Generation, Dealing & Captain Detection

### Objective
Implement the game‐setup logic so that, when a match starts, each player
receives the correct hand of cards, the remainder‑card rule for 3‑player
games is honoured, and the **captain** (holder of submarine 4) is stored
in game state and highlighted in the UI.

### Success Criteria
* `CrewGame.setup()` returns an object:
  ```ts
  {
    players: { [id]: { hand: Card[] } },
    deck: Card[],          // empty unless 3‑player
    captain: PlayerID,     // id of sub 4 holder
  }
````

* For 4–5 players: every hand has 10 or 8 cards respectively; `deck` length === 0.
  For 3 players: two players have 13 cards, one has 14; `deck.length === 0`.
* The React client shows, for each seat, a **card‑back counter** (not faces).
* Storybook displays the `CardBackCount` component in isolation.
* Unit tests cover:

  * `createDeck()` returns 40 unique cards.
  * Dealing results satisfy counts for 3, 4, 5 players.
  * `detectCaptain()` returns correct playerID.
* `yarn dev`, `yarn test`, `yarn lint`, `yarn storybook` all run without errors; CI green.

### Out of Scope

* Task cards, communication, or trick play.

````

---

## `docs/tasks/M02_TASKS.md`

```md
# Task List – Milestone 2

---

### TASK 2.0 – Create feature branch

**Agent template:** /docs_agent  
**Branch to create:** feat/m02-deck-dealing

````

## Objective

Create a new branch off **master** named `feat/m02-deck-dealing`.

Steps

1. From local master:

   ```bash
   git checkout master
   git pull
   git checkout -b feat/m02-deck-dealing
   ```
2. Commit an empty “branch start” commit:
   `chore(m02): start deck & dealing milestone`

Validation

* `git branch --show-current` prints `feat/m02-deck-dealing`.

```

---

### TASK 2.1 – Card type & deck generator

**Agent template:** /logic_agent  

```

Reminder: **run `yarn lint && yarn test` before marking complete**.

## Objective

Add a `Card` type and a pure `createDeck()` function returning 40 unique cards.

Steps

1. In `src/types/Card.ts`, export

   ```ts
   export type Suit = 'pink' | 'blue' | 'yellow' | 'green' | 'sub';
   export interface Card { suit: Suit; value: number } // value 1‑9, sub 1‑4
   ```
2. In `src/game/deck.ts`, implement and export `createDeck(): Card[]`.
3. Unit test in `src/game/__tests__/deck.test.ts`:

   * length === 40
   * all values unique `(suit,value)` pairs
   * contains four submarine cards.
4. Commit message:
   `feat(deck): add Card type and createDeck util`

```

---

### TASK 2.2 – Dealing utility with remainder rule

**Agent template:** /logic_agent  

```

Run `yarn test` after coding.

## Objective

Create `dealCards(players: number, deck: Card[]): Card[][]`.

Steps

1. Shuffle deck with `immerShuffle` (already in boardgame.io deps) or Fisher‑Yates.
2. For `players === 3` deal 14 to seat 0, 13 to seats 1 & 2.
   For 4 players: 10 each.
   For 5 players: 8 each.
3. Return array of hands in seating order.
4. Unit test `dealCards` for 3, 4, 5 players correctness.
5. Commit message:
   `feat(deal): implement dealing with remainder rule`

```

---

### TASK 2.3 – Captain detection helper

**Agent template:** /logic_agent  

```

Ensure tests pass before commit.

## Objective

Add `detectCaptain(hands: Card[][]): number` returning index of player holding submarine 4.

Steps

1. Implement in `src/game/setupHelpers.ts`.
2. Unit test with synthetic hands.
3. Commit msg:
   `feat(captain): helper to find captain player`

```

---

### TASK 2.4 – Wire helpers into `CrewGame.setup`

**Agent template:** /logic_agent  

```

Validate with `yarn dev` and open browser.

## Objective

Modify `server/index.ts` to import helpers and create initial G state.

Steps

1. Inside `setup`, call `createDeck`, `dealCards`, `detectCaptain`.
2. Return state object as per PRD.
3. Export updated types if needed.
4. Commit msg:
   `feat(setup): generate hands and store captain`

```

---

### TASK 2.5 – UI card‑back counter component

**Agent template:** /ui_agent  

```

After coding, run `yarn storybook` and visually check.

## Objective

Display card counts per seat in the client and Storybook.

Steps

1. New component `src/ui/CardBackCount.tsx` props `{ count: number; isCaptain: boolean }`.

   * Show stacked card backs with count badge.
   * If `isCaptain`, add small anchor emoji ⚓️ beneath badge.
2. Storybook stories: default (`count: 10`), remainder (`count: 14`), captain variant.
3. Integrate into `PlayerSeat` (import above badge).
4. Update React client render to map over seats with counts from G.
5. Commit msg:
   `feat(ui): add CardBackCount and integrate into PlayerSeat`

```

---

### TASK 2.6 – Integration smoke test

**Agent template:** /test_agent  

```

Run `yarn test --coverage` and ensure green.

## Objective

Add an integration test ensuring `setup` plus helpers yields valid state.

Steps

1. `src/game/__tests__/setup.test.ts`

   * For 4 players, total 40 cards distributed.
   * Captain index is within 0‑3.
2. Ensure coverage > milestone‑1 baseline.
3. Commit msg:
   `test(setup): integration test for initial state`

```

---

### TASK 2.7 – README update for milestone 2

**Agent template:** /docs_agent  

```

Preview README in GitHub after commit.

## Objective

Document new captain icon and 3‑player remainder behaviour.

Steps

1. Append subsection “Gameplay Setup” explaining card counts and ⚓️ icon meaning.
2. Commit msg:
   `docs(readme): document deck & captain behaviour`

```

---

### TASK 2.8 – CI pipeline still green

**Agent template:** /ci_agent  

```

Must push only if CI finishes locally `yarn lint && yarn test`.

## Objective

Verify no pipeline update needed; if so, adjust test coverage gate.

Steps

1. Run CI locally (`act`) if installed; else trust GitHub.
2. If coverage threshold fails, update `ci.yml` to step `yarn test --coverage --run`.
3. Commit msg (only if changed):
   `ci: adjust coverage threshold for deck milestone`

```

---

### TASK 2.9 – Open PR into master

**Agent template:** /docs_agent  

```

Do **not** merge; just open PR.

## Objective

Create pull request from `feat/m02-deck-dealing` to `master`.

Steps

1. Push all commits if not already.
2. On GitHub CLI:

   ```bash
   gh pr create --base master --head feat/m02-deck-dealing \
     --title "Milestone 2 – Deck & Dealing" \
     --body "Implements card deck, dealing logic, captain detection and UI counters."
   ```
3. Ensure PR checks (CI) pass.

Validation

* PR visible on GitHub with green checks.

```

---

## Usage reminder

Dispatch each card with:

```

/logic\_agent "READ docs/tasks/M02\_TASKS.md until TASK 2.1 and implement it."

```

*(adjust agent & task number accordingly)*

Happy coding—let me know if anything needs refining before you unleash the agents!
