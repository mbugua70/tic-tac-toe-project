import React from "react";
import GameBoard from "./component/GameBoard";
import Player from "./component/Player";
import Log from "./component/Log";
import GameOver from "./component/GameOver";
import { WINNING_COMBINATIONS } from "./component/winning_combinatioins";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// winning possibilities combinations

// declarative states

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // const [hasWinning, setHasWinner] = React.useState(false);
  const [player, setPlayers] = React.useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurn, setGameTurn] = React.useState([]);
  // const [activePlayer, setactivePlayer] = React.useState("X");
  const activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turns of gameTurn) {
    const { square, player } = turns;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  // the code for combinations winnings

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }

  let hasDraw = gameTurn.length === 9 && !winner;

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

  // game restart code

  function handleRematch() {
    setGameTurn([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
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
              onChangeName={handlePlayerName}
            />
            <Player
              name="Player 2"
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerName}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRematch} />
          )}
          <GameBoard onSelectButton={handleActivePlayer} board={gameBoard} />
        </div>
        <Log turns={gameTurn} />
      </main>
    </>
  );
}

export default App;
