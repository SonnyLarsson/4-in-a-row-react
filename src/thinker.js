import { winningLines, shuffleLines } from "./utils";

let shuffledWinningLines;

export const getStartPosition = (squares, player) => {  
    if (squares.includes(player)) {
        return -1;
    }
    else {
        let position = Math.floor(Math.random() * 25);
        
        while (squares[position]) {
            position = Math.floor(Math.random() * 25);
        }

        return position;
    }
}

export const makeMove = (squares, player) => {
    
    let makeMistake = Math.floor(Math.random() * 25) === 0; 
    if (makeMistake) {
        getEmptySquare(squares);
    }
       
    shuffledWinningLines = shuffleLines(winningLines.slice());

    let line = getBestLine(squares, player);

    if (!line) {
        return getEmptySquare(squares);
    }

    for (let index = 0; index < line.length; index++) {
        let position = line[index];
        if (!squares[position]) {
            return position;
        }
    }

    return -1;
}

const getLineOfInterest = (squares, player, index, topPoints) => {
    const [a, b, c, d] = shuffledWinningLines[index];

    if ((!squares[a] || squares[a] === player) && 
        (!squares[b] || squares[b] === player) &&
        (!squares[c] || squares[c] === player) &&
        (!squares[d] || squares[d] === player)) {
            
        let points = 0 + !!squares[a] + !!squares[b] + !!squares[c] + !!squares[d];
        
        if (points >= topPoints) {
            topPoints = points;
            return [[a, b, c, d], topPoints];
        }
    }

    return null;
}

const getBestLine = (squares, player) => {
    let playerTopPoints = 0;
    let opponentTopPoints = 0;
    
    let playerLine;
    let opponentLine;
    let startIndex = shuffledWinningLines.length - 1
    let index = 0;

    for (index = startIndex; index >= 0; index--) {
        let selectedLine = getLineOfInterest(squares, player, index, playerTopPoints);

        if (selectedLine && selectedLine[0] && selectedLine[1] && selectedLine[1] >= playerTopPoints) {
            playerLine = selectedLine[0];
            playerTopPoints = selectedLine[1]
        }
    }

    for (index = startIndex; index >= 0; index--) {
        let selectedLine = getLineOfInterest(squares, setOpponent(player), index, opponentTopPoints);

        if (selectedLine && selectedLine[0] && selectedLine[1] && selectedLine[1] >= opponentTopPoints) {
            opponentLine = selectedLine[0];
            opponentTopPoints = selectedLine[1]
        }
    }

    return (playerTopPoints < opponentTopPoints) ? opponentLine : playerLine;
}

const getEmptySquare = (squares) => {
    for (var index = squares.length - 1; index >= 0; index--) {
        if(!squares[index]) {
            return index
        }
    }
};

const setOpponent = (player) => {
    return (player === 'X') ? 'O' : 'X'; 
}