// Solution 1, O(n^2) time complexity, O(1) space complexity
// where n is the length of the input array
export function majorityElement(array: number[]) {
  let majorElem = 0
  let maxCounts = 0

  for (let i = 0; i < array.length; i++) {
    let currentNum = array[i]
    let currentCount = 1

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] !== currentNum) continue

      currentCount += 1
    }

    if (currentCount > maxCounts) {
      maxCounts = currentCount
      majorElem = currentNum
    }
  }

  return majorElem
}
