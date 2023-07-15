// Solution 1, O(n * log(n)) time complexity, O(1) space complexity
// where n is the length of the nums array
export function missingNumbers(nums: number[]) {
  nums.sort((a, b) => a - b)

  let nextExpectedNum = 1
  let idx = 0
  const missingNums: number[] = []

  while (idx < nums.length + 2) {
    if (missingNums.length === 2) break

    if (nums[idx] !== nextExpectedNum) {
      missingNums.push(nextExpectedNum)
    } else {
      idx += 1
    }

    nextExpectedNum += 1
  }

  return missingNums
}
