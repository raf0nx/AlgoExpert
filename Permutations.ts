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

// Solution 2, O(n! * n) time complexity, O(n! * n) space complexity
export function getPermutations2(array: number[]) {
  const permutations: number[][] = []

  getPermutationsHelper2(array, 0, permutations)

  return permutations
}

function getPermutationsHelper2(
  array: number[],
  currStart: number,
  perms: number[][]
) {
  if (currStart && currStart === array.length) perms.push([...array])
  else {
    for (let i = currStart; i < array.length; i++) {
      swapItemsInArray(array, currStart, i)

      getPermutationsHelper2(array, currStart + 1, perms)

      swapItemsInArray(array, currStart, i)
    }
  }
}

function swapItemsInArray(array: number[], idx1: number, idx2: number) {
  ;[array[idx1], array[idx2]] = [array[idx2], array[idx1]]
}
