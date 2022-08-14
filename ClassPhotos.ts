// Solution 1, O(n * log(n)) time complexity, O(1) space complexity
export function classPhotos(
  redShirtHeights: number[],
  blueShirtHeights: number[]
) {
  redShirtHeights.sort((a, b) => a - b)
  blueShirtHeights.sort((a, b) => a - b)

  const areRedsTaller = redShirtHeights[0] > blueShirtHeights[0]

  for (let i = 0; i < redShirtHeights.length; i++) {
    const firstRowHeight = areRedsTaller
      ? redShirtHeights[i]
      : blueShirtHeights[i]
    const secondRowHeight = areRedsTaller
      ? blueShirtHeights[i]
      : redShirtHeights[i]

    if (firstRowHeight > secondRowHeight) continue
    else return false
  }

  return true
}
