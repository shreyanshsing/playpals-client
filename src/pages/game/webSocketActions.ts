export const handleLiveGameAction = (
  grid: any[],
  gridSymbolAndColors: any[],
  players: any[],
  callback: (newGrid: any) => void
) => {
  const player1Id = players?.[0]?.id;
  const player2Id = players?.[1]?.id;
  const player1Symbol = players?.[0]?.symbol;
  const player2Symbol = players?.[1]?.symbol;
  const player1Color = players?.[0]?.color;
  const player2Color = players?.[1]?.color;
  const player1 = { symbol: player1Symbol, color: player1Color };
  const player2 = { symbol: player2Symbol, color: player2Color };

  grid?.forEach((clientId: string, index: number) => {
    if (clientId === player1Id) {
      grid[index] = player1;
    } else if (clientId === player2Id) {
      grid[index] = player2;
    }
  });
  const newGrid = gridSymbolAndColors.map((g, index) => {
    if (grid[index]) {
      return grid[index];
    }
    return g;
  });
  callback(newGrid);
};
