// Solution 1, O(n * log(n)) time complexity, O(n) space complexity
export const sortedSquaredArray = (array: number[]) =>
  array.map(el => el ** 2).sort((a, b) => a - b)

// Solution 2, O(n) time complexity, O(n) space complexity
export const sortedSquaredArray2 = (array: number[]) => {
  let output: number[] = []
  let smallerValuePointer = 0
  let biggerValuePointer = array.length - 1

  for (let i = array.length - 1; i >= 0; i--) {
    const minValue = array[smallerValuePointer]
    const maxValue = array[biggerValuePointer]

    if (Math.abs(minValue) < Math.abs(maxValue)) {
      output[i] = maxValue ** 2
      biggerValuePointer--
    } else {
      output[i] = minValue ** 2
      smallerValuePointer++
    }
  }

  return output
}
