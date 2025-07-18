# Milestone 5 – Easy Task Engine

### Objective
Introduce a minimal but functional task system covering the three simplest
task cards so you can start playing cooperative missions:

1. **WinSpecificCard** – “Win the trick containing [suit][value]”.
2. **WinExactlyNTricks** – “Win exactly N tricks”.
3. **WinFirstTrick** – “Win the very first trick”.

Tasks are auto‑assigned (no drafting yet) and difficulty value is ignored.

### Success Criteria
* New `TaskCard` type and a JSON catalog `assets/tasks-easy.json`.
* `G.players[id].tasks: TaskInstance[]` each with `status: "pending" | "done" | "failed"`.
* After every trick, helper `evaluateTasks` updates task statuses.
* Game ends **success** when all tasks `done`; **failure** immediately when any task `failed`.
* React `TaskPanel` shows your tasks with coloured status badges.
* Storybook stories for TaskCard rendering.
* Unit tests for each task evaluator.
* All scripts & CI green.

### Out of Scope
* Task difficulty scaling, advanced task types, task drafting UI.
