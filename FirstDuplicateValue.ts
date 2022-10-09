// Solution 1, O(n) time complexity, O(n) space complexity
export function firstDuplicateValue(array: number[]) {
  const traversedNums = new Set() // Or use a Hash Map here

  for (const num of array) {
    if (traversedNums.has(num)) return num
    traversedNums.add(num)
  }

  return -1
}

// Solution 2, O(n) time complexity, O(1) space complexity
export function firstDuplicateValue2(array: number[]) {
  for (const num of array) {
    const indice = Math.abs(num) - 1
    if (array[indice] < 0) return Math.abs(num)
    array[indice] *= -1
  }

  return -1
}
