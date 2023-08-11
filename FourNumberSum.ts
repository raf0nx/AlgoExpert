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
