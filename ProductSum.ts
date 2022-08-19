// Solution 1, O(n) time complexity, O(d) space complexity where d is the greatest depth of nested arrays in the array
type SpecialArray = Array<number | SpecialArray>

export function productSum(array: SpecialArray, multiplier = 1): number {
  let sum = 0

  for (const element of array) {
    if (Array.isArray(element)) {
      sum += productSum(element, multiplier + 1)
    } else {
      sum += element
    }
  }

  return multiplier * sum
}
