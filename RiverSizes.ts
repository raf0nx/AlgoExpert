// Solution 1, O(wh^2) time complexity, O(wh) space complexity where w is the width and h is the height of the matrix
export function riverSizes(matrix: number[][]) {
  const riverSizes: number[] = []

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!matrix[i][j]) continue
      riverSizes.push(findRiverSize(matrix, i, j))
    }
  }

  return riverSizes
}

function findRiverSize(matrix: number[][], row: number, col: number): number {
  if (!matrix[row] || !matrix[row][col]) return 0

  matrix[row][col] = 0
  return (
    1 +
    findRiverSize(matrix, row, col + 1) +
    findRiverSize(matrix, row + 1, col) +
    findRiverSize(matrix, row, col - 1) +
    findRiverSize(matrix, row - 1, col)
  )
}
