// Solution 1, O(n) time complexity, O(1) space complexity
export function isMonotonic(array: number[]) {
  const isIncreasing = array[0] <= array[array.length - 1]

  return array.every((num, i) => {
    const prevNum = array[i - 1]

    if (!prevNum) return true
    return isIncreasing ? num >= prevNum : num <= prevNum
  })
}
