// Solution 1, O(n^2) time complexity, O(1) space complexity
export function smallestDifference(arrayOne: number[], arrayTwo: number[]) {
  let result: [number, number] = [0, 0],
    smallestAbsDiff = Infinity

  for (let i = 0; i < arrayOne.length; i++) {
    for (let j = 0; j < arrayTwo.length; j++) {
      const currAbsoluteDiff = Math.abs(arrayOne[i] - arrayTwo[j])

      if (currAbsoluteDiff < smallestAbsDiff) {
        smallestAbsDiff = currAbsoluteDiff
        result = [arrayOne[i], arrayTwo[j]]
      }
    }
  }

  return result
}
