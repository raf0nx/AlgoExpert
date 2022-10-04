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
