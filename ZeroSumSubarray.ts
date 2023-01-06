// Solution 1, O(n) time complexity, O(n) space complexity
export function zeroSumSubarray(nums: number[]) {
  const subArrSums = new Set([0])
  let currSum = 0

  for (const num of nums) {
    currSum += num
    if (subArrSums.has(currSum)) return true
    subArrSums.add(currSum)
  }

  return false
}
