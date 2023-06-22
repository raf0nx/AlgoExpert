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
    row.map((num, j) => (i === j ? true : false))
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
