// Solution 1, O(log(n)) time complexity, O(1) space complexity
export function binarySearch(array: number[], target: number): number {
  let leftPointer = 0,
    rightPointer = array.length - 1

  while (leftPointer <= rightPointer) {
    const middlePointer = Math.floor((leftPointer + rightPointer) / 2)
    const potentialMatch = array[middlePointer]

    if (potentialMatch === target) return middlePointer

    if (potentialMatch > target) rightPointer = middlePointer - 1
    else leftPointer = middlePointer + 1
  }

  return -1
}

// Solution 2, O(log(n)) time complexity, O(n) space complexity
function binarySearchHelper(
  array: number[],
  target: number,
  left: number,
  right: number
): number {
  if (left > right) return -1

  const mid = Math.floor((left + right) / 2)
  const potentialMatch = array[mid]

  if (potentialMatch === target) return mid

  if (potentialMatch > target)
    return binarySearchHelper(array, target, left, mid - 1)
  else return binarySearchHelper(array, target, mid + 1, right)
}

export function binarySearch2(array: number[], target: number): number {
  return binarySearchHelper(array, target, 0, array.length - 1)
}
