
// let winningLines = [
//   [0, 6, 12, 18],
//   [0, 1, 2, 3],
//   [0, 5, 10, 15],
//   [1, 2, 3, 4],
//   [1, 7, 13, 19],
//   [1, 6, 11, 16],
//   [2, 7, 12, 17],
//   [3, 7, 11, 15],
//   [3, 8, 13, 18],
//   [4, 8, 12, 16],
//   [4, 9, 14, 19],
//   [5, 11, 17, 23],
//   [5, 10, 15, 20],
//   [5, 6, 7, 8],
//   [6, 7, 8, 9],
//   [6, 12, 18, 24],
//   [6, 11, 16, 21],
//   [7, 12, 17, 22],
//   [8, 13, 18, 23],
//   [8, 12, 16, 20],
//   [9, 13, 17, 21],
//   [9, 14, 19, 24], 
//   [10, 11, 12, 13],
//   [11, 12, 13, 14],
//   [15, 16, 17, 18],
//   [16, 17, 18, 19],
//   [20, 21, 22, 23],
//   [21, 22, 23, 24],
// ];

let winningLines:number[][];
let boardSide: number;
let winningLineLength: number;

export const defineBoard = (side: number, lineLength: number): void => {
  boardSide = side;
  winningLineLength = lineLength;
  generateWinningLines();
}

export const getWinningLines = (): number[][] => {
  if (!winningLines) generateWinningLines();
  return winningLines;
} 

export const calculateWinner = (squares: (string | null)[]): string | null => {

    if(!winningLines) {
      defineBoard(5, 4);
    }

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c, d] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    return null;
}

export const generateWinningLines = (): void => {

  let linesInSide: number = boardSide - winningLineLength + 1; 
  
  winningLines = [];

  generateDiagonalForwardsWinningLines(linesInSide);
  generateDiagonalBackwardsWinningLines(linesInSide);
  generateStraightWinningLines(linesInSide);

  // improvizedNumericSort(winningLines);
  // console.log(winningLines);
}

const generateStraightWinningLines = (linesInSide: number): void => {
  let linesArray: number[] = [];

  for (let i = 0; i < boardSide*boardSide; i++) {
    linesArray.push(i);
  }
  
  for (let x = 0; x < boardSide; x++) {
    let pick = x;
    for (let y = 0; y < boardSide; y++) {
      linesArray.push(pick);
      pick+=boardSide;
    }
  }

  for (let y = 0; y < linesArray.length/boardSide; y++) {
    let sideToCalc: number[] = linesArray.slice(y*boardSide, boardSide+(y*boardSide));
    for (let x = 0; x < linesInSide; x++) {
      winningLines.push(sideToCalc.slice(x, winningLineLength+x));
    }
  }
}

const generateDiagonalForwardsWinningLines = (linesInSide: number): void => {
  let startPosition = winningLineLength-1;
  let count = linesInSide*linesInSide;

  while (count > 0) {
    let winningLine: number[] = [];
    let pick = startPosition;

    for (let i = startPosition; i < winningLineLength + startPosition; i++) {
       winningLine.push(pick);
       pick+=boardSide-1;
    }

    if (winningLine[0] == boardSide-1) {
      startPosition += (boardSide-1);
    } else {
      startPosition += 1;
    }

    winningLines.push(winningLine);
    count--;
  }
}

const generateDiagonalBackwardsWinningLines = (linesInSide: number): void => {
  let startPosition: number = boardSide - winningLineLength;
  let count:number = linesInSide*linesInSide;

  while (count > 0) {
    let winningLine: number[] = [];
    let pick = startPosition;

    for (let i = startPosition; i < winningLineLength + startPosition; i++) {
      winningLine.push(pick);
      pick+=boardSide+1;
    }

    if (winningLine[0] == 0) {
      startPosition += (boardSide+1);
    } else {
      startPosition -= 1;
    }

    winningLines.push(winningLine);
    count--;
  }
}

export const shuffleLines = (arrayOfLines: (number[][])) => {
  let currentIndex = arrayOfLines.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arrayOfLines[currentIndex], arrayOfLines[randomIndex]] = [
      arrayOfLines[randomIndex], arrayOfLines[currentIndex]];
  }

  return arrayOfLines;
}

//just for testing something. A bit dirty.
const improvizedNumericSort = (numericArray: number[][]): void => { 
  let outerI: number = 0, innerI;
  while (outerI < numericArray.length) {
    innerI = outerI + 1;
    while (innerI < numericArray.length) {
      
      if (numericArray[innerI][0] < numericArray[outerI][0]) {
        let tempNumber = numericArray[outerI];          
        numericArray[outerI] = numericArray[innerI];
        numericArray[innerI] = tempNumber;
      }
      innerI++;
    }
    outerI++;
  }
}
