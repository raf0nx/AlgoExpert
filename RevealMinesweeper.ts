// Solution 1, O(w * h) time complexity, O(w * h) space complexity
// where w is the width of the board and h is the height of the board
export function revealMinesweeper(
  board: string[][],
  row: number,
  column: number
) {
  if (board[row][column] === 'M') {
    board[row][column] = 'X'
    return board
  }

  const currentAdjacentFields = getAdjacentFields(board, row, column)
  let numOfAdjacentMines = 0

  for (const [nextRow, nextCol] of currentAdjacentFields) {
    if (board[nextRow][nextCol] === 'M') {
      numOfAdjacentMines += 1
    }
  }

  if (numOfAdjacentMines > 0) board[row][column] = `${numOfAdjacentMines}`
  else {
    board[row][column] = '0'
    for (const [nextRow, nextCol] of currentAdjacentFields) {
      if (board[nextRow][nextCol] !== 'H') continue
      revealMinesweeper(board, nextRow, nextCol)
    }
  }

  return board
}

function getAdjacentFields(board: string[][], row: number, col: number) {
  const possibleAdjacentFields = [
    [row - 1, col],
    [row - 1, col + 1],
    [row, col + 1],
    [row + 1, col + 1],
    [row + 1, col],
    [row + 1, col - 1],
    [row, col - 1],
    [row - 1, col - 1],
  ]
  const adjacentFields: [number, number][] = []

  for (const [possibleRow, possibleCol] of possibleAdjacentFields) {
    if (checkIfOutOfBound(board, possibleRow, possibleCol)) continue
    adjacentFields.push([possibleRow, possibleCol])
  }

  return adjacentFields
}

function checkIfOutOfBound(board: string[][], row: number, col: number) {
  return row >= board.length || row < 0 || col >= board[0].length || col < 0
}
