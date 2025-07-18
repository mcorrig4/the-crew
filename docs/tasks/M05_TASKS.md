# Task List – Milestone 5

---

### TASK 5.0 – Create feature branch

**Agent template:** /docs_agent  
**Branch:** feat/m05-task-easy

```

Objective: create branch off master and commit empty start marker.

```bash
git checkout master
git pull
git checkout -b feat/m05-task-easy
git commit --allow-empty -m "chore(m05): begin easy task engine"
```

---

### TASK 5.1 – Define Task types & catalog

**Agent:** /logic\_agent

1. In `src/types/Task.ts` define:

   ```ts
   export type EasyTaskKind = 'WinSpecificCard' | 'WinExactlyNTricks' | 'WinFirstTrick';

   export interface TaskCardBase { id: string; kind: EasyTaskKind }
   export interface WinSpecificCard extends TaskCardBase { kind: 'WinSpecificCard'; card: Card }
   export interface WinExactlyNTricks extends TaskCardBase { kind: 'WinExactlyNTricks'; count: number }
   export interface WinFirstTrick extends TaskCardBase { kind: 'WinFirstTrick' }

   export type TaskCard = WinSpecificCard | WinExactlyNTricks | WinFirstTrick;

   export interface TaskInstance extends TaskCard {
     status: 'pending' | 'done' | 'failed';
     progress?: number
   }
   ```

2. Add `assets/tasks-easy.json` with \~12 examples (4 of each type).

3. Unit test: JSON loads, all IDs unique.

Commit message: `feat(task): define easy task types and catalog`.

---

### TASK 5.2 – Auto‑assign tasks in setup

**Agent:** /logic\_agent

1. In `server/index.ts` `setup`:

   * Load catalog JSON (import assertion).
   * Shuffle and assign **one task per player** (`G.players[id].tasks`).

2. Captain keeps first task in array for now.

3. Update existing setup tests for new property.

Commit: `feat(setup): auto‑assign one easy task per player`.

---

### TASK 5.3 – Implement task evaluators

**Agent:** /logic\_agent

1. `src/game/taskEvaluators.ts` export `evaluateTasks(G, ctx, trickWinnerID, trickCards)`.

2. Rules:

   * **WinSpecificCard** – mark `done` if winner owns task and trick contains card; mark `failed` if anyone else wins that card.
   * **WinExactlyNTricks** – increment `progress`; after hand ends, mark `done` if progress === N else `failed`.
   * **WinFirstTrick** – after first trick only: winner with task → `done`; others with task → `failed`.

3. Call `evaluateTasks` inside `endTrick` (Milestone 3) before checking game‑over.

4. Unit tests per rule.

Commit: `feat(task): evaluators for easy tasks`.

---

### TASK 5.4 – Game‑over conditions

**Agent:** /logic\_agent

1. After `evaluateTasks`, if any `failed` → `ctx.events.endGame({ success: false })`.

2. If all tasks `done` → `endGame({ success: true })`.

3. Update integration test to simulate success scenario.

Commit: `feat(gameover): end game on task success/failure`.

---

### TASK 5.5 – TaskPanel UI

**Agent:** /ui\_agent

1. `src/ui/TaskPanel.tsx` props `{ tasks: TaskInstance[] }`.

2. Render list with badge colours: grey pending, green done, red failed.

3. Storybook stories: pending set, one done, one failed.

4. Integrate into bottom area of `App.tsx` for local player.

Commit: `feat(ui): TaskPanel component and integration`.

---

### TASK 5.6 – Component test: TaskPanel colours

**Agent:** /test\_agent

1. Verify correct badge class for each status.

2. Click‑through not required.

Commit: `test(ui): TaskPanel status colours`.

---

### TASK 5.7 – README & docs update

**Agent:** /docs\_agent

1. Add section “Easy Task Mission” with explanation of three task types and auto‑assignment.

2. Update PRD list in ROADMAP if you keep one.

Commit: `docs(m05): document easy tasks`.

---

### TASK 5.8 – CI check

**Agent:** /ci\_agent

1. Ensure importing JSON doesn’t break build (add `resolve.json` to tsconfig if needed).

2. Adjust coverage gate only if absolutely necessary.

Commit (if any): `ci: support JSON imports`.

---

### TASK 5.9 – Open PR into master

**Agent:** /docs\_agent

```bash
gh pr create --base master --head feat/m05-task-easy \
  --title "Milestone 5 – Easy Task Engine" \
  --body "Adds first three task types, evaluators, TaskPanel UI and game‑over logic."
```

Ensure CI green.

---

## Manual‑testing checklist after M05

1. `yarn dev` → open tabs `?p=0…3`.
2. Each seat shows **one task** in its panel.
3. Play tricks attempting to satisfy tasks:

   * If you have “WinFirstTrick”, ensure you win it.
   * Observe TaskPanel badge turns green or red instantly.
4. When all tasks green → game ends; browser shows BGIO “Game Over” overlay (Success).
5. Any red badge ends game with failure.

Enjoy your first **co‑operative** digital mission! Ping me for tweaks or the next milestone.
