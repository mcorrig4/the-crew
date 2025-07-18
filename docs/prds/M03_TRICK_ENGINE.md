# Milestone 3 – Core Trick Engine

* **TASK 3.0** creates the feature branch `feat/m03-trick-engine` off **master**.
* **TASK 3.last** opens a PR back into **master**.
* Every card explicitly tells the agent to **run & validate** (`yarn dev / lint / test`) before considering the task done.

> **Folder & command conventions** below match your current repo layout
> (`.claude/commands/agents/*`, `docs/guidelines/*`, etc.).

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
