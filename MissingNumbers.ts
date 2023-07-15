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

// Solution 2, O(n) time complexity, O(n) space complexity
// where n is the length of the nums array
export function missingNumbers2(nums: number[]) {
  const numsSet = new Set(nums)
  const missingNums: number[] = []

  for (let num = 1; num < nums.length + 3; num++) {
    if (numsSet.has(num)) continue

    missingNums.push(num)
  }

  return missingNums
}

// Solution 3, O(n) time complexity, O(1) space complexity
// where n is the length of the nums array
export function missingNumbers3(nums: number[]) {
  const numsSum = nums.reduce((a, b) => a + b, 0)
  const expectedSum = caluculateSumInRange(1, nums.length + 2)
  const averageMissingValue = Math.floor((expectedSum - numsSum) / 2)
  const expectedLeftHalfSum = caluculateSumInRange(1, averageMissingValue)
  const expectedRightHalfSum = caluculateSumInRange(
    averageMissingValue + 1,
    nums.length + 2
  )

  let foundLeftHalfSum = 0
  let foundRightHalfSum = 0

  for (const num of nums) {
    if (num <= averageMissingValue) {
      foundLeftHalfSum += num
    } else {
      foundRightHalfSum += num
    }
  }

  return [
    expectedLeftHalfSum - foundLeftHalfSum,
    expectedRightHalfSum - foundRightHalfSum,
  ]
}

function caluculateSumInRange(begin: number, end: number) {
  let sum = 0

  for (let i = begin; i <= end; i++) {
    sum += i
  }

  return sum
}
