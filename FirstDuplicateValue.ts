// Solution 1, O(n) time complexity, O(1) space complexity
export function firstDuplicateValue(array: number[]) {
  const traversedNums = new Set() // Or use a Hash Map here

  for (const num of array) {
    if (traversedNums.has(num)) return num
    traversedNums.add(num)
  }

  return -1
}
