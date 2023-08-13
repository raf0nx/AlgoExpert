// Solution 1, O(n * log(n)) time complexity, O(n) space complexity
// where n is the length of the input array
export function largestRange(array: number[]): [number, number] {
  const sortedUniqueArr = [...new Set(array.sort((a, b) => a - b))]
  const result: [number, number] = [sortedUniqueArr[0], sortedUniqueArr[0]]
  let currRangeStart = 0
  let currRangeEnd = 0
  let maxRange = -Infinity

  for (let i = 1; i < sortedUniqueArr.length; i++) {
    if (sortedUniqueArr[i] - sortedUniqueArr[i - 1] === 1) {
      currRangeEnd = i

      if (currRangeEnd - currRangeStart + 1 > maxRange) {
        maxRange = currRangeEnd - currRangeStart + 1
        result[0] = sortedUniqueArr[currRangeStart]
        result[1] = sortedUniqueArr[currRangeEnd]
      }
    } else {
      currRangeStart = i
      currRangeEnd = i
    }
  }

  return result
}
