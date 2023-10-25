// Solution 1, O(w * h * s^2), O(1) space complexity
// where w is the width of the matrix, h is the height of the matrix and s is the size
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

// Solution 2, O(w * h), O(w * h) space complexity
// where w is the width of the matrix and h is the height of the matrix
export function maximumSumSubmatrix2(matrix: number[][], size: number) {
  const sums: number[][] = Array.from({ length: matrix.length }, () =>
    new Array(matrix[0].length).fill(0)
  )

  let maxSum = -Infinity

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (i === 0) {
        sums[i][j] = matrix[i][j] + (sums[i][j - 1] ?? 0)
      } else if (j === 0) {
        sums[i][j] = matrix[i][j] + sums[i - 1][j]
      } else {
        sums[i][j] =
          matrix[i][j] + sums[i - 1][j] + sums[i][j - 1] - sums[i - 1][j - 1]
      }

      if (i < size - 1 || j < size - 1) continue

      maxSum = Math.max(
        maxSum,
        sums[i][j] -
          (sums[i - size]?.[j] ?? 0) -
          (sums[i][j - size] ?? 0) +
          (sums[i - size]?.[j - size] ?? 0)
      )
    }
  }

  return maxSum
}
