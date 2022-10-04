// Solution 1, O(n) time complexity, 0(1) space complexity
export function longestPeak(array: number[]) {
  let currLongestPeak = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i - 1] < array[i] && array[i] > array[i + 1]) {
      let currPeak =
        3 + getPeakItemsCount(array, i - 1, 0) + getPeakItemsCount(array, i + 1)

      if (currPeak > currLongestPeak) currLongestPeak = currPeak
    }
  }

  return currLongestPeak
}

type Direction = 0 | 1 // 0 means going in reversed order, 1 means going in the right order

function getPeakItemsCount(
  array: number[],
  idx: number,
  direction: Direction = 1
) {
  let count = 0

  for (
    let i = idx;
    direction ? i < array.length : i >= 0;
    direction ? i++ : i--
  ) {
    if (array[i] > array[i - (direction ? -1 : 1)]) count += 1
    else break
  }

  return count
}

// Solution 2, O(n) time complexity, 0(1) space complexity
export function longestPeak2(array: number[]) {
  let currLongestPeak = 0,
    idx = 1

  while (idx < array.length - 1) {
    if (array[idx - 1] < array[idx] && array[idx] > array[idx + 1]) {
      const leftPeakBound = getLeftPeakBound(array, idx - 1)
      const rightPeakBound = getRightPeakBound(array, idx + 1)

      const currPeak = rightPeakBound - leftPeakBound + 1

      if (currPeak > currLongestPeak) currLongestPeak = currPeak

      idx = rightPeakBound - 1
    }

    idx++
  }

  return currLongestPeak
}

function getLeftPeakBound(array: number[], idx: number) {
  let i = idx

  while (i >= 1 && array[i] > array[i - 1]) i--

  return i
}

function getRightPeakBound(array: number[], idx: number) {
  let i = idx

  while (i < array.length - 1 && array[i] > array[i + 1]) i++

  return i
}
