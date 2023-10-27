// Solution 1, O(n^4) time complexity, O(1) space complexity,
// where n is the length of the input array
export function maximizeExpression(array: number[]) {
  let maxSum = -Infinity

  for (let i = 0; i < array.length - 3; i++) {
    for (let j = i + 1; j < array.length - 2; j++) {
      for (let k = j + 1; k < array.length - 1; k++) {
        for (let l = k + 1; l < array.length; l++) {
          maxSum = Math.max(maxSum, array[i] - array[j] + array[k] - array[l])
        }
      }
    }
  }

  return maxSum === -Infinity ? 0 : maxSum
}
