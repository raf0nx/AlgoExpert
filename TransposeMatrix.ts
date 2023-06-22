// Solution 1, O(w * h) time complexity, O(w * h) space complexity
// where w is the width of the matrix and h is the height of the matrix
type Matrix = number[][]

export function transposeMatrix(matrix: Matrix) {
  const transposedNumbers = createTranspondedNumbersMatrix(matrix)
  const matrixHeight = matrix.length

  for (let i = 0; i < matrixHeight; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (transposedNumbers[i][j]) continue

      swapNumbersInMatrix(matrix, i, j)
      updateTransposedNumbers(transposedNumbers, i, j)
    }

    matrix[i] = removeUndefined(matrix[i])
  }

  return removeEmptyArrays(matrix)
}

function createTranspondedNumbersMatrix(matrix: Matrix) {
  return Array.from(matrix, (row, i) =>
    row.map((_, j) => (i === j ? true : false))
  )
}

function swapNumbersInMatrix(matrix: Matrix, i: number, j: number) {
  const temp = matrix[i][j]

  if (!matrix[j]) {
    matrix[j] = []
  }

  matrix[i][j] = matrix[j][i]
  matrix[j][i] = temp
}

function updateTransposedNumbers(
  transposedNumbers: boolean[][],
  i: number,
  j: number
) {
  if (transposedNumbers[j]) transposedNumbers[j][i] = true
  transposedNumbers[i][j] = true
}

function removeUndefined(array: number[]) {
  return array.filter(num => num !== undefined)
}

function removeEmptyArrays(matrix: Matrix) {
  return matrix.filter(row => row.length)
}

// Solution 2, O(w * h) time complexity, O(w * h) space complexity
// where w is the width of the matrix and h is the height of the matrix
export function transposeMatrix2(matrix: number[][]) {
  const transposedMatrix: number[][] = []

  let row = 0
  let col = 0

  while (col < matrix[0].length) {
    if (!transposedMatrix[col]) transposedMatrix.push([])

    transposedMatrix[col].push(matrix[row][col])

    row += 1

    if (row >= matrix.length) {
      row = 0
      col += 1
    }
  }

  return transposedMatrix
}
