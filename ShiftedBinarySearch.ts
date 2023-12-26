// Solution 1, O(log(n)) time complexity, O(log(n)) space complexity,
// where n is the length of the input array
export function shiftedBinarySearch(
  array: number[],
  target: number,
  left = 0,
  right = array.length - 1
): number {
  if (left > right) return -1

  const mid = Math.floor((left + right) / 2)

  if (array[mid] === target) return mid

  if (array[left] <= array[mid]) {
    if (array[left] <= target && target < array[mid]) {
      return shiftedBinarySearch(array, target, left, mid - 1)
    } else {
      return shiftedBinarySearch(array, target, mid + 1, right)
    }
  } else {
    if (array[mid] < target && target <= array[right]) {
      return shiftedBinarySearch(array, target, mid + 1, right)
    } else {
      return shiftedBinarySearch(array, target, left, mid - 1)
    }
  }
}

// Solution 2, O(log(n)) time complexity, O(1) space complexity,
// where n is the length of the input array
export function shiftedBinarySearch2(array: number[], target: number) {
  let left = 0
  let right = array.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (array[mid] === target) return mid
    else if (array[left] <= array[mid]) {
      if (array[left] <= target && target < array[mid]) right = mid - 1
      else left = mid + 1
    } else {
      if (array[mid] < target && target <= array[right]) left = mid + 1
      else right = mid - 1
    }
  }

  return -1
}
