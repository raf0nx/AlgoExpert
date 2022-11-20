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
