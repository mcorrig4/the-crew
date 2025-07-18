import { createClient } from './game/client';
import { PlayerSeat } from './ui/PlayerSeat';

const GameClient = createClient();

function App() {
  return (
    <GameClient>
      {({ G, ctx, playerID }) => {
        if (!G || !ctx) {
          return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
              <h1 className="text-2xl font-semibold text-gray-700">Waiting for other players...</h1>
            </div>
          );
        }

        return (
          <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: ctx.numPlayers }, (_, i) => {
                const playerId = i.toString();
                const player = G.players[playerId];
                const cardCount = player?.hand?.length || 0;
                const isCaptain = G.captain === playerId;
                const isCurrent = playerID === playerId;

                return (
                  <PlayerSeat
                    key={playerId}
                    seat={i + 1}
                    isCurrent={isCurrent}
                    cardCount={cardCount}
                    isCaptain={isCaptain}
                  />
                );
              })}
            </div>
          </div>
        );
      }}
    </GameClient>
  );
}

export default App;
