// Solution 1, O(n) time complexity, O(1) space complexity,
// where n is the length of the input array
export function longestSubarrayWithSum(array: number[], targetSum: number) {
  let longest: number[] = []
  let left = 0
  let right = 0
  let currSum = 0

  while (right < array.length) {
    const currNum = array[right]

    currSum += currNum

    if (currSum === targetSum) {
      if (!longest.length || right - left > longest[1] - longest[0]) {
        longest = [left, right]
      }
      right++
    } else if (currSum < targetSum) right++
    else {
      currSum -= array[left]

      if (left === right) right++
      else currSum -= currNum

      left++
    }
  }

  return longest
}
