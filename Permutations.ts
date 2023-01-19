// Solution 1, Upper bound: O(n! * n^2) time complexity, O(n! * n) space complexity, roughly: O(n! * n) time complexity, O(n! * n) space complexity
export function getPermutations(array: number[]) {
  const permutations: number[][] = []

  getPermutationsHelper(array, [], permutations)

  return permutations
}

function getPermutationsHelper(
  array: number[],
  currPerm: number[],
  perms: number[][]
) {
  if (!array.length && currPerm.length) perms.push(currPerm)
  else {
    for (let i = 0; i < array.length; i++) {
      const newArr = array.filter(el => el !== array[i])
      const newPerm = [...currPerm, array[i]]

      getPermutationsHelper(newArr, newPerm, perms)
    }
  }
}
