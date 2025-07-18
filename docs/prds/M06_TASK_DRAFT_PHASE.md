# Milestone 6 – Task Draft Phase & Difficulty Scaling

### Objective
Replace auto‑assignment with the authentic *draft* flow:

1. At setup, draw task cards from the task deck until the **sum of their
   difficulty values equals the mission’s difficulty rating** for the current
   player count (3/4/5).
2. Enter a new game phase `"TASK_DRAFT"`.
3. Starting with the captain and going clockwise, each player **takes one task
   card face‑up from the table**.  When the number of remaining table tasks
   drops below the number of players, a player may choose **Pass** instead.
4. Draft ends when all table tasks are taken; game proceeds to `"PLAY"`.
5. Task difficulty values are now rendered in the UI.

### Success Criteria
* `TaskCard` now includes difficulty triplet, e.g. `{ diff: {3:4,4:2,5:2} }`.
* New `G.tableTasks: TaskCard[]` holds undrafted tasks during the phase.
* New game phase `"TASK_DRAFT"` implemented via `ctx.events.setPhase()`.
* New moves:
  * `takeTask(taskID)` – transfers task to `players[current].tasks`,
    removes from `tableTasks`.
  * `passDraft()` – allowed only when `tableTasks.length < ctx.numPlayers`.
* Phase auto‑advances to `"PLAY"` when `tableTasks` is empty.
* UI “DraftBoard” shows table tasks, highlights current drafter,
  disables clicks when it’s not your turn.
* Unit tests:
  * Sum‑to‑difficulty algorithm for 3/4/5 players.
  * Guard: `passDraft` illegal unless fewer tasks than players.
  * Full round‑robin draft ends with correct task counts per player.
* Storybook story for `DraftBoard`.
* All scripts & CI remain green.
