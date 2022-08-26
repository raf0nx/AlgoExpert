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

// Solution 2, O(n) time complexity, O(1) space complexity
function updateAndShuffleArray(array: number[], element: number, idx: number) {
  for (let i = 0; i <= idx; i++) {
    if (i === idx) {
      array[i] = element
    } else {
      array[i] = array[i + 1]
    }
  }
}

export function findThreeLargestNumbers2(array: number[]) {
  const result: Array<number> = Array(3).fill(-Infinity)

  for (const number of array) {
    if (number > result[2]) {
      updateAndShuffleArray(result, number, 2)
    } else if (number > result[1]) {
      updateAndShuffleArray(result, number, 1)
    } else if (number > result[0]) {
      updateAndShuffleArray(result, number, 0)
    }
  }

  return result
}
