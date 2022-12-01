// Solution 1, O(wh) time complexity, O(wh) space complexity where w is the width and h is the height of the matrix
export function riverSizes(matrix: number[][]) {
  const visited: boolean[][] = Array.from({ length: matrix.length }, el =>
    new Array(matrix[0].length).fill(false)
  )

  const riverSizes: number[] = []

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const riverSize = findRiverSize(matrix, visited, i, j)
      riverSize && riverSizes.push(riverSize)
    }
  }

  return riverSizes
}

function findRiverSize(
  matrix: number[][],
  visited: boolean[][],
  row: number,
  col: number
): number {
  if (isBeyondMatrix(matrix, row, col) || visited[row][col]) return 0

  visited[row][col] = true

  if (!matrix[row][col]) return 0

  return (
    1 +
    findRiverSize(matrix, visited, row, col + 1) +
    findRiverSize(matrix, visited, row + 1, col) +
    findRiverSize(matrix, visited, row, col - 1) +
    findRiverSize(matrix, visited, row - 1, col)
  )
}

function isBeyondMatrix(matrix: number[][], row: number, col: number) {
  return row < 0 || row >= matrix.length || col < 0 || col >= matrix[row].length
}
