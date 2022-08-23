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
