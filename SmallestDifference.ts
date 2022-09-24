// Solution 1, O(n^2) time complexity, O(1) space complexity
export function smallestDifference(arrayOne: number[], arrayTwo: number[]) {
  let result: [number, number] = [0, 0],
    smallestAbsDiff = Infinity

  for (let i = 0; i < arrayOne.length; i++) {
    for (let j = 0; j < arrayTwo.length; j++) {
      const currAbsoluteDiff = Math.abs(arrayOne[i] - arrayTwo[j])

      if (currAbsoluteDiff < smallestAbsDiff) {
        smallestAbsDiff = currAbsoluteDiff
        result = [arrayOne[i], arrayTwo[j]]
      }
    }
  }

  return result
}

// Solution 2, O(n * log(n) + m * log(m)) time complexity, O(1) space complexity
export function smallestDifference2(arrayOne: number[], arrayTwo: number[]) {
  let result: [number, number] = [0, 0],
    smallestAbsDiff = Infinity

  arrayOne.sort((a, b) => a - b)
  arrayTwo.sort((a, b) => a - b)

  let arrOnePointer = 0,
    arrTwoPointer = 0

  while (arrOnePointer < arrayOne.length && arrTwoPointer < arrayTwo.length) {
    const currArrOneElem = arrayOne[arrOnePointer],
      currArrTwoElem = arrayTwo[arrTwoPointer]
    const currAbsoluteDiff = Math.abs(currArrOneElem - currArrTwoElem)

    if (currAbsoluteDiff < smallestAbsDiff) {
      smallestAbsDiff = currAbsoluteDiff
      result = [currArrOneElem, currArrTwoElem]

      if (smallestAbsDiff === 0) return result
    }

    if (currArrOneElem > currArrTwoElem) arrTwoPointer++
    else arrOnePointer++
  }

  return result
}
