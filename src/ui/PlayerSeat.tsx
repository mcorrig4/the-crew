import CardBackCount from './CardBackCount';

interface PlayerSeatProps {
  seat: number;
  isCurrent: boolean;
  cardCount?: number;
  isCaptain?: boolean;
}

export function PlayerSeat({ seat, isCurrent, cardCount = 0, isCaptain = false }: PlayerSeatProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-lg border-2 border-gray-300 font-semibold ${
          isCurrent ? 'bg-teal-500 text-white' : 'bg-white text-gray-700'
        }`}
      >
        Seat {seat}
      </div>
      {cardCount > 0 && <CardBackCount count={cardCount} isCaptain={isCaptain} />}
    </div>
  );
}
