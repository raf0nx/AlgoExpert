// Solution 1, O(w * h) time complexity, O(w * h) space complexity, where w is the width and h is the height of the matrix
type IslandsPositions = [number, number][]

class IslandInfo {
  isIsland: boolean
  islandsPositions: IslandsPositions

  constructor() {
    this.isIsland = true
    this.islandsPositions = []
  }
}

export function removeIslands(matrix: number[][]): number[][] {
  const visited = Array.from({ length: matrix.length }, (_, i) =>
    new Array(matrix[i].length).fill(false)
  )
  const islandsToRemove: [number, number][] = []

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const islandInfo = new IslandInfo()

      removeIslandsHelper(matrix, visited, row, col, islandInfo)

      if (islandInfo.isIsland)
        islandsToRemove.push(...islandInfo.islandsPositions)
    }
  }

  for (const [row, col] of islandsToRemove) {
    matrix[row][col] = 0
  }

  return matrix
}

function removeIslandsHelper(
  matrix: number[][],
  visited: boolean[][],
  row: number,
  col: number,
  islandInfo: IslandInfo
): void {
  if (isOutOfBound(matrix, row, col) || visited[row][col]) return

  visited[row][col] = true

  if (!matrix[row][col]) return
  if (isOnTheBound(matrix, row, col)) islandInfo.isIsland = false

  islandInfo.islandsPositions.push([row, col])

  for (const [nextRow, nextCol] of [
    [row - 1, col],
    [row, col + 1],
    [row + 1, col],
    [row, col - 1],
  ]) {
    removeIslandsHelper(matrix, visited, nextRow, nextCol, islandInfo)
  }
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
