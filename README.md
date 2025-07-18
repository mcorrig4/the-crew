# Crew Mission Deep Sea (Web)

## Prerequisites

- Node >= 18, Yarn 3 (berry)

## Getting Started

```bash
yarn install
yarn dev
```

### Running the Dev Stack

```bash
yarn dev  # starts Vite (5173) + boardgame.io server (8000)
open http://localhost:5173
```

## Gameplay Setup

The game automatically deals cards when starting a new match:

- **4 players**: Each player receives 10 cards
- **5 players**: Each player receives 8 cards
- **3 players**: Two players receive 13 cards, one player receives 14 cards (remainder rule)

The player holding the **submarine 4** card is designated as the captain and is indicated with an anchor icon (⚓️) below their card count in the UI.

## Quick local multiplayer test

Open two browser tabs with player-specific URL parameters to test multiplayer functionality:

- Tab 1: `http://localhost:5173/?p=0` (Player 0)
- Tab 2: `http://localhost:5173/?p=1` (Player 1)

Players can click cards in their hand to play them when it's their turn. The center shows the current trick pile, and opponent seats display card counts that update in real-time.
