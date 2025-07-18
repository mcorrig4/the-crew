import { createClient } from './game/client';

const GameClient = createClient();

function App() {
  return (
    <GameClient>
      {() => (
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <h1 className="text-2xl font-semibold text-gray-700">Waiting for other players...</h1>
        </div>
      )}
    </GameClient>
  );
}

export default App;
