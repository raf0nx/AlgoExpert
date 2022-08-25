// Solution 1, O(n) time complexity, O(1) space complexity
export function findThreeLargestNumbers(array: number[]) {
  let biggestNum = -Infinity,
    secondBiggestNum = -Infinity,
    thirdBiggestNum = -Infinity

  for (const number of array) {
    if (number > biggestNum) {
      thirdBiggestNum = secondBiggestNum
      secondBiggestNum = biggestNum
      biggestNum = number
    } else if (number > secondBiggestNum) {
      thirdBiggestNum = secondBiggestNum
      secondBiggestNum = number
    } else if (number > thirdBiggestNum) {
      thirdBiggestNum = number
    }
  }

  return [thirdBiggestNum, secondBiggestNum, biggestNum]
}
