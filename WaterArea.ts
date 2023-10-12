// Solution 1, O(h^2 * n) time complexity, O(h * n) space complexity,
// where h is the greatest number in the input array and n is the length of the input array
export function waterArea(heights: number[]) {
  const greatestHeight = Math.max(...heights)
  const pillars: string[][] = Array.from({ length: greatestHeight }, (_, i) =>
    Array.from({ length: heights.length }, (_, j) =>
      greatestHeight - i <= heights[j] ? 'p' : ''
    )
  )

  findTrappingPillars(pillars)

  return pillars.flat().reduce((a, b) => (b === 'w' ? a + 1 : a), 0)
}

function findTrappingPillars(pillars: string[][]) {
  for (let i = 0; i < pillars.length; i++) {
    const trappingPillars: number[] = []

    for (let j = 0; j < pillars[0].length; j++) {
      if (pillars[i][j] !== 'p' || pillars[i][j + 1] === 'w') continue

      trappingPillars.push(j)
    }

    if (trappingPillars.length <= 1) continue

    populateWaterNodes(
      pillars,
      i,
      trappingPillars[0],
      trappingPillars[trappingPillars.length - 1]
    )
  }
}

function populateWaterNodes(
  pillars: string[][],
  startRow: number,
  startCol: number,
  endCol: number
) {
  for (let i = startRow; i < pillars.length; i++) {
    for (let j = startCol + 1; j < endCol; j++) {
      if (!pillars[i][j]) pillars[i][j] = 'w'
    }
  }
}

// Solution 2, O(n) time complexity, O(n) space complexity,
// where n is the length of the input array
export function waterArea2(heights: number[]) {
  const maxes: number[] = new Array(heights.length).fill(0)

  let leftMax = 0
  for (let i = 0; i < heights.length; i++) {
    maxes[i] = leftMax
    leftMax = Math.max(heights[i], leftMax)
  }

  let rightMax = 0
  for (let i = heights.length - 1; i >= 0; i--) {
    const minHeight = Math.min(maxes[i], rightMax)

    if (heights[i] >= minHeight) {
      maxes[i] = 0
    } else {
      maxes[i] = minHeight - heights[i]
    }

    rightMax = Math.max(heights[i], rightMax)
  }

  return maxes.reduce((a, b) => a + b, 0)
}

// Solution 3, O(n) time complexity, O(1) space complexity,
// where n is the length of the input array
export function waterArea3(heights: number[]) {
  let left = 1
  let right = heights.length - 2
  let currLeftMax = heights[0]
  let currRightMax = heights[heights.length - 1]
  let waterAreaSum = 0

  while (left <= right) {
    if (currLeftMax < currRightMax) {
      if (heights[left] < currLeftMax)
        waterAreaSum += currLeftMax - heights[left]
      else currLeftMax = heights[left]
      left++
    } else {
      if (heights[right] < currRightMax)
        waterAreaSum += currRightMax - heights[right]
      else currRightMax = heights[right]
      right--
    }
  }

  return waterAreaSum
}
