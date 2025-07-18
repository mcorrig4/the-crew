interface CardProps {
  suit: 'pink' | 'blue' | 'yellow' | 'green' | 'sub';
  value: number;
}

export function Card({ suit, value }: CardProps) {
  const suitColorMap = {
    pink: 'ring-pink-500 border-pink-300',
    blue: 'ring-blue-500 border-blue-300',
    yellow: 'ring-yellow-500 border-yellow-300',
    green: 'ring-green-500 border-green-300',
    sub: 'ring-gray-500 border-gray-300',
  };

  return (
    <div
      className={`flex h-24 w-16 items-center justify-center rounded-lg border-2 bg-white ring-2 ${suitColorMap[suit]}`}
    >
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
