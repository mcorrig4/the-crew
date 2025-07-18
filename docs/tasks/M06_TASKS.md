# Task List – Milestone 6

---

### TASK 6.0 – Create feature branch

**Agent:** /docs_agent  
**Branch:** feat/m06-task-draft

```bash
git checkout master
git pull
git checkout -b feat/m06-task-draft
git commit --allow-empty -m "chore(m06): start task draft milestone"
````

---

### TASK 6.1 – Add difficulty map to TaskCard

**Agent:** /logic\_agent

* Extend `TaskCard` definition in `src/types/Task.ts`:

  ```ts
  diff: { 3: number; 4: number; 5: number };
  ```

* Update `assets/tasks-easy.json` adding dummy difficulty values
  (use rulebook values where known, else `1`).

* Adjust existing unit tests.

Commit: `feat(task): include difficulty by player count`.

---

### TASK 6.2 – Draw‑until‑sum algorithm

**Agent:** /logic\_agent

1. In `src/game/taskSetup.ts` create:

   ```ts
   export function drawTasksForMission(deck: TaskCard[], playerCount: 3|4|5, target: number): TaskCard[]
   ```

   *Shuffle deck*, draw cards while `runningSum + card.diff[playerCount] ≤ target`.

2. Unit test draws reach exact target without overshoot.

Commit: `feat(setup): draw tasks matching mission difficulty`.

---

### TASK 6.3 – Introduce `"TASK_DRAFT"` phase & moves

**Agent:** /logic\_agent

1. Add enum or const for phases.

2. Extend `CrewGame.setup()`:

   * Create `G.tableTasks` from helper above.
   * Set `ctx.events.setPhase('TASK_DRAFT')`.

3. Implement moves in `src/game/moves/draft.ts`:

   * `takeTask(taskID)`
   * `passDraft()`

4. Guards:

   * Only current player can act.
   * `passDraft` allowed when `tableTasks.length < ctx.numPlayers`.

5. When `tableTasks` empty, `ctx.events.setPhase('PLAY')`.

Unit tests cover illegal/ legal passes.

Commit: `feat(phase): implement TASK_DRAFT moves and phase transition`.

---

### TASK 6.4 – DraftBoard UI

**Agent:** /ui\_agent

1. `src/ui/DraftBoard.tsx` props:

   ```ts
   { tableTasks: TaskCard[]; currentPlayer: string; onTake(taskID): void; onPass(): void; canPass: boolean }
   ```

2. Render cards with difficulty badge; clickable only if it’s your turn.

3. Show disabled “Pass” button unless `canPass`.

4. Storybook: default with 3 tasks, currentPlayer seat 0.

Commit: `feat(ui): DraftBoard component`.

---

### TASK 6.5 – Integrate DraftBoard into App

**Agent:** /ui\_agent

1. In board component, when `ctx.phase === 'TASK_DRAFT'`:

   * Hide Hand/TrickPile.
   * Show `DraftBoard` centred.

2. Wire callbacks to moves.

3. Render task panel only after draft ends.

Commit: `feat(ui): wire DraftBoard into game flow`.

---

### TASK 6.6 – End‑to‑end draft test

**Agent:** /test\_agent

1. Simulate setup for 4 players, phase `TASK_DRAFT`.

2. Call moves in seating order until draft done.

3. Assert:

   * Each player has ≥1 task.
   * Phase becomes `"PLAY"`.

Commit: `test(draft): e2e draft flow`.

---

### TASK 6.7 – Docs & README update

**Agent:** /docs\_agent

* Add subsection “Task Draft Phase” explaining take/pass rule.

Commit: `docs(m06): add task draft docs`.

---

### TASK 6.8 – CI pipeline check

**Agent:** /ci\_agent

* Ensure new JSON import or phase enum doesn’t break build; fix coverage gate only if required.

Commit (if any): `ci: keep pipeline green after draft phase`.

---

### TASK 6.9 – Open PR into master

**Agent:** /docs\_agent

```bash
gh pr create --base master --head feat/m06-task-draft \
  --title "Milestone 6 – Task Draft Phase & Difficulty Scaling" \
  --body "Implements draw‑to‑difficulty, clockwise task draft with take/pass moves, DraftBoard UI and tests."
```

---

## Manual‑testing checklist after M06

1. `yarn dev`, open four tabs (`?p=0–3`).
2. You should immediately land in a **Draft Board** view with
   2‑3 task cards on the table (sum equals mission difficulty).
3. Captain’s tab (`⚓︎`) is first to act:

   * Click a task → it disappears from table and shows in TaskPanel.
4. Next seat’s tab becomes active, border highlight moves.
5. When tasks remaining < players, “Pass” button appears; click Pass
   simply ends your turn.
6. After last task is taken, view switches to familiar Hand/TrickPile UI.
7. Play the hand – tasks behave exactly as in Milestone 5.

If all that works without console errors and tasks distribute correctly,
Milestone 6 is good to merge!
