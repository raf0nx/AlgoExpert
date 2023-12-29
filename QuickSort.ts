// Solution 1,
// Best and Average: O(n * log(n)) time complexity, O(log(n)) space complexity
// Worst: O(n^2) time complexity, O(log(n)) space complexity,
// where n is the length of the input array
export function quickSort(array: number[], start = 0, end = array.length - 1) {
  if (start >= end) return array

  const pivot = array[start]
  let left = start + 1
  let right = end

  while (left <= right) {
    if (array[left] > pivot && array[right] < pivot) {
      ;[array[left], array[right]] = [array[right], array[left]]
      left++
      right++
    } else if (array[left] <= pivot) left++
    else right--
  }

  ;[array[start], array[right]] = [array[right], array[start]]

  const leftSubarrayLength = right - start
  const rightSubarrayLength = end - right

  if (leftSubarrayLength > rightSubarrayLength) {
    quickSort(array, left, end)
    quickSort(array, start, right - 1)
  } else {
    quickSort(array, start, right - 1)
    quickSort(array, left, end)
  }

  return array
}
