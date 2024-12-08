import React, { useState } from "react";
import "./homePage.css";
import buttonClickAudioFile from "../assets/button-click.mp3";
import winnerAudioFile from "../assets/winner.mp3";

const HomePage = () => {
  const [buttonClickAudio] = useState(new Audio(buttonClickAudioFile));
  const [winnerAudio] = useState(new Audio(winnerAudioFile));
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winnderIndexs, setWinnerIndexs] = useState(null);
  const [winnerXcount, setWinnerXcount] = useState(0);
  const [winner0count, setWinner0count] = useState(0);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Prevent overwriting or clicking after game is won
    buttonClickAudio.play();
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    const winningPlayer = calculateWinner(newBoard);
    if (winningPlayer) {
      setWinner(winningPlayer);
      if (winningPlayer === "X") {
        setWinnerXcount((count) => count + 1);
      } else {
        setWinner0count((count) => count + 1);
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const calculateWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winnerAudio.play();
        setWinnerIndexs(combination);
        return squares[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinnerIndexs(null);
  };

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <div className="player-points">
        <span>Player X: {winnerXcount}</span>
        <span>Player O: {winner0count}</span>
      </div>
      <div className="game">
        <div>
          {winner ? (
            <h3>{`Winner: ${winner}`}</h3>
          ) : (
            <h3>{`Next Turn: ${isXNext ? "X" : "O"}`}</h3>
          )}
        </div>
        <div className="board">
          {board.map((cell, index) => {
            return (
              <div
                key={index}
                className={`cell ${cell ? "filled" : ""} oColor`}
                onClick={() => handleClick(index)}
              >
                <span
                  className={
                    winnderIndexs && winnderIndexs?.includes(index)
                      ? "winner-color"
                      : "bord-cell"
                  }
                >
                  {cell}
                </span>
              </div>
            );
          })}
        </div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </>
  );
};

export default HomePage;
