# Task List – Milestone 7

---

### TASK 7.0 – Create feature branch

**Agent:** /docs_agent  
**Branch:** feat/m07-communication

```bash
git checkout master
git pull
git checkout -b feat/m07-communication
git commit --allow-empty -m "chore(m07): start communication system milestone"
````

---

### TASK 7.1 – Extend player state & types

**Agent:** /logic\_agent

1. In `src/types/PlayerState.ts` add:

   ```ts
   export interface Communication {
     card: Card;
     position: 'top' | 'mid' | 'bot';
   }

   sonarUsed: boolean;
   communication?: Communication;
   ```

2. Update any state initialisation.

Commit: `feat(player): add sonarUsed and communication fields`.

---

### TASK 7.2 – Implement PRE\_PLAY phase & moves

**Agent:** /logic\_agent

1. After draft completes, `ctx.events.setPhase('PRE_PLAY')`.

2. Moves in `src/game/moves/communication.ts`:

   * `communicate(cardIdx, position)`
   * `skipCommunication()`

   Guards:

   * Only if `phase === 'PRE_PLAY'`
   * `!G.players[id].sonarUsed`
   * card is not submarine
   * position matches rule:

     * `top` → card is **highest** of its suit in hand
     * `mid` → **only** of suit
     * `bot` → **lowest** of suit

3. After move sets `sonarUsed = true`, check if all players have sonarUsed or skipped; if yes `ctx.events.setPhase('PLAY')`.

Unit tests: invalid submarine, double use, wrong position.

Commit: `feat(move): communication and skip moves with guards`.

---

### TASK 7.3 – Reminder card data & helper

**Agent:** /logic\_agent

1. Add helper `getReminderCard(): Card` returning sentinel like `{ suit:'reminder', value:0 }`.

2. When communication succeeds, push reminder card to player’s hand at same index so hand length unchanged.

Commit: `feat(reminder): add reminder card handling`.

---

### TASK 7.4 – CommunicationModal UI

**Agent:** /ui\_agent

1. New component `src/ui/CommunicationModal.tsx`:

   * Props: `{ hand: Card[]; onConfirm(cardIdx, position); onCancel(); }`.
   * Render selectable hand, radio buttons for top/mid/bot.
   * Disable submarines automatically.

2. Storybook: open modal with sample hand.

Commit: `feat(ui): CommunicationModal component`.

---

### TASK 7.5 – Update Hand rendering for communicated card

**Agent:** /ui\_agent

1. In `Card` component, when `communication` prop passed, overlay sonar token SVG at position (top/mid/bot).

2. In `Hand.tsx`, map player state to pass communication info.

3. Render reminder card image for suit `'reminder'`.

Storybook story of communicated hand.

Commit: `feat(ui): show sonar token and reminder card in Hand`.

---

### TASK 7.6 – Integrate modal & phase switch in App

**Agent:** /ui\_agent

1. When `ctx.phase === 'PRE_PLAY' && playerID === ctx.currentPlayer && !G.players[playerID].sonarUsed` show button **“Communicate”** that opens modal.

2. Also show **“Skip”** button.

3. Wire buttons to moves.

4. After phase turns to `"PLAY"`, hide modal.

Commit: `feat(ui): wire Communication flow into board`.

---

### TASK 7.7 – Component test: guard enforcement

**Agent:** /test\_agent

1. Render Hand with submarine card; ensure modal disables it.

2. Attempt `communicate` twice: second returns `INVALID_MOVE`.

Commit: `test(comm): enforce one‑time communication rules`.

---

### TASK 7.8 – Docs & README update

**Agent:** /docs\_agent

* Add section “Communication Phase” with screenshots (optional ASCII).

Commit: `docs(m07): document sonar token rules`.

---

### TASK 7.9 – CI check

**Agent:** /ci\_agent

Ensure test environment supports SVG import if you added token graphic.

Commit (if any): `ci: ensure SVG handling`.

---

### TASK 7.10 – Open PR into master

**Agent:** /docs\_agent

```bash
gh pr create --base master --head feat/m07-communication \
  --title "Milestone 7 – Communication System" \
  --body "Adds PRE_PLAY phase, one‑time communication move, sonar token UI and reminder card."
```

---

## Manual‑testing checklist after M07

1. `yarn dev`, open tabs for all players.
2. After task draft, you should see **Communicate** / **Skip** buttons.
3. Click **Communicate**: modal opens showing your hand (submarines greyed).
4. Select card & position; confirm:

   * Card stays face‑up with sonar token in chosen corner.
   * Reminder card placeholder fills the gap.
5. Turn passes; repeat for next seats.
6. If you click **Skip**, sonarUsed becomes true without revealed card.
7. After all players have acted, game enters `"PLAY"`; hand/trick UI appears.
8. Try to communicate again—should be disallowed.

If all interactions behave and game proceeds into play phase, Milestone 7 is complete!

Let me know if you need tweaks or want to move on to the distress‑signal milestone next.
