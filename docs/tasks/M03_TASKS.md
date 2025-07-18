Here is the **complete Milestone 3 package**—one mini‑PRD plus fully‑specified task cards.
Follow the same pattern you used for earlier milestones:

* **TASK 3.0** creates the feature branch `feat/m03-trick-engine` off **master**.
* **TASK 3.last** opens a PR back into **master**.
* Every card explicitly tells the agent to **run & validate** (`yarn dev / lint / test`) before considering the task done.

> **Folder & command conventions** below match your current repo layout
> (`.claude/commands/agents/*`, `docs/guidelines/*`, etc.).

---

## 1 • Mini‑PRD  `docs/prds/M03_TRICK_ENGINE.md`

````md
# Milestone 3 – Core Trick Engine

### Objective
Implement the authoritative rules for playing cards, enforcing follow‑suit
and submarine‑trump logic, determining trick winners, rotating the leader,
and recording trick history.  No face‑up UI yet; logic only.

### Success Criteria
* New `G` keys exist:
  ```ts
  trick: { leader: PlayerID; plays: { [id]: Card } }
  trickHistory: { leader: PlayerID; winner: PlayerID; cards: Card[] }[]
  cardsPlayed: number   // counts cards played this hand
````

* **Guard** `canPlayCard(G, ctx, card, playerID)` prevents illegal plays:

  * Must follow suit if player holds that suit.
  * Submarine cards (trumps) can always be played if no card of led suit.
* **Move** `playCard(cardIdx)`:

  1. Validates via guard.
  2. Adds card to `trick.plays`.
  3. When `plays` length === playerCount **or** all players have exhausted their hands for this round, calls `endTrick`.
* **endTrick** helper:

  * Determines winner (highest submarine; else highest of led suit).
  * Pushes entry to `trickHistory`.
  * Sets `trick.leader = winner` and clears `plays`.
  * Increments `cardsPlayed`.
* For 3‑player remainder case the loop ends after 13 completed tricks (39 cards).
* Unit tests cover:

  * Follow‑suit validation edge cases.
  * Trick winner for non‑trump and trump scenarios.
  * Full play flow of one trick with 4 players.
* All tests, lint, Storybook and CI remain green.

### Out of Scope

* Rendering face‑up cards or drag‑and‑drop UI (that is Milestone 4).
* Tasks, communication tokens, distress signal.

````

---

## 2 • Task Cards  `docs/tasks/M03_TASKS.md`

```md
# Task List – Milestone 3

---

### TASK 3.0 – Create feature branch

**Agent template:** /docs_agent  
**Branch:** feat/m03-trick-engine

````

## Objective

Create branch `feat/m03-trick-engine` off master and commit a start marker.

Steps
1\.

```bash
git checkout master
git pull
git checkout -b feat/m03-trick-engine
echo "" > .branch-m03-placeholder
git add .branch-m03-placeholder
git commit -m "chore(m03): start trick engine milestone"
```

Validation

* `git branch --show-current` prints `feat/m03-trick-engine`.

```

---

### TASK 3.1 – Define Trick‑state types

**Agent template:** /logic_agent  

```

⚠️  Run `yarn lint && yarn test` before finishing.

## Objective

Add TypeScript types representing trick state and update `src/types/` exports.

Steps

1. In `src/types/Trick.ts` export:

   ```ts
   export interface TrickPlays { [playerID: string]: Card }
   export interface Trick { leader: string; plays: TrickPlays }
   export interface TrickRecord { leader: string; winner: string; cards: Card[] }
   ```
2. Re‑export these from `src/types/index.ts` if you have a barrel file.
3. Commit message:
   `feat(trick): add Trick and TrickRecord types`

```

---

### TASK 3.2 – Follow‑suit guard `canPlayCard`

**Agent template:** /logic_agent  

```

Remember to add tests and validate.

## Objective

Implement guard enforcing follow‑suit & trump rules.

Steps

1. Create `src/game/guards.ts` exporting:

   ```ts
   export function canPlayCard(G: State, playerID: string, card: Card): boolean
   ```
2. Logic:

   * If `G.trick.plays` is empty → always true (card leads).
   * Else determine led suit (first card).

     * If player holds at least one card of led suit, allow only that suit.
     * Otherwise any suit allowed.
3. Unit tests `guards.test.ts` with 3 scenarios.
4. Commit msg:
   `feat(guard): enforce follow-suit and trump rules`

```

---

### TASK 3.3 – Helper `getTrickWinner`

**Agent template:** /logic_agent  

```

Run unit tests thoroughly.

## Objective

Resolve winner of a completed trick.

Steps

1. In `src/game/winner.ts` implement:

   ```ts
   export function getTrickWinner(plays: TrickPlays): string
   ```

   Algorithm:

   * If any submarine cards, highest value submarine wins.
   * Else highest value of led suit wins.
2. Tests `winner.test.ts` covering:

   * All same suit.
   * Mixed suits without submarine.
   * One and multiple trumps.
3. Commit msg:
   `feat(winner): compute trick winner considering trump`

```

---

### TASK 3.4 – Move `playCard` & `endTrick` integration

**Agent template:** /logic_agent  

```

Run `yarn dev`, play through console to ensure no runtime errors.

## Objective

Wire guard and winner helper into game moves.

Steps

1. In `server/index.ts` (or separate moves file) add to `CrewGame`:

   ```ts
   moves: {
     playCard: {
       move(G, ctx, cardIdx) { /* ... */ },
       client: false,
     },
   }
   ```
2. Inside move:

   * Validate with `canPlayCard` else return INVALID\_MOVE.
   * Push card to `G.trick.plays`.
   * When plays length equals `ctx.numPlayers` OR
     `G.cardsPlayed === (ctx.numPlayers === 3 ? 39 : 40) - ctx.numPlayers`
     call `endTrick`.
3. Implement `endTrick(G, ctx)` in same file or helper.
4. Increment `G.cardsPlayed`.
5. Commit msg:
   `feat(move): playCard move and endTrick logic`

```

---

### TASK 3.5 – Integration tests for full trick flow

**Agent template:** /test_agent  

```

Ensure coverage stays above 80 % for src/game.

## Objective

Test that a trick played with legal cards records winner and rotates leader.

Steps

1. `src/game/__tests__/playCard.test.ts`

   * Mock ctx for 4 players.
   * Simulate dealing, set hands, run `playCard` four times.
   * Assert `G.trickHistory.length === 1`, winner correct, leader updated.
2. Commit msg:
   `test(trick): integration test for one full trick`

```

---

### TASK 3.6 – README & docs update

**Agent template:** /docs_agent  

```

Render README on GitHub after commit.

## Objective

Document new “How tricks work (backend)” section.

Steps

1. In `README.md` add diagram or bullet list of trick lifecycle.
2. Update `/docs/guidelines/WORKFLOW.md` if any step changed.
3. Commit msg:
   `docs(trick): explain trick lifecycle`

```

---

### TASK 3.7 – CI verification or tweak coverage gate

**Agent template:** /ci_agent  

```

Run `yarn test --coverage` locally first.

## Objective

Ensure pipeline passes with new tests; adjust threshold if strictly necessary.

Steps

1. If coverage dropped below gate, raise tests not gate.
2. Only edit `.github/workflows/ci.yml` if unavoidable.
3. Commit msg (if anything changed):
   `ci: keep pipeline green after trick engine`

```

---

### TASK 3.8 – Open PR into master

**Agent template:** /docs_agent  

```

## Objective

Create pull request for milestone 3.

Steps

1. Ensure branch pushed, CI green locally.
2.

```bash
gh pr create --base master --head feat/m03-trick-engine \
  --title "Milestone 3 – Core Trick Engine" \
  --body "Adds follow‑suit guard, playCard move, trick winner logic and tests."
```

3. Verify PR checks pass.

Validation

* PR visible on GitHub with all checks green.

```

---

### Parallel‑execution hint
Start tasks 3.1 – 3.3 in parallel (they touch separate files).  
Only begin 3.4 once those helpers are merged.  
Docs and CI tasks wait until logic & tests compile.

Happy coding—let me know if you want any scope tweaks before dispatching the agents!
