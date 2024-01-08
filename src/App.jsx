import React from "react";
import GameBoard from "./component/GameBoard";
import Player from "./component/Player";
import Log from "./component/Log";

// declarative states

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = React.useState([]);
  // const [activePlayer, setactivePlayer] = React.useState("X");
  const activePlayer = deriveActivePlayer(gameTurn);
  function handleActivePlayer(rowIndex, colIndex) {
    // setactivePlayer((prevActivePlayer) =>
    //   prevActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurn((prevTurn) => {
      // let currentPlayer = "X";
      // if (prevTurn.length > 0 && prevTurn[0].player === "X") {
      //   currentPlayer = "O";
      // }

      const currentPlayer = deriveActivePlayer(prevTurn);

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
        <Log turns={gameTurn} />
      </main>
    </>
  );
}

export default App;
