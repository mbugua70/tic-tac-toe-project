import React from "react";
import GameBoard from "./component/GameBoard";
import Player from "./component/Player";

function App() {
  const [gameTurn, setGameTurn] = React.useState([]);
  const [activePlayer, setactivePlayer] = React.useState("X");

  function handleActivePlayer(rowIndex, colIndex) {
    setactivePlayer((prevActivePlayer) =>
      prevActivePlayer === "X" ? "O" : "X"
    );
    setGameTurn((prevTurn) => {
      let currentPlayer = "X";
      if (prevTurn.length > 0 && prevTurn[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            {/* <li>
              <span className="player-name">Player 1 </span>
              <span className="player-symbol"> X</span>
            </li>
            <li>
              <span className="player-name">Player 2 </span>
              <span className="player-symbol"> 0</span>
            </li> */}
            <Player
              name="Player 1"
              symbol="X"
              isActive={activePlayer === "X"}
            />
            <Player
              name="Player 2"
              symbol="O"
              isActive={activePlayer === "O"}
            />
          </ol>
          <GameBoard onSelectButton={handleActivePlayer} turn={gameTurn} />
        </div>
      </main>
    </>
  );
}

export default App;
