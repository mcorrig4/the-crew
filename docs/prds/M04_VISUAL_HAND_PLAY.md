# Milestone 4 – Visual Hand Rendering & Play Interaction

### Objective
Let a human player see their full hand (face‑up), click a card, and have it
move into the centre trick pile—triggering the `playCard` move implemented
in Milestone 3.  Opponents’ hands show card backs only with an accurate count.

### Success Criteria
* **Player view**  
  * Row of clickable card images; cards grey‑out when not the active player.  
  * Clicking a legal card dispatches `moves.playCard(cardIdx)`.  
  * After a card is played, it disappears from the hand and appears in
    the central **TrickPile** component with small avatar of playerID.
* **Opponent seats**  
  * Show `CardBackCount` decrementing in real time.  
  * Captain seat still shows ⚓︎ icon from Milestone 2.
* **Storybook stories** for  
  * `Card` (all suits + select state)  
  * `Hand` (10‑card example)  
  * `TrickPile` (mid‑trick with 3 plays)
* **Unit/component tests**  
  * Click fires `playCard` only when active player.  
  * Hand length reduces by 1 after successful play.
* `yarn dev`, `yarn test`, `yarn storybook`, CI all green.

### Out of Scope
* Drag‑and‑drop animations (simple `onClick` is enough for now).  
* Task cards, communication, distress‑signal UI.
