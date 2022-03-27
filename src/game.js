import React, {useState} from 'react';
import './index.css';
import Board from './board.js';
import { calculateWinner } from './utils';
import { getStartPosition, makeMove } from './thinker';

let history;
let move;
let xIsNext;

function Game() {
    let [squares, setSquares] = useState(Array(25).fill(null));

    let winner = calculateWinner(squares);
    let status;

    if(!history) {
        history = [Array(25).fill(null)]
        xIsNext = true;
    };

    if(!move) { move = 0 };

    let handleClick = (i) => {
        squares = squares.slice(); //this is dumb, but needed to make react know it needs to update.
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        
        squares[i] = xIsNext ? 'X' : 'O';
        setSquares(squares);        
        history.push(squares);

        xIsNext = !xIsNext;
        move = move + 1;
    }

    let jumpTo = (goTo) => {
        move = goTo;
        xIsNext = (goTo % 2) === 0;

        setSquares(history[goTo])        
        timeTravel(goTo);
    }    

    let timeTravel = (goTo) => {
        history = history.slice(0, goTo + 1);
    }

    if (winner) {
        status = winner + ' wins!';
    } else if (move < 25) {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    } else {
        status = 'Nobody wins!';
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

    const moves = history.map((move, goTo) => {
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
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">            
            <ol>{moves}</ol>
        </div>
    </div>
    );
}

export default Game;