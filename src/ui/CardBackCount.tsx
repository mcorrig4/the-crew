interface CardBackCountProps {
  count: number;
  isCaptain: boolean;
}

export default function CardBackCount({ count, isCaptain }: CardBackCountProps) {
  return (
    <div className="relative">
      {/* Card back stack */}
      <div className="relative">
        {/* Base card back */}
        <div className="h-20 w-14 rounded-lg border-2 border-gray-600 bg-blue-900 shadow-md" />

        {/* Stacked effect - show multiple card backs if count > 1 */}
        {count > 1 && (
          <>
            <div className="absolute -left-1 -top-1 h-20 w-14 rounded-lg border-2 border-gray-600 bg-blue-900 shadow-md" />
            {count > 2 && (
              <div className="absolute -left-2 -top-2 h-20 w-14 rounded-lg border-2 border-gray-600 bg-blue-900 shadow-md" />
            )}
          </>
        )}
      </div>

      {/* Count badge */}
      <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-gray-900">
        {count}
      </div>

      {/* Captain indicator */}
      {isCaptain && <div className="mt-1 text-center text-sm">⚓️</div>}
    </div>
  );
}
