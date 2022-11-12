export function maxSubsetSumNoAdjacent(array: number[]) {
  if (!array.length) return 0

  const maxSums: number[] = []

  for (let i = 0; i < array.length; i++) {
    if (i < 2) {
      maxSums.push(Math.max(array[i], array[i - 1] || 0))
      continue
    }

    const currMaxSum = Math.max(maxSums[i - 1], maxSums[i - 2] + array[i])
    maxSums.push(currMaxSum)
  }

  return maxSums[maxSums.length - 1]
}

// Solution 2, O(n) time complexity, O(1) space complexity
export function maxSubsetSumNoAdjacent2(array: number[]) {
  if (!array.length) return 0
  if (array.length === 1) return array[0]

  const lastTwoMaxSums: [number, number] = [
    array[0],
    Math.max(array[0], array[1]),
  ]

  for (let i = 2; i < array.length; i++) {
    const currMaxSum = Math.max(lastTwoMaxSums[1], lastTwoMaxSums[0] + array[i])
    ;[lastTwoMaxSums[0], lastTwoMaxSums[1]] = [lastTwoMaxSums[1], currMaxSum]
  }

  return lastTwoMaxSums[1]
}
