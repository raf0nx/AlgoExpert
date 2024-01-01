// Solution 1,
// Best and Average: O(n) time complexity, O(1) space complexity,
// Worst: O(n^2) time complexity, O(1) space complexity,
// where n is the length of the input array
export function quickselect(
  array: number[],
  k: number,
  start = 0,
  end = array.length - 1
): number {
  while (true) {
    const pivot = array[start]
    let left = start + 1
    let right = end

    while (left <= right) {
      if (array[left] > pivot && array[right] < pivot) swap(array, left, right)
      if (array[left] <= pivot) left++
      if (array[right] >= pivot) right--
    }

    if (right === k - 1) return pivot

    swap(array, start, right)

    if (right < k - 1) start = left
    else end = right - 1
  }
}

function swap(array: number[], firstIdx: number, secondIdx: number) {
  ;[array[firstIdx], array[secondIdx]] = [array[secondIdx], array[firstIdx]]
}
