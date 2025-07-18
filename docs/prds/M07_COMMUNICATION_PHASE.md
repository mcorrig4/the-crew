# Milestone 7 – Communication Phase (Sonar Token)

### Objective
Implement the rulebook’s communication mechanic so each player can
reveal exactly one card from their hand **once per mission**, place the sonar token
(highest / only / lowest), and hand out the reminder card.

Flow:
1. After task draft ends, game enters `"PRE_PLAY"` phase.
2. In any order, each player may perform `communicate(cardIdx, position)`
   where `position ∈ { top, middle, bottom }`.
3. Submarine cards **cannot** be communicated.
4. Once every player either communicates or clicks “Skip”, phase advances
   automatically to `"PLAY"`.
5. The sonar token is immovable; communicated card must remain visible
   in the player’s hand for the rest of the mission.
6. The player receives a **reminder card** to replace the sonar token slot.

### Success Criteria
* Game state additions:
  ```ts
  players[id].sonarUsed: boolean
  players[id].communication?: { card: Card; position: 'top'|'mid'|'bot' }
  ```
* Move `communicate(cardIdx, position)`:

  * Guard: `!sonarUsed`, not submarine, correct position rule.
* Move `skipCommunication` allowed once per player.
* UI `CommunicationModal` lets player select a card & position.
* Hand component renders communicated card face‑up with token graphic.
* Reminder card (grey transparent card) appears in empty slot.
* Storybook stories for CommunicationModal and communicated hand state.
* Unit tests:

  * Guard rejects submarine or second communication.
  * After all players act, phase === `"PLAY"`.
* All scripts & CI pass.

