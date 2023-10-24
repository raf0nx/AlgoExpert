// Solution 1, O((h - s + 1)^2 * s^2), O(1) space complexity
// where h is the height of the matrix and s is the size
type Boundaries = {
  startCol: number
  endCol: number
  startRow: number
  endRow: number
}

export function maximumSumSubmatrix(matrix: number[][], size: number) {
  let maxSum = -Infinity
  let startCol = 0
  let endCol = startCol + size - 1
  let startRow = 0
  let endRow = startRow + size - 1

  while (endRow < matrix.length) {
    const boundaries = { startCol, endCol, startRow, endRow }
    maxSum = Math.max(maxSum, calculateSubmatrixSum(matrix, boundaries))

    if (endCol === matrix[0].length - 1) {
      startCol = 0
      endCol = startCol + size - 1
      startRow += 1
      endRow += 1
    } else {
      startCol += 1
      endCol += 1
    }
  }

  return maxSum
}

function calculateSubmatrixSum(matrix: number[][], boundaries: Boundaries) {
  const { startCol, endCol, startRow, endRow } = boundaries
  let sum = 0

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      sum += matrix[i][j]
    }
  }

  return sum
}
