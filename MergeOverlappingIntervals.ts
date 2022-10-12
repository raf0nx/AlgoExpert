// Solution 1, O(n) time complexity, O(n) space complexity
export function mergeOverlappingIntervals(array: number[][]) {
  const sortedIntervals = array.sort(([a], [b]) => a - b)

  const mergedIntervals: number[][] = [array[0]]

  for (const interval of sortedIntervals) {
    const currIntervalStart = interval[0]
    const currIntervalEnd = interval[1]
    const prevIntervalStart = mergedIntervals[mergedIntervals.length - 1][0]
    const prevIntervalEnd = mergedIntervals[mergedIntervals.length - 1][1]

    if (
      currIntervalStart >= prevIntervalStart &&
      currIntervalStart <= prevIntervalEnd
    ) {
      mergedIntervals.pop()
      mergedIntervals.push([
        prevIntervalStart,
        Math.max(prevIntervalEnd, currIntervalEnd),
      ])
    } else {
      mergedIntervals.push(interval)
    }
  }

  return mergedIntervals
}
