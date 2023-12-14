// Solution 1, O(1) time complexity, O(1) space complexity,
// assuming a 9x9 input board
export function solveSudoku(board: number[][]) {
  const [row, col] = getNextNumberPos(board, 0, 0)

  sudokuSolver(board, row, col)

  return board
}

const SUDOKU_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function sudokuSolver(board: number[][], row: number, col: number) {
  if (row === board.length) return true

  for (const num of SUDOKU_NUMS) {
    board[row][col] = num

    if (
      verifySudokuRow(board, row) &&
      verifySudokuCol(board, col) &&
      verifySudokuSubgrid(board, row, col)
    ) {
      const [nextRow, nextCol] = getNextNumberPos(board, row, col)

      if (sudokuSolver(board, nextRow, nextCol)) return true
    }
  }

  board[row][col] = 0

  return false
}

function getNextNumberPos(board: number[][], row: number, col: number) {
  while (board[row]?.[col]) {
    if (col === board[0].length - 1) {
      col = 0
      row++
    } else {
      col++
    }
  }

  return [row, col]
}

function verifySudokuRow(board: number[][], currentRow: number) {
  const seen = new Set<number>()

  for (const num of board[currentRow]) {
    if (num === 0) continue

    if (seen.has(num)) return false

    seen.add(num)
  }

  return true
}

function verifySudokuCol(board: number[][], currentCol: number) {
  const seen = new Set<number>()

  for (let row = 0; row < board.length; row++) {
    if (board[row][currentCol] === 0) continue

    if (seen.has(board[row][currentCol])) return false

    seen.add(board[row][currentCol])
  }

  return true
}

function verifySudokuSubgrid(board: number[][], row: number, col: number) {
  const { startRow, startCol, endRow, endCol } = getCurrentSubgridBoundaries(
    row,
    col
  )
  const seen = new Set<number>()

  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      if (board[i][j] === 0) continue

      if (seen.has(board[i][j])) return false

      seen.add(board[i][j])
    }
  }

  return true
}

function getCurrentSubgridBoundaries(row: number, col: number) {
  const startRow = maxNumberWithThrees(row)
  const endRow = startRow + 3
  const startCol = maxNumberWithThrees(col)
  const endCol = startCol + 3

  return { startRow, startCol, endRow, endCol }
}

function maxNumberWithThrees(num: number) {
  const remainder = num % 3

  if (remainder === 0) {
    return num
  } else if (remainder === 1) {
    return num - 1
  } else {
    return num - 2
  }
}
