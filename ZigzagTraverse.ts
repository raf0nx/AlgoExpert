// Solution 1, O(n) time complexity, O(n) space complexity
// where n is the total number of elements in the two-dimensional array
export function zigzagTraverse(array: number[][]) {
  const zigzagOrder: number[] = []
  let nextNumberPosition: number[] | null = [0, 0]

  while (nextNumberPosition !== null) {
    const [row, col] = nextNumberPosition

    nextNumberPosition = traverseDiagonally(row, col, array, zigzagOrder)
  }

  return zigzagOrder
}

function traverseDiagonally(
  row: number,
  col: number,
  array: number[][],
  zigzagOrder: number[]
) {
  let currRow = row
  let currCol = col
  let rowIncrement = isOnLeftOrBottomBorder(row, col, array) ? -1 : 1
  let colIncrement = isOnLeftOrBottomBorder(row, col, array) ? 1 : -1

  while (array[currRow]?.[currCol] !== undefined) {
    zigzagOrder.push(array[currRow][currCol])
    currRow += rowIncrement
    currCol += colIncrement
  }

  return getNextNumberPosition(
    currRow - rowIncrement,
    currCol - colIncrement,
    array
  )
}

function getNextNumberPosition(row: number, col: number, array: number[][]) {
  if (isOnLeftOrBottomBorder(row, col, array)) {
    if (array[row + 1]?.[col] !== undefined) return [row + 1, col]
    else if (array[row]?.[col + 1] !== undefined) return [row, col + 1]
  }

  if (isOnTopOrRightBorder(row, col, array)) {
    if (array[row]?.[col + 1] !== undefined) return [row, col + 1]
    else if (array[row + 1]?.[col] !== undefined) return [row + 1, col]
  }

  return null
}

function isOnLeftOrBottomBorder(row: number, col: number, array: number[][]) {
  return row === array.length - 1 || col === 0
}

function isOnTopOrRightBorder(row: number, col: number, array: number[][]) {
  return row === 0 || col === array[0].length - 1
}
