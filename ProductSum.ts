// Solution 1, O(n) time complexity, O(d) space complexity where d is the greatest depth of nested arrays in the array
type SpecialArray = Array<number | SpecialArray>

export function productSum(array: SpecialArray, multiplier = 1): number {
  return (
    multiplier *
    array.reduce<number>(
      (sum, current) =>
        sum +
        (Array.isArray(current)
          ? productSum(current, multiplier + 1)
          : current),
      0
    )
  )
}
