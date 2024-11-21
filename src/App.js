import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/log";
import Win_restart from "./components/win_restart";

const winning_combinations = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [hasWinner, setHasWinner] = useState(false);
  //const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameboard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let win = false;
  let tie = false;
  for (const combination of winning_combinations) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol === "X" &&
      secondSquareSymbol === "X" &&
      thirdSquareSymbol === "X"
    ) {
      win = true;
    }

    if (
      firstSquareSymbol === "O" &&
      secondSquareSymbol === "O" &&
      thirdSquareSymbol === "O"
    ) {
      win = true;
    }

    if (!win && gameTurns.length === 9) {
      win = true; // Empate
      tie = true; // No hay ganador
    }
  }

  function handleTogglePlayer(rowId, colId) {
    //setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateturns = [
        { square: { row: rowId, col: colId }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateturns;
    });
  }

  function OnRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"Player1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
          />
          <Player
            name={"Player2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
          />
        </ol>
        {win ? (
          <Win_restart
            playerName={activePlayer}
            tie={tie}
            OnRestart={OnRestart}
          />
        ) : (
          <GameBoard
            handleTogglePlayer={handleTogglePlayer}
            board={gameBoard}
          />
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
