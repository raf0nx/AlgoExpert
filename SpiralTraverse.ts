// Solution 1, O(n) time complexity, O(n) space complexity1
export function spiralTraverse(array: number[][]) {
  const visitedNums: number[] = []

  let startRow = 0,
    startCol = 0,
    endRow = array.length - 1,
    endCol = array[array.length - 1].length - 1

  let direction: 'up' | 'down' | 'right' | 'left' = 'right'

  while (startRow <= endRow && startCol <= endCol) {
    switch (direction) {
      case 'right':
        for (let i = startCol; i <= endCol; i++) {
          visitedNums.push(array[startRow][i])
        }

        startRow += 1
        direction = 'down'

        break
      case 'down':
        for (let i = startRow; i <= endRow; i++) {
          visitedNums.push(array[i][endCol])
        }

        endCol -= 1
        direction = 'left'

        break
      case 'left':
        for (let i = endCol; i >= startCol; i--) {
          visitedNums.push(array[endRow][i])
        }

        endRow -= 1
        direction = 'up'

        break
      case 'up':
        for (let i = endRow; i >= startRow; i--) {
          visitedNums.push(array[i][startCol])
        }

        startCol += 1
        direction = 'right'

        break
    }
  }

  return visitedNums
}

// Solution 2, O(n) time complexity, O(n) space complexity1
export function spiralTraverse2(array: number[][]) {
  const visitedNums: number[] = []

  let startRow = 0,
    startCol = 0,
    endRow = array.length - 1,
    endCol = array[array.length - 1].length - 1

  while (startRow <= endRow && startCol <= endCol) {
    for (let i = startCol; i <= endCol; i++) {
      visitedNums.push(array[startRow][i])
    }

    for (let i = startRow + 1; i <= endRow; i++) {
      visitedNums.push(array[i][endCol])
    }

    if (startRow === endRow || startCol === endCol) break

    for (let i = endCol - 1; i >= startCol; i--) {
      visitedNums.push(array[endRow][i])
    }

    for (let i = endRow - 1; i >= startRow + 1; i--) {
      visitedNums.push(array[i][startCol])
    }

    startRow += 1
    startCol += 1
    endRow -= 1
    endCol -= 1
  }

  return visitedNums
}
