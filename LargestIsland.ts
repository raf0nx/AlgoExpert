// Solution 1, O((w * h)^2) time complexity, O(w * h) space complexity,
// where w is the width of the matrix and h is the height of the matrix
export function largestIsland(matrix: number[][]) {
  let largestLand = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) continue

      matrix[i][j] = 0
      largestLand = Math.max(largestLand, findTheGreatestLand(matrix, i, j, {}))
      matrix[i][j] = 1
    }
  }

  return largestLand
}

function findTheGreatestLand(
  matrix: number[][],
  i: number,
  j: number,
  visited: Record<string, boolean>
) {
  if (visited[`${i},${j}`] || isOutOfBound(matrix, i, j) || matrix[i][j] === 1)
    return 0

  visited[`${i},${j}`] = true

  let landSize = 1

  for (let [nextRow, nextCol] of getDirections(i, j)) {
    landSize += findTheGreatestLand(matrix, nextRow, nextCol, visited)
  }

  return landSize
}

// Solution 2, O(w * h) time complexity, O(w * h) space complexity,
// where w is the width of the matrix and h is the height of the matrix
export function largestIsland2(matrix: number[][]) {
  return findLargestIsland(matrix, findIslands(matrix))
}

function findLargestIsland(matrix: number[][], islandSizes: number[]) {
  let largestIslandSize = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] !== 1) continue

      const visited: Record<number, boolean> = { 1: true }
      let currIslandSize = 1

      for (let [nextRow, nextCol] of getDirections(i, j)) {
        if (
          isOutOfBound(matrix, nextRow, nextCol) ||
          visited[matrix[nextRow][nextCol]]
        )
          continue

        visited[matrix[nextRow][nextCol]] = true
        currIslandSize += islandSizes[matrix[nextRow][nextCol] - 2]
      }

      largestIslandSize = Math.max(largestIslandSize, currIslandSize)
    }
  }

  return largestIslandSize
}

function findIslands(matrix: number[][]) {
  const islandSizes: number[] = []
  let currentIslandId = 2

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] !== 0) continue

      islandSizes.push(calculateIslandSize(matrix, i, j, currentIslandId))
      currentIslandId++
    }
  }

  return islandSizes
}

function calculateIslandSize(
  matrix: number[][],
  i: number,
  j: number,
  islandId: number
) {
  if (isOutOfBound(matrix, i, j) || matrix[i][j] !== 0) return 0

  matrix[i][j] = islandId

  let landSize = 1

  for (let [nextRow, nextCol] of getDirections(i, j)) {
    landSize += calculateIslandSize(matrix, nextRow, nextCol, islandId)
  }

  return landSize
}

function isOutOfBound(matrix: number[][], i: number, j: number) {
  return i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length
}

function getDirections(i: number, j: number) {
  return [
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
    [i, j - 1],
  ]
}
