import {useState} from 'react';
import './index.css';
import { calculateWinner } from './utils';
import { getStartPosition, makeMove, setResult } from './thinker';
import Board from './board';

let history: (string | null)[][];
let move: number;
let xIsNext: boolean;

function Game(): any {
    const [squares, setSquares] = useState(Array(25).fill(null));

    let winner: string | null = calculateWinner(squares);
    let status: string;

    if(!history) {
        history = [Array(25).fill(null)]
        xIsNext = true;
    };

    if(!move) { move = 0 };

    let handleClick = (i: number) => {        
        if (winner || squares[i]) {
            return;
        }
        
        squares[i] = xIsNext ? 'X' : 'O';
        setSquares([...squares]);        
        history.push(squares);
        xIsNext = !xIsNext;
        move = move + 1;
    }

    let jumpTo = (goTo: number) => {
        move = goTo;
        xIsNext = (goTo % 2) === 0;

        setSquares([...history[goTo]])        
        timeTravel(goTo);
    }    

    let timeTravel = (goTo: number) => {
        history = history.slice(0, goTo + 1);
    }

    if (winner) {
        status = winner + ' wins!';
        setResult(true, 'X', winner);
    } else if (move < 25) {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    } else {
        status = 'Nobody wins!';
        setResult(false);
    }

    let turn = (xIsNext) ? 'X' : 'O'; 

    if (turn === 'O') {
        if (move < 2) {
            handleClick(getStartPosition(squares, turn));
        }
        else if (move < 25) {
            handleClick(makeMove(squares, turn));
        }
    }

    const moves = history.map((move, goTo): any => {
        const desc = goTo?
          'Go to move #' + goTo :
          'Go to game start';
        return (
           <li key={goTo}>
             <button onClick={() => jumpTo(goTo)}>{desc}</button>
           </li>
        );
      });

    return (
        <div className="game">
            <div>{status}</div>
            <div className="game-board">
                <Board
                    squares={squares}
                    onClick={(i: number) => handleClick(i)}
                />
            </div>
            <div className="game-info">            
            <ol>{moves}</ol>
        </div>
    </div>);
}

export default Game;