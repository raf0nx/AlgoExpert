// Solution 1, O(n) time complexity, O(1) space complexity
export function kadanesAlgorithm(array: number[]) {
  let maxSum = array[0]
  let currentMax = array[0]

  for (let i = 1; i < array.length; i++) {
    currentMax = Math.max(currentMax + array[i], array[i])
    maxSum = Math.max(currentMax, maxSum)
  }

  return maxSum
}

// Solution 2, O(n) time complexity, O(1) space complexity
export function kadanesAlgorithm2(array: number[]) {
  const largestValue = Math.max(...array)
  const largestValueIdx = array.indexOf(largestValue)

  const leftArrMaxSum = findSubArrMaxSum(array, largestValueIdx - 1, true)
  const rightArrMaxSum = findSubArrMaxSum(array, largestValueIdx + 1)

  return leftArrMaxSum + largestValue + rightArrMaxSum
}

function findSubArrMaxSum(
  array: number[],
  startIdx: number,
  isLeftSubArr = false
): number {
  let bound = startIdx - 1
  let sum = 0
  let maxSum = 0

  for (
    let i = startIdx;
    isLeftSubArr ? i >= 0 : i < array.length;
    isLeftSubArr ? i-- : i++
  ) {
    sum += array[i]

    if (sum > maxSum) {
      maxSum = sum
      bound = i
    }
  }

  return maxSum
}
