// Solution 1, O(n) time complexity, O(n) space complexity
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
