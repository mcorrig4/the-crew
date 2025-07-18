interface PlayerSeatProps {
  seat: number;
  isCurrent: boolean;
}

export function PlayerSeat({ seat, isCurrent }: PlayerSeatProps) {
  return (
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-lg border-2 border-gray-300 font-semibold ${
        isCurrent ? 'bg-teal-500 text-white' : 'bg-white text-gray-700'
      }`}
    >
      Seat {seat}
    </div>
  );
}
