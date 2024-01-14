// Solution 1, O(n * h) time complexity, O(1) space complexity,
// where n is the number of buildings and h is the height of the highest building
export function largestRectangleUnderSkyline(buildings: number[]) {
  const maxHeight = Math.max(...buildings)
  let largestRectangle = 0

  for (let minHeight = 1; minHeight <= maxHeight; minHeight++) {
    let currentRectangleSize = 0
    let currentLargestRectangle = 0

    for (const height of buildings) {
      if (height < minHeight) {
        currentRectangleSize = 0
        continue
      }

      currentRectangleSize += minHeight
      currentLargestRectangle = Math.max(
        currentLargestRectangle,
        currentRectangleSize
      )
    }

    largestRectangle = Math.max(largestRectangle, currentLargestRectangle)
  }

  return largestRectangle
}

// Solution 2, O(n) time complexity, O(n) space complexity,
// where n is the number of buildings
export function largestRectangleUnderSkyline2(buildings: number[]) {
  const stack: number[] = []
  let maxArea = 0

  for (let i = 0; i <= buildings.length; i++) {
    const currBuildingHeight = buildings[i] || 0

    while (
      stack.length &&
      currBuildingHeight <= buildings[stack[stack.length - 1]]
    ) {
      const maxPillarHeight = buildings[stack.pop()!]
      const leftBound = stack[stack.length - 1]
      const width = !stack.length ? i : i - leftBound - 1

      maxArea = Math.max(maxArea, width * maxPillarHeight)
    }

    stack.push(i)
  }

  return maxArea
}
