const handleRestart = () => {
  window.location.reload(); // Recarga la página
};

export default function Win_restart({ playerName, tie, OnRestart }) {
  return (
    <div id="game-over">
      {tie ? "It's a tie!" : playerName === "X" ? "O has won!" : "X has won!"}
      <br></br>
      <button onClick={OnRestart}>Restart</button>
    </div>
  );
}
