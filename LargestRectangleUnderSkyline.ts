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
