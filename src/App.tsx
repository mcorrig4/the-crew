import { createClient } from './game/client';
import { PlayerSeat } from './ui/PlayerSeat';
import { Hand } from './ui/Hand';
import { TrickPile } from './ui/TrickPile';

const GameClient = createClient();

function App() {
  // Derive playerID from URL query param for quick testing (e.g., ?p=0)
  const urlParams = new URLSearchParams(window.location.search);
  const urlPlayerID = urlParams.get('p');

  return (
    <GameClient playerID={urlPlayerID}>
      {({ G, ctx, playerID, moves }) => {
        if (!G || !ctx) {
          return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
              <h1 className="text-2xl font-semibold text-gray-700">Waiting for other players...</h1>
            </div>
          );
        }

        const currentPlayer = G.players[playerID || '0'];
        const currentPlayerHand = currentPlayer?.hand || [];
        const isActive = playerID === ctx.currentPlayer;

        // Create opponent seats (all players except current player)
        const opponents = Array.from({ length: ctx.numPlayers }, (_, i) => {
          const playerId = i.toString();
          if (playerId === playerID) return null;

          const player = G.players[playerId];
          const cardCount = player?.hand?.length || 0;
          const isCaptain = G.captain === playerId;

          return (
            <PlayerSeat
              key={playerId}
              seat={i + 1}
              isCurrent={false}
              cardCount={cardCount}
              isCaptain={isCaptain}
            />
          );
        }).filter(Boolean);

        return (
          <div className="flex h-screen flex-col bg-gray-100">
            {/* Top opponents */}
            <div className="flex justify-center gap-8 p-4">
              {opponents.slice(0, Math.ceil(opponents.length / 2))}
            </div>

            {/* Main game area */}
            <div className="flex flex-1 items-center">
              {/* Left opponents */}
              <div className="flex flex-col gap-4 p-4">
                {opponents.slice(
                  Math.ceil(opponents.length / 2),
                  Math.ceil(opponents.length * 0.75),
                )}
              </div>

              {/* Center trick pile */}
              <div className="flex flex-1 items-center justify-center">
                <TrickPile plays={G.trick.plays} leader={G.trick.leader} />
              </div>

              {/* Right opponents */}
              <div className="flex flex-col gap-4 p-4">
                {opponents.slice(Math.ceil(opponents.length * 0.75))}
              </div>
            </div>

            {/* Bottom player hand */}
            <div className="flex justify-center p-4">
              <Hand
                hand={currentPlayerHand}
                onPlay={(cardIdx) => moves.playCard(cardIdx)}
                isActive={isActive}
              />
            </div>
          </div>
        );
      }}
    </GameClient>
  );
}

export default App;
