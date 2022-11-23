// Solution 1, O(w * h) time complexity, O(w * h) space complexity, where w is the width and h is the height
export function numberOfWaysToTraverseGraph(width: number, height: number) {
  const ways: number[][] = Array.from({ length: height }, () =>
    new Array(width).fill(1)
  )

  for (let i = 1; i < height; i++) {
    for (let j = 1; j < width; j++) {
      ways[i][j] = ways[i][j - 1] + ways[i - 1][j]
    }
  }

  return ways[height - 1][width - 1]
}

// Solution 2, O(w * h) time complexity, O(min(w, h)) space complexity, where w is the width and h is the height
export function numberOfWaysToTraverseGraph2(width: number, height: number) {
  const smallerDim = width < height ? width : height
  const biggerDim = width >= height ? width : height

  let prevRow = new Array(smallerDim).fill(1)
  let currRow = [1]

  for (let i = 1; i < biggerDim; i++) {
    for (let j = 1; j < smallerDim; j++) {
      currRow[j] = currRow[j - 1] + prevRow[j]
    }

    prevRow = currRow
  }

  return prevRow[smallerDim - 1]
}

// Solution 3, O(w + h) time complexity, O(1) space complexity, where w is the width and h is the height
export function numberOfWaysToTraverseGraph3(width: number, height: number) {
  const totalDownMoves = height - 1
  const totalRightMoves = width - 1

  return (
    factorial(totalDownMoves + totalRightMoves) /
    factorial(totalDownMoves) /
    factorial(totalRightMoves)
  )
}

function factorial(num: number) {
  let result = 1

  for (let i = num; i >= 2; i--) {
    result *= i
  }

  return result
}
