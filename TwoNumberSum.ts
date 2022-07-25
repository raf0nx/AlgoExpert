// Solution 1, O(n) time complexity, O(n) space complexity
export function twoNumberSum(array: number[], targetSum: number) {
  const buff = new Set()

  for (const num of array) {
    if (buff.has(targetSum - num)) return [targetSum - num, num]

    buff.add(num)
  }

  return []
}

// Solution 2, O(n * log(n)) time complexity, O(n) space complexity
export function twoNumberSum2(array: number[], targetSum: number) {
  const sortedArray = [...array].sort((a, b) => a - b)

  let left = 0
  let right = sortedArray.length - 1

  while (left < right) {
    const potentialSum = sortedArray[left] + sortedArray[right]

    if (potentialSum === targetSum)
      return [sortedArray[left], sortedArray[right]]
    else if (potentialSum < targetSum) left++
    else if (potentialSum > targetSum) right--
  }

  return []
}
