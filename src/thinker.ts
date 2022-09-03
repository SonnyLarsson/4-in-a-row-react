import { winningLines, shuffleLines } from "./utils";

type lineScore = {
    line: (number)[];
    points: number;
}

let shuffledWinningLines: (number)[][];

export const getStartPosition = (squares: string[], player: string): number => {  
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

export const makeMove = (squares: string[], player: string): number => {
    
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

const getLineOfInterest = (squares: (string | null)[], player: string, index: number, topPoints: number): lineScore | null => {
    const [a, b, c, d]: number[] = shuffledWinningLines[index];

    if ((!squares[a] || squares[a] === player) && 
        (!squares[b] || squares[b] === player) &&
        (!squares[c] || squares[c] === player) &&
        (!squares[d] || squares[d] === player)) {
            
        let points = 0 + pointConversion(squares[a]) + pointConversion(squares[b]) +  pointConversion(squares[c]) +  pointConversion(squares[d]);
        
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
    for (var index = squares.length - 1; index >= 0; index--) {
        if(!squares[index]) {
            return index
        }
    }

    return -1
};

const setOpponent = (player: string): string => {
    return (player === 'X') ? 'O' : 'X'; 
}