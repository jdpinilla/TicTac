import './App.css';
import {useEffect, useState} from 'react';
import {Square} from './components/Square';
import {Patterns} from './Patterns';

function App() {
  const [board, setBoard] = useState(["","","","","","","","",""])
  const [player, setPlayer] = useState('X');
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [playerXWins, setPlayerWinsX] = useState(0);
  const [playerOWins, setPlayerWinsO] = useState(0);
  const [tie, setTie] = useState(0);

  const chooseSquare = (square) => {
    if(result.winner !== "none"){
      return;
    }
    setBoard(
      board.map((val, i) => {
        if(i === square && val === "") {
          return player;
        }

        return val;
      })
    );
  };

  const restart = () =>  {
    setBoard(["","","","","","","","",""]);
    setPlayer("X");
    setResult({winner: "none", state: "none"});
  }

  useEffect(() => {
    function checkWin(){
      Patterns.forEach((currPattern) => {
        const firstPlayer = board[currPattern[0]];
        if (firstPlayer === "") return;
        let winningPattern = true;
        currPattern.forEach((i) => {
          if(board[i] !== firstPlayer) {
            winningPattern = false;
          }
        });
        if(winningPattern) {
          setResult({winner: player, state: 'Won'});
          if(player=== "X"){
            setPlayerWinsX( playerXWins + 1);
          } else{
            setPlayerWinsO(playerOWins + 1);
          }
        }
      });
    }
    function checkIfTie(){
      let filled = true;
      board.forEach((square) => {
      if(square === ""){
        filled = false;
      }
    });
      if(filled) {
        if(result.winner === "none"){
          setResult({winner: "No winner", state: "Tie"});
          setTie(tie + 1)
        }
      }
    }
    checkWin();
    checkIfTie();

    if (player === "X") {
      setPlayer("O");
    } else{
      setPlayer("X");
    }
  // eslint-disable-next-line
  }, [board]);

  useEffect(() => {
    if(result.state !== "none") {
      alert(`Game Finished! Winning:${result.winner}`);
    }
  }, [result]);
  return (
    <div className="App">
      <button onClick={restart} type="button">
        Restar
      </button>
      <div className="contain">
        <div className="number-Wins">
          {playerXWins}
        </div>
        <div className="board">
          <div className="row">
            <Square

              val={board[0]}
              handleSquare={() => chooseSquare(0)}
            />
            <Square

              val={board[1]}
              handleSquare={() => chooseSquare(1)}
            />
            <Square
              
              val={board[2]}
              handleSquare={() => chooseSquare(2)}
            />
          </div>
          <div className="row">
            <Square
              val={board[3]}
              handleSquare={() => chooseSquare(3)}
            />
            <Square
              val={board[4]}
              handleSquare={() => chooseSquare(4)}
            />
            <Square
              val={board[5]}
              handleSquare={() => chooseSquare(5)}
            />
          </div>
          <div className="row">
            <Square
              val={board[6]}
              handleSquare={() => chooseSquare(6)}
            />
            <Square
              val={board[7]}
              handleSquare={() => chooseSquare(7)}
            />
            <Square
              val={board[8]}
              handleSquare={() => chooseSquare(8)}
            />
          </div>
        </div>
        <div className="number-Wins">
          {playerOWins}
        </div>
      </div>
      <table>
        <tr>
          <th>Player X</th>
          <th>Ties</th>
          <th>Player O</th>
        </tr>
        <tr>
          <td>{playerXWins}</td>
          <td>{tie}</td>
          <td>{playerOWins}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
