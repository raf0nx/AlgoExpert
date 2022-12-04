// Solution 1, O(w * h) time complexity, O(w * h) space complexity, where w is the width and h is the height of the matrix
export function removeIslands(matrix: number[][]): number[][] {
  const visited = Array.from({ length: matrix.length }, (_, i) =>
    new Array(matrix[i].length).fill(false)
  )

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      removeIslandsHelper(matrix, visited, row, col)
    }
  }

  return matrix
}

function removeIslandsHelper(
  matrix: number[][],
  visited: boolean[][],
  row: number,
  col: number,
  islandInfo = { isIsland: true }
): void {
  if (isOutOfBound(matrix, row, col) || visited[row][col]) return
  visited[row][col] = true

  if (!matrix[row][col]) return
  if (isOnTheBound(matrix, row, col)) islandInfo.isIsland = false

  for (const [nextRow, nextCol] of [
    [row - 1, col],
    [row, col + 1],
    [row + 1, col],
    [row, col - 1],
  ]) {
    removeIslandsHelper(matrix, visited, nextRow, nextCol, islandInfo)
  }

  if (islandInfo.isIsland) matrix[row][col] = 0
}

function isOutOfBound(matrix: number[][], row: number, col: number): boolean {
  return row < 0 || row >= matrix.length || col < 0 || col >= matrix[row].length
}

function isOnTheBound(matrix: number[][], row: number, col: number): boolean {
  return (
    row === 0 ||
    row === matrix.length - 1 ||
    col === 0 ||
    col === matrix[row].length - 1
  )
}
