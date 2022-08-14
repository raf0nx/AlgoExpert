// Solution 1, O(n * log(n)) time complexity, O(1) space complexity
export function classPhotos(
  redShirtHeights: number[],
  blueShirtHeights: number[]
) {
  redShirtHeights.sort((a, b) => a - b)
  blueShirtHeights.sort((a, b) => a - b)

  const areRedsTaller = redShirtHeights[0] > blueShirtHeights[0]

  for (let i = 0; i < redShirtHeights.length; i++) {
    if (redShirtHeights[i] >= blueShirtHeights[i] !== areRedsTaller)
      return false
  }

  return true
}
