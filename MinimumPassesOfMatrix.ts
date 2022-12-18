// Solution 1, O((w * h) ^ 2) time complexity, O(w * h) space complexity
export function minimumPassesOfMatrix(matrix: number[][]) {
  const convertableNegatives = Array.from({ length: matrix.length }, (_, i) =>
    new Array(matrix[i].length).fill(false)
  )

  return removeNegatives(matrix, convertableNegatives, 0)
}

function removeNegatives(
  matrix: number[][],
  convertableNegatives: boolean[][],
  nrOfPasses: number
): number {
  let negativesLeft = false
  let negativeRemoved = false

  markConvertableNegatives(matrix, convertableNegatives)

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] >= 0) continue

      if (!negativesLeft) negativesLeft = true

      if (!convertableNegatives[i][j]) continue

      negativeRemoved = true
      convertableNegatives[i][j] = false
      matrix[i][j] *= -1
    }
  }

  if (!negativesLeft) return nrOfPasses
  if (negativesLeft && !negativeRemoved) return -1

  return removeNegatives(matrix, convertableNegatives, nrOfPasses + 1)
}

function markConvertableNegatives(
  matrix: number[][],
  convertableNegatives: boolean[][]
) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] <= 0) continue

      for (const [nRow, nCol] of getAllNeighbors(row, col)) {
        if (
          isOutOfBound(matrix, nRow, nCol) ||
          matrix[nRow][nCol] >= 0 ||
          convertableNegatives[nRow][nCol]
        )
          continue
        convertableNegatives[nRow][nCol] = true
      }
    }
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

//  Solution 2, O(w * h) time complexity, O(w * h) space complexity
export function minimumPassesOfMatrix2(matrix: number[][]) {
  let [positivesPositions, negativesCount] =
    initializePositivesPositions(matrix)

  let firstPassQueue: number[][] = positivesPositions
  let nextPassQueue: number[][] = []
  let nrOfPasses = 0

  while (firstPassQueue.length) {
    const [currRow, currCol] = firstPassQueue.shift()!
    negativesCount -= convertNegatives(matrix, nextPassQueue, currRow, currCol)

    if (!firstPassQueue.length) {
      firstPassQueue = nextPassQueue
      nextPassQueue = []
      nrOfPasses += 1
    }
  }

  return negativesCount ? -1 : nrOfPasses - 1
}

function convertNegatives(
  matrix: number[][],
  convertedNegativesPos: number[][],
  row: number,
  col: number
) {
  let negativesRemoved = 0

  for (const [currRow, currCol] of getNodesNeighbors(row, col)) {
    if (isOutOfBound(matrix, currRow, currCol) || matrix[currRow][currCol] >= 0)
      continue
    matrix[currRow][currCol] *= -1
    negativesRemoved += 1
    convertedNegativesPos.push([currRow, currCol])
  }

  return negativesRemoved
}

function initializePositivesPositions(
  matrix: number[][]
): [number[][], number] {
  const positivesPositions: number[][] = []
  let negativesCount = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!matrix[i][j]) continue

      if (matrix[i][j] < 0) {
        negativesCount += 1
        continue
      }

      positivesPositions.push([i, j])
    }
  }

  return [positivesPositions, negativesCount]
}

const getNodesNeighbors = (row: number, col: number) => [
  [row - 1, col],
  [row, col + 1],
  [row + 1, col],
  [row, col - 1],
]

const isOutOfBound = (matrix: number[][], row: number, col: number) =>
  row < 0 || row >= matrix.length || col < 0 || col >= matrix[row].length
