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

// Solution 2, O(n) time complexity, O(1) space complexity
export function threeNumberSort2(array: number[], order: number[]) {
  const orderNumCount = [0, 0, 0]

  for (const num of array) {
    const orderIdx = order.indexOf(num)
    orderNumCount[orderIdx] += 1
  }

  for (let i = 0; i < order.length; i++) {
    const numsPopulated = orderNumCount.slice(0, i).reduce((a, b) => a + b, 0)
    const lastNumToPopulate = numsPopulated + orderNumCount[i] - 1

    for (let j = numsPopulated; j <= lastNumToPopulate; j++) {
      array[j] = order[i]
    }
  }

  return array
}
