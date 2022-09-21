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

// Solution 2, O(n^2) time complexity, O(n) space complexity
export function threeNumberSum2(array: number[], targetSum: number): Triplet[] {
  const foundTriplets: Triplet[] = []

  array.sort((a, b) => a - b)

  for (let i = 0; i <= array.length - 1; i++) {
    const currNum = array[i]

    let left = i + 1,
      right = array.length - 1

    while (left < right) {
      const potentialMatch = currNum + array[left] + array[right]

      if (potentialMatch === targetSum) {
        foundTriplets.push([currNum, array[left], array[right]])
        left++
        right--
      }

      if (potentialMatch > targetSum) right--
      if (potentialMatch < targetSum) left++
    }
  }

  return foundTriplets
}
