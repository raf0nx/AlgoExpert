type Triplet = [number, number, number]

// Solution 1, O(n^3) time complexity, O(n) space complexity
export function threeNumberSum(array: number[], targetSum: number): Triplet[] {
  array.sort((a, b) => a - b)

  const foundTriplets: Triplet[] = []

  for (let i = 0; i < array.length; i++) {
    const firstNum = array[i]
    for (let j = i + 1; j < array.length; j++) {
      const secondNum = array[j]
      for (let k = j + 1; k < array.length; k++) {
        const thirdNum = array[k]
        if (firstNum + secondNum + thirdNum === targetSum)
          foundTriplets.push([firstNum, secondNum, thirdNum])
      }
    }
  }

  return foundTriplets
}
