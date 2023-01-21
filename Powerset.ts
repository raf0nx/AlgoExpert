// Solution 1, O(n * 2^n) time complexity, O(n * 2^n) space complexity
export function powerset(array: number[]) {
  const subsets = [[]]

  powersetHelper(array, [], subsets)

  return subsets
}

function powersetHelper(
  array: number[],
  currSubSet: number[],
  subsets: number[][]
) {
  if (!array.length) return
  else {
    for (let i = 0; i < array.length; i++) {
      const newArr = array.slice(i + 1)
      const newCurrSubSet = [...currSubSet, array[i]]
      subsets.push(newCurrSubSet)

      powersetHelper(newArr, newCurrSubSet, subsets)
    }
  }
}
