type Range = [number, number]

// Solution 1, O(n^2) time complexity, O(1) space complexity
// where n is the length of the input array
export function subarraySort(array: number[]): Range {
  let currMax = -Infinity
  let smallestSubarrayBound = Infinity
  const result: Range = [-1, -1]

  for (let i = 0; i < array.length; i++) {
    if (array[i] >= currMax) {
      currMax = array[i]
      continue
    }

    if (array[i] < smallestSubarrayBound) {
      const startingSubarrayIdx = array.findIndex(el => el > array[i])
      smallestSubarrayBound = array[startingSubarrayIdx - 1]
      result[0] = startingSubarrayIdx
      result[1] = i
    } else {
      result[1] = i
    }
  }

  return result
}

// Solution 2, O(n) time complexity, O(1) space complexity
// where n is the length of the input array
export function subarraySort2(array: number[]): Range {
  const result: Range = [-1, -1]
  let maxOutOfOrder = -Infinity
  let minOutOfOrder = Infinity

  for (let i = 1; i < array.length; i++) {
    if (array[i] >= array[i - 1]) continue

    minOutOfOrder = Math.min(array[i], minOutOfOrder)
    maxOutOfOrder = Math.max(array[i - 1], maxOutOfOrder)
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] > minOutOfOrder && result[0] === -1) {
      result[0] = i
    }

    if (array[i] < maxOutOfOrder) {
      result[1] = i
    }
  }

  return result
}
