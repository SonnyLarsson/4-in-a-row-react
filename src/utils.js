
export const winningLines = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [6, 7, 8, 9],   
  [10, 11, 12, 13],
  [11, 12, 13, 14],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [20, 21, 22, 23],
  [21, 22, 23, 24],
  [0, 5, 10, 15],
  [1, 6, 11, 16],    
  [2, 7, 12, 17],
  [3, 8, 13, 18],
  [4, 9, 14, 19],
  [5, 10, 15, 20],
  [6, 11, 16, 21],    
  [7, 12, 17, 22],
  [8, 13, 18, 23],
  [9, 14, 19, 24],
  [0, 6, 12, 18],
  [1, 7, 13, 19],
  [5, 11, 17, 23],
  [6, 12, 18, 24],
  [3, 7, 11, 15],
  [4, 8, 12, 16],
  [8, 12, 16, 20],
  [9, 13, 17, 21]
];

export const calculateWinner = (squares) => {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c, d] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    return null;
}

export const shuffleLines = (arrayOfLines) => {
  let currentIndex = arrayOfLines.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arrayOfLines[currentIndex], arrayOfLines[randomIndex]] = [
      arrayOfLines[randomIndex], arrayOfLines[currentIndex]];
  }

  return arrayOfLines;
}