// Solution 1, O(n * log(m)) time complexity, O(1) space complexity, where n is the number of rows and m is the number of columns
type Range = [number, number]

export function searchInSortedMatrix(
  matrix: number[][],
  target: number
): Range {
  for (let row = 0; row < matrix.length; row++) {
    let left = 0
    let right = matrix[row].length - 1

    while (left <= right) {
      const middlePointer = Math.floor((left + right) / 2)
      const potentialMatch = matrix[row][middlePointer]

      if (potentialMatch === target) return [row, middlePointer]

      if (potentialMatch < target) left = middlePointer + 1
      else if (potentialMatch > target) right = middlePointer - 1
    }
  }

  return [-1, -1]
}

// Solution 2, O(n + m) time complexity, O(1) space complexity, where n is the number of rows and m is the number of columns
export function searchInSortedMatrix2(
  matrix: number[][],
  target: number
): Range {
  let row = 0
  let col = matrix[0].length - 1

  while (row < matrix.length && col >= 0) {
    const currNum = matrix[row][col]

    if (currNum === target) return [row, col]
    else if (currNum < target) row += 1
    else col -= 1
  }

  return [-1, -1]
}
