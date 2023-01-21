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

// Solution 2, O(n * 2^n) time complexity, O(n * 2^n) space complexity
export function powerset2(array: number[]) {
  const subsets: number[][] = [[]]

  for (const num of array) {
    const subsetsLength = subsets.length

    for (let i = 0; i < subsetsLength; i++) {
      subsets.push([...subsets[i], num])
    }
  }

  return subsets
}
