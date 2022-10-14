// Solution 1, O(n * log(n)) time complexity, O(n) space complexity
export function mergeOverlappingIntervals(array: number[][]) {
  const sortedIntervals = array.sort(([a], [b]) => a - b)

  const mergedIntervals: number[][] = [array[0]]

  for (const interval of sortedIntervals) {
    const [currIntervalStart, currIntervalEnd] = interval
    const prevIntervalEnd = mergedIntervals[mergedIntervals.length - 1][1]

    if (currIntervalStart <= prevIntervalEnd) {
      mergedIntervals[mergedIntervals.length - 1][1] = Math.max(
        prevIntervalEnd,
        currIntervalEnd
      )
      continue
    }

    mergedIntervals.push(interval)
  }

  return mergedIntervals
}
