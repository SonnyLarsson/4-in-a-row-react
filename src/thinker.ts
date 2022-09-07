import { defineBoard, getWinningLines, shuffleLines } from "./utils";

type lineScore = {
    line: (number)[];
    points: number;
}

let focusedOpponent:boolean = false;
let shuffledWinningLines: (number)[][];
let mood: number = 0; 

export const setResult = (win: boolean, player: string = '', winner: string = '') => {
    if (win && winner === player) mood--;
    if (win && winner != player) mood++;
    
    tryToFocus();
}

const tryToFocus = () => {

    if (mood > 5) {
        focusedOpponent = false;
    } else if (mood < -3) {
        focusedOpponent = true
    } else {
        focusedOpponent = Boolean(Math.floor(Math.random() * 2))
    }; 
}

export const getStartPosition = (squares: string[], player: string): number => {
    defineBoard(Math.sqrt(squares.length), 4);

    if (squares.includes(player)) {
        return -1;
    }

    if (focusedOpponent) {
        return getCenterPosition(squares);
    }

    return getRandomPosition(squares);
}

const getRandomPosition = (squares: string[]): number => {
    let position = Math.floor(Math.random() * squares.length);
    let safetyNet = 50;

    while (squares[position] && safetyNet > 0) {
        position = Math.floor(Math.random() * squares.length);
        safetyNet--;
    }

    if (safetyNet < 1) {
        for (let index = squares.length; index > 0; --index) {
            if (!squares[index]) {
                return index;
            }
        }

        return -1;
    }

    return position;
}

const getCenterPosition = (squares: string[]): number => {
    let split: number = Math.floor(squares.length/2);
    if (!squares[split]) return split;
    
    let squareRoot: number = Math.sqrt(squares.length);
    let top: number;
    let bottom: number;
    let centerArray: number[] = [];   

    if (squares.length % 2 === 0) {
        top = split - (squareRoot/2);
        bottom = top + squareRoot;
        centerArray = [top, top+1, bottom, bottom+1];
    }

    if (squares.length % 2 !== 0) {
        top = split - squareRoot;
        bottom = split + squareRoot;
        centerArray = [top-1, top, top+1, split-1, split+1, bottom-1, bottom, bottom+1];
    }

    if (centerArray.length === 0) return -1;

    let position = centerArray[Math.floor(Math.random() * centerArray.length)];
    let safetyNet = 50;

    while (squares[position] && safetyNet > 0) {
        position = centerArray[Math.floor(Math.random() * centerArray.length)]
        safetyNet--;
    }

    if (safetyNet < 1) {
        for (let index = centerArray.length; index > 0; --index) {
            if (!squares[centerArray[index]]) {
                return centerArray[index];
            }
        }

        return -1;
    }

    return position;
}

export const makeMove = (squares: string[], player: string): number => {

    if (!focusedOpponent) {
        let makeMistake = Math.floor(Math.random() * 25) === 0;
        if (makeMistake) {
            return getEmptySquare(squares);
        }
    }
       
    shuffledWinningLines = shuffleLines(getWinningLines());

    let line = getBestLine(squares, player);

    for (let index = 0; index < line.length; index++) {
        let position = line[index];
        if (!squares[position]) {
            return position;
        }
    }

    return getEmptySquare(squares);
}

const getLineOfInterest = (squares: (string | null)[], player: string, index: number, topPoints: number): lineScore | null => {
    const [a, b, c, d]: number[] = shuffledWinningLines[index];
    const lineLength = shuffledWinningLines[index].length;

    if ((!squares[a] || squares[a] === player) && 
        (!squares[b] || squares[b] === player) &&
        (!squares[c] || squares[c] === player) &&
        (!squares[d] || squares[d] === player)) {
            
        let points = 0 + pointConversion(squares[a]) + pointConversion(squares[b]) +  pointConversion(squares[c]) +  pointConversion(squares[d]);
        if (points === lineLength-1) points += 1;

        if (points >= topPoints) {
            topPoints = points;
            return { line: [a, b, c, d], points: topPoints};
        }
    }

    return null;
}

const pointConversion = (player: string | null): number => {
     return !!player ? 1: 0;
} 

const getBestLine = (squares: (string | null)[], player: string): number[] => {
    let playerTopPoints = 0;
    let opponentTopPoints = 0;
    
    let playerLine: number[] = [];
    let opponentLine: number[] = [];
    let startIndex = shuffledWinningLines.length - 1
    let index = 0;

    for (index = startIndex; index >= 0; index--) {
        let selectedLine = getLineOfInterest(squares, player, index, playerTopPoints);

        if (selectedLine && selectedLine.line && selectedLine.points && selectedLine.points >= playerTopPoints) {
            playerLine = selectedLine.line;
            playerTopPoints = selectedLine.points;
        }
    }

    for (index = startIndex; index >= 0; index--) {
        let selectedLine = getLineOfInterest(squares, setOpponent(player), index, opponentTopPoints);

        if (selectedLine && selectedLine.line && selectedLine.points && selectedLine.points >= opponentTopPoints) {
            opponentLine = selectedLine.line;
            opponentTopPoints = selectedLine.points;
        }
    }

    return (playerTopPoints < opponentTopPoints) ? opponentLine : playerLine;
}

const getEmptySquare = (squares: (string | null)[]): number => {
    let goForwards = Boolean(Math.floor(Math.random() * 2));

    if (goForwards) {
        for (var index = 0; index < squares.length; index++) {
            if(!squares[index]) {
                return index
            }
        }
    } else {
        for (var index = squares.length - 1; index >= 0; index--) {
            if(!squares[index]) {
                return index
            }
        }
    }

    return -1
};

const setOpponent = (player: string): string => {
    return (player === 'X') ? 'O' : 'X'; 
}