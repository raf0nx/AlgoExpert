// Solution 1, O(n) time complexity, O(d) space complexity where d is the greatest depth of nested arrays in the array
type SpecialArray = Array<number | SpecialArray>

export function productSum(array: SpecialArray, multiplier = 1): number {
  let sum = 0

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      sum += multiplier * productSum(<SpecialArray>array[i], multiplier + 1)
    } else {
      sum += multiplier * <number>array[i]
    }
  }

  return sum
}
