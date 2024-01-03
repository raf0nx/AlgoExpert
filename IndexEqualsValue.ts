// Solution 1, O(log(n)) time complexity, O(1) space complexity,
// where n is the length of the input array
export function indexEqualsValue(array: number[]) {
  let left = 0
  let right = array.length - 1
  let idx = -1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (array[mid] === mid) {
      idx = mid
      right = mid - 1
    } else if (array[mid] < mid) left = mid + 1
    else right = mid - 1
  }

  return idx
}

// Solution 2, O(log(n)) time complexity, O(log(n)) space complexity,
// where n is the length of the input array
export function indexEqualsValue2(
  array: number[],
  left = 0,
  right = array.length - 1
): number {
  if (left > right) return -1

  const mid = Math.floor((left + right) / 2)

  if (array[mid] === mid) {
    const possiblySmallerIdx = indexEqualsValue2(array, left, mid - 1)

    if (possiblySmallerIdx !== -1) return possiblySmallerIdx
    else return mid
  } else if (array[mid] < mid) return indexEqualsValue2(array, mid + 1, right)
  else return indexEqualsValue2(array, left, mid - 1)
}
