import layoutPositions from "./data/layoutPositions.js";

export function updateField(currentLayout) {
  const players = document.querySelectorAll('.js-player');

  const layoutPosition = layoutPositions[currentLayout];
  players.forEach((player, index) => {
  if (!index) return;
  const playerId = `player${index + 1}`;

  player.style.gridRow = layoutPosition[playerId].row;
  player.style.gridColumn = layoutPosition[playerId].column;
  });
}
