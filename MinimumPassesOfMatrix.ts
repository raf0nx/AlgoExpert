// Solution 1, O(w * h) time complexity, O(w * h) space complexity
export function minimumPassesOfMatrix(matrix: number[][]) {
  const negatives = Array.from({ length: matrix.length }, (_, i) =>
    new Array(matrix[i].length).fill(false)
  )

  return removeNegatives(matrix, negatives, 0)
}

function removeNegatives(
  matrix: number[][],
  negatives: boolean[][],
  nrOfPasses: number
): number {
  let negativesLeft = false
  let negativeRemoved = false

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] <= 0) continue
      markNegativeNeighbors(matrix, negatives, i, j)
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!negativesLeft && matrix[i][j] < 0) negativesLeft = true
      if (negatives[i][j]) {
        negativeRemoved = true
        negatives[i][j] = false
        matrix[i][j] *= -1
      }
    }
  }

  if (!negativesLeft) return nrOfPasses
  if (negativesLeft && !negativeRemoved) return -1

  return removeNegatives(matrix, negatives, nrOfPasses + 1)
}

function markNegativeNeighbors(
  matrix: number[][],
  negatives: boolean[][],
  row: number,
  col: number
) {
  for (const [nRow, nCol] of getAllNeighbors(row, col)) {
    if (
      isOutOfBound(matrix, nRow, nCol) ||
      matrix[nRow][nCol] >= 0 ||
      negatives[nRow][nCol]
    )
      continue
    negatives[nRow][nCol] = true
  }
}

function getAllNeighbors(row: number, col: number) {
  return [
    [row - 1, col],
    [row, col + 1],
    [row + 1, col],
    [row, col - 1],
  ]
}

function isOutOfBound(matrix: number[][], row: number, col: number) {
  return row < 0 || row >= matrix.length || col < 0 || col >= matrix[row].length
}
