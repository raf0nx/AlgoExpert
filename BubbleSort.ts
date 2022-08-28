// Solution 1, Best: O(n), Avg and worst: O(n^2) time complexity, O(1) space complexity
export function bubbleSort(array: number[]) {
  let isSorted = false,
    numsToSort = array.length - 2

  while (!isSorted) {
    isSorted = true

    for (let i = 0; i <= numsToSort; i++) {
      let currentNum = array[i]
      let nextNum = array[i + 1]

      if (currentNum > nextNum) {
        array[i] = nextNum
        array[i + 1] = currentNum

        isSorted = false
      }
    }

    numsToSort -= 1
  }

  return array
}
