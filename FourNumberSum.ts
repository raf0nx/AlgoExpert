type Quadruplet = [number, number, number, number]

// Solution 1, O(n^3) time complexity, O(n) space complexity
// where n is the length of the input array
export function fourNumberSum(array: number[], targetSum: number) {
  array.sort((a, b) => a - b)

  let result: Quadruplet[] = []

  for (let i = 0; i < array.length - 3; i++) {
    for (let j = array.length - 1; j > i + 2; j--) {
      const currBoundSum = array[i] + array[j]

      let left = i + 1
      let right = j - 1

      while (left < right) {
        const innerTwoNumSum = array[left] + array[right]

        if (currBoundSum + innerTwoNumSum === targetSum) {
          result.push([array[i], array[left], array[right], array[j]])
          left++
          right--
        } else if (currBoundSum + innerTwoNumSum > targetSum) {
          right--
        } else {
          left++
        }
      }
    }
  }

  return result
}

// Solution 2, Avg: O(n^2) time complexity, O(n^2) space complexity
// Worst: O(n^3) time complexity, O(n^2) space complexity
// where n is the length of the input array
export function fourNumberSum2(array: number[], targetSum: number) {
  let result: Quadruplet[] = []
  const sumHash: Record<number, [number, number][]> = {}

  for (let i = 1; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const currentSum = array[i] + array[j]
      const targetSumDiff = targetSum - currentSum

      if (sumHash[targetSumDiff]) {
        for (const pair of sumHash[targetSumDiff]) {
          result.push([pair[0], pair[1], array[i], array[j]])
        }
      }
    }

    for (let k = 0; k < i; k++) {
      const currentSum = array[i] + array[k]

      if (sumHash[currentSum]) {
        sumHash[currentSum].push([array[i], array[k]])
      } else {
        sumHash[currentSum] = [[array[i], array[k]]]
      }
    }
  }

  return result
}
