# Code & UI Style Guide

## TypeScript
* Prefer `type` aliases over `interface` unless extending.
* Use `readonly` for immutable fields in game state (`G`).

## React
* Function components with hooks; no class components.
* Props are camelCase; styling via Tailwind utility classes only.
* Use `zustand` for UI‑only state (never for authoritative game state).

## Tailwind
* Enable JIT mode; use **design tokens** via `@apply` for repeated combos.
* Dark‑mode via class strategy (`class="dark"` on `<html>`).

## Naming
| Context | Example |
|---------|---------|
| Component | `TaskCard`, `PlayerSeat` |
| Hook | `useTrickWinner()` |
| Test file | `TaskCard.test.tsx` |
| Story | `TaskCard.stories.tsx` |

## Documentation blocks
```ts
/**
 * Determines whether a card follows suit.
 * @param leadSuit The suit that was led
 * @param card     The card being tested
 */
````

Keep JSDoc brief—max 4 lines.


## UI Components

### Hand
Displays player's hand of cards horizontally sorted by suit. Cards are clickable only when the hand is active for playing during tricks.

### TrickPile  
Shows cards that have been played this trick. Renders small rotated cards in play order with the trick leader highlighted.
