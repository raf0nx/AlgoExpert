// Solution 1, O(n^2) time complexity, O(1) space complexity
export function threeNumberSort(array: number[], order: number[]) {
  let isAnyNumberSwapped = true

  while (isAnyNumberSwapped) {
    isAnyNumberSwapped = false

    for (let i = 0; i < array.length - 1; i++) {
      const currNumRank = order.indexOf(array[i])
      const nextNumRank = order.indexOf(array[i + 1])

      if (currNumRank > nextNumRank) {
        ;[array[i], array[i + 1]] = [array[i + 1], array[i]]
        isAnyNumberSwapped = true
      }
    }
  }

  return array
}
