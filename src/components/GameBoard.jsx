import { useState } from "react";

//activePlayerSymbol }) {
/*  const [GameBoard, setGameBoard] = useState(initialGameboard);

  function handleClick(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updateBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updateBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updateBoard;
    });

    handleTogglePlayer();
  }
  */

export default function GameBoard({ handleTogglePlayer, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleTogglePlayer(rowIndex, colIndex)}
                  disabled={playerSymbol === "O" || playerSymbol === "X"}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
