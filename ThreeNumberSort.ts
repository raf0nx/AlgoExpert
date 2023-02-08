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

// Solution 3, O(n) time complexity, O(1) space complexity
export function threeNumberSort3(array: number[], order: number[]) {
  const firstOrderElem = order[0]
  const lastOrderElem = order[2]
  let firstElemPos = 0

  for (let i = firstElemPos; i < array.length; i++) {
    if (array[i] !== firstOrderElem) continue
    ;[array[firstElemPos], array[i]] = [array[i], array[firstElemPos]]
    firstElemPos++
  }

  let lastElemPos = array.length - 1
  for (let i = lastElemPos; i >= 0; i--) {
    if (array[i] !== lastOrderElem) continue
    ;[array[lastElemPos], array[i]] = [array[i], array[lastElemPos]]
    lastElemPos--
  }

  return array
}

// Solution 4, O(n) time complexity, O(1) space complexity
export function threeNumberSort4(array: number[], order: number[]) {
  let firstElemPos = 0
  let secondElemPos = 0
  let lastElemPos = array.length - 1

  while (secondElemPos <= lastElemPos) {
    switch (array[secondElemPos]) {
      case order[0]:
        swap(array, firstElemPos, secondElemPos)
        firstElemPos++
        secondElemPos++
        break
      case order[1]:
        secondElemPos++
        break
      case order[2]:
        swap(array, secondElemPos, lastElemPos)
        lastElemPos--
        break
    }
  }

  return array
}

function swap(array: any[], firstIdx: number, secondIdx: number) {
  ;[array[firstIdx], array[secondIdx]] = [array[secondIdx], array[firstIdx]]
}
