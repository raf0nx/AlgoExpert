// Solution 1, O(w * h) time complexity, O(w * h) space complexity
export function minimumPassesOfMatrix(matrix: number[][]) {
  let nrOfPasses = 0
  let negativesLeft = true

  while (negativesLeft) {
    const [negativesLeft, negativeRemoved] = removeNegatives(matrix)

    if (!negativesLeft) return nrOfPasses
    if (negativesLeft && !negativeRemoved) return -1

    nrOfPasses += 1
  }
}

function removeNegatives(matrix: number[][]) {
  const visited = Array.from({ length: matrix.length }, () =>
    new Array(matrix[0].length).fill(false)
  )

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] <= 0) continue
      markNegativeNeighbors(matrix, visited, i, j)
    }
  }

  let negativesLeft = false
  let negativeRemoved = false

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!negativesLeft && matrix[i][j] < 0) negativesLeft = true
      if (visited[i][j]) {
        negativeRemoved = true
        matrix[i][j] *= -1
      }
    }
  }

  return [negativesLeft, negativeRemoved]
}

function markNegativeNeighbors(
  matrix: number[][],
  visited: boolean[][],
  row: number,
  col: number
) {
  for (const [nRow, nCol] of getAllNeighbors(row, col)) {
    if (isOutOfBound(matrix, nRow, nCol)) continue
    if (matrix[nRow][nCol] < 0) visited[nRow][nCol] = true
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
