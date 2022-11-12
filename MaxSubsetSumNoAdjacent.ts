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
